package com.maintenance.board.controller;

import com.maintenance.board.domain.File.File;
import com.maintenance.board.domain.File.FileRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.FileInputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class FileController {
    private final FileRepository fileRepository;

    @GetMapping("/api/fileDownload/{id}")
    @ResponseBody
    public void downloadFile(HttpServletResponse res, @PathVariable Long id) throws UnsupportedEncodingException {

        //파일 조회
        File fileInfo = fileRepository.findById(id).orElseThrow(()
                -> new IllegalArgumentException("해당 파일이 존재하지 않습니다."));;

        //파일 경로
        Path saveFilePath = Paths.get(fileInfo.getUploadDir() + java.io.File.separator + fileInfo.getSavedFileName());

        //해당 경로에 파일이 없으면
        if(!saveFilePath.toFile().exists()) {
            throw new RuntimeException("file not found");
        }

        //파일 헤더 설정
        setFileHeader(res, fileInfo);

        //파일 복사
        fileCopy(res, saveFilePath);
    }


    private void setFileHeader(HttpServletResponse res, File fileInfo) throws UnsupportedEncodingException {
        res.setHeader("Content-Disposition", "attachment; filename=\"" +  URLEncoder.encode(fileInfo.getOriginFileName(), StandardCharsets.UTF_8) + "\";");
        res.setHeader("Content-Transfer-Encoding", "binary");
        res.setHeader("Content-Type", "application/download; utf-8");
        res.setHeader("Pragma", "no-cache;");
        res.setHeader("Expires", "-1;");
    }


    private void fileCopy(HttpServletResponse res, Path saveFilePath) {
        FileInputStream fis = null;

        try {
            fis = new FileInputStream(saveFilePath.toFile());
            FileCopyUtils.copy(fis, res.getOutputStream());
            res.getOutputStream().flush();
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
        finally {
            try {
                fis.close();
            }
            catch (Exception e) {
                e.printStackTrace();
            }

        }
    }
}