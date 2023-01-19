package com.maintenance.board.domain.Board;

import com.maintenance.board.domain.File.File;
import com.maintenance.board.dto.File.BoardFileDto;
import com.maintenance.board.dto.File.FileDto;
import com.maintenance.board.dto.File.FileResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {

    List<Board> findAllByOrderByIdDesc();

    List<Board> findBoardsByProcessingEquals(String processing);

    List<Board> findBoardsByTitleContains(String title);

}