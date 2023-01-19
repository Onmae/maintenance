package com.maintenance.board.Service;

import com.maintenance.board.domain.Board.Board;
import com.maintenance.board.domain.Board.BoardFileInterface;
import com.maintenance.board.domain.Board.BoardRepository;
import com.maintenance.board.domain.File.BoardFile;
import com.maintenance.board.domain.File.BoardFileRepository;
import com.maintenance.board.dto.Board.BoardRequestDto;
import com.maintenance.board.dto.Board.BoardListResponseDto;
import com.maintenance.board.dto.Board.BoardResponseDto;
import com.maintenance.board.dto.File.BoardFileDto;
import com.maintenance.board.dto.File.FileDto;
import com.maintenance.board.dto.File.FileResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BoardService {
    private final BoardRepository boardRepository;
    private final BoardFileRepository boardFileRepository;
    private final FileService fileService;

    @Transactional
    public Long create(BoardRequestDto requestDto) throws Exception {
        Board board = requestDto.toEntity();
        boardRepository.save(board);

        fileService.saveFile(board.getId(),requestDto);
        return board.getId();
    }

    @Transactional
    public Long update(Long id, BoardRequestDto requestDto) throws Exception{
        Board board = boardRepository.findById(id)
        .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다."));

        board.update(requestDto.getTitle(),
                requestDto.getContent(),
                requestDto.getChargedName(),
                requestDto.getComment(),
                requestDto.getProcessing(),
                requestDto.getProcessedTime());

        fileService.saveFile(id,requestDto);

        return id;
    }

    @Transactional(readOnly = true)
    public BoardResponseDto searchById(Long id) {
        Board board = boardRepository.findById(id).orElseThrow(()
                -> new IllegalArgumentException("해당 게시물이 존재하지 않습니다."));

        List<BoardFile> files = boardFileRepository.selectBoardFileDetail(id);

        return new BoardResponseDto(board,files);
    }

    @Transactional(readOnly = true)
    public List<BoardListResponseDto> searchAllDesc() {
        return boardRepository.findAllByOrderByIdDesc().stream()
                .map(BoardListResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void delete(Long id){
        Board board = boardRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("해당 게시물이 존재하지 않습니다."));

        boardRepository.delete(board);
    }

    public Long countAll() {
        return boardRepository.count();
    }

    public List<BoardListResponseDto> findByProcessing(String processing){
        return boardRepository.findBoardsByProcessingEquals(processing).stream()
                .map(BoardListResponseDto::new)
                .collect(Collectors.toList());
    }

    public List<BoardListResponseDto> findByTitle(String title) {
        return boardRepository.findBoardsByTitleContains(title).stream()
                .map(BoardListResponseDto::new)
                .collect(Collectors.toList());
    }
}
