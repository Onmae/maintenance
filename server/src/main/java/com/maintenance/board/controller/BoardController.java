package com.maintenance.board.controller;

import com.maintenance.board.Service.BoardService;
import com.maintenance.board.Service.FileService;
import com.maintenance.board.domain.File.BoardFileRepository;
import com.maintenance.board.domain.File.File;
import com.maintenance.board.dto.Board.BoardRequestDto;
import com.maintenance.board.dto.Board.BoardListResponseDto;
import com.maintenance.board.dto.Board.BoardResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.HttpRequestHandler;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class BoardController {
    private final BoardService boardService;
    private final FileService fileService;

    //Create
    @PostMapping("/api/boardCreate")
    public Long create(@RequestPart(value = "data") BoardRequestDto requestDto,
                       @RequestPart(value = "file", required = false) List<MultipartFile> file,
                       HttpServletRequest req) throws Exception {

        requestDto.setMultipartFile(file);
        return boardService.create(requestDto);
    }

    //Update
    @PostMapping("/api/board/{id}")
    public Long update(@PathVariable Long id, @RequestPart(value = "data") BoardRequestDto requestDto,
                       @RequestPart(value = "file", required = false) List<MultipartFile> file) throws Exception {

        requestDto.setMultipartFile(file);
        return boardService.update(id, requestDto);
    }

    //개별 조회
    @GetMapping("/api/board/{id}")
    public BoardResponseDto searchById(@PathVariable Long id) {
        return boardService.searchById(id);
    }

    //전체 조회(목록)
    @GetMapping("/api/board")
    public List<BoardListResponseDto> searchAllDesc() {
        return boardService.searchAllDesc();
    }

    @GetMapping("api/boardCount")
    public Long countAll() {
        return boardService.countAll();
    }

    @GetMapping("api/boardByProcessing")
    public List<BoardListResponseDto> findByProcessing(@RequestParam(value = "processing", defaultValue = "") String processing) {
        return boardService.findByProcessing(processing);
    }

    @GetMapping("api/boardByTitle")
    public List<BoardListResponseDto> findByTitle(@RequestParam(value = "title", defaultValue = "") String title) {
        return boardService.findByTitle(title);
    }

    //Delete
    @DeleteMapping("/api/board/{id}")
    public void delete(@PathVariable Long id) {
        fileService.deleteBoardFile(id);
        boardService.delete(id);
    }

    @DeleteMapping("/api/boardFileDelete/{id}")
    public void boardFileDelete(@PathVariable Long id) {
        //게시판 파일삭제
        fileService.deleteOneBoardFile(id);
    }
}