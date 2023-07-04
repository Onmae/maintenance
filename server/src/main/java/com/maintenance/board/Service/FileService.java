package com.maintenance.board.Service;

import com.maintenance.board.domain.Board.Board;
import com.maintenance.board.domain.Board.BoardRepository;
import com.maintenance.board.domain.File.BoardFile;
import com.maintenance.board.domain.File.BoardFileRepository;
import com.maintenance.board.domain.File.FileRepository;
import com.maintenance.board.dto.Board.BoardRequestDto;
import com.maintenance.board.dto.File.BoardFileDto;
import com.maintenance.board.dto.File.FileDto;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.InputStream;
import java.util.*;

@Service
@RequiredArgsConstructor
public class FileService {

    @Value("${upload.path}")
    private String uploadDir;
    private final BoardFileRepository boardFileRepository;
    private final BoardRepository boardRepository;
    private final FileRepository fileRepository;

    @Transactional
    public Map<String, Object> saveFile(Long id, BoardRequestDto requestDto) throws Exception {
        List<MultipartFile> multipartFile = requestDto.getMultipartFile();

        Map<String, Object> result = new HashMap<String, Object>();

        List<Long> fileIds = new ArrayList<Long>();

        try {
            if (multipartFile != null) {
                if (multipartFile.size() > 0 && !multipartFile.get(0).getOriginalFilename().equals("")) {
                    for (MultipartFile file1 : multipartFile) {
                        String originalFileName = file1.getOriginalFilename();    //오리지날 파일명
                        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));    //파일 확장자
                        String savedFileName = UUID.randomUUID() + extension;    //저장될 파일 명

                        File targetFile = new File(uploadDir + savedFileName);

                        //초기값으로 fail 설정
                        result.put("result", "FAIL");

                        FileDto fileDto = FileDto.builder()
                                .originFileName(originalFileName)
                                .savedFileName(savedFileName)
                                .uploadDir(uploadDir)
                                .extension(extension)
                                .size(file1.getSize())
                                .contentType(file1.getContentType())
                                .build();
                        //파일 insert
                        com.maintenance.board.domain.File.File file = fileDto.toEntity();
                        Long fileId = insertFile(file);

                        try {
                            InputStream fileStream = file1.getInputStream();
                            FileUtils.copyInputStreamToFile(fileStream, targetFile); //파일 저장
                            //배열에 담기
                            fileIds.add(fileId);
                            result.put("fileIdxs", fileIds.toString());
                            result.put("result", "OK");
                        } catch (Exception e) {
                            //파일삭제
                            FileUtils.deleteQuietly(targetFile);    //저장된 현재 파일 삭제
                            e.printStackTrace();
                            result.put("result", "FAIL");
                            break;
                        }

                        BoardFileDto boardFileDto = BoardFileDto.builder()
                                .boardId(id)
                                .build();

                        BoardFile boardFile = boardFileDto.toEntity(file, requestDto.getIsComment());
                        insertBoardFile(boardFile);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @Transactional
    public Long insertFile(com.maintenance.board.domain.File.File file) {
        return fileRepository.save(file).getId();
    }

    @Transactional
    public Long insertBoardFile(BoardFile boardFile) {
        return boardFileRepository.save(boardFile).getId();
    }

    @Transactional
    public void deleteBoardFile(Long boardId){
        List<BoardFile> boardFile = boardFileRepository.findByBoardId(boardId);
        //삭제
        boardFile.forEach(e -> {
            e.delete("Y");
        });
    }

    @Transactional
    public void deleteOneBoardFile(Long id){
        BoardFile boardFile = boardFileRepository.findByFileId(id);
        //삭제
        boardFile.delete("Y");
    }
}
