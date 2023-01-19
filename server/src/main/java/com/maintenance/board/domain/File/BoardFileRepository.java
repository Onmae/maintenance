package com.maintenance.board.domain.File;

import com.maintenance.board.domain.Board.Board;
import com.maintenance.board.dto.File.FileResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BoardFileRepository extends JpaRepository<BoardFile, Long> {
    //    @Query(value="select board_file_id as id from Board_File", nativeQuery = true)
    @Query(value = "select t from BoardFile t join t.file where t.boardId=:id and t.delYn='N' ")
    List<BoardFile> selectBoardFileDetail(@Param("id") Long boardId);

    List<BoardFile> findByBoardId(Long boardId);

    BoardFile findByFileId(Long fileId);
}
