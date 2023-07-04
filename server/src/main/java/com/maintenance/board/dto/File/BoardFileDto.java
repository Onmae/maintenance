package com.maintenance.board.dto.File;

import com.maintenance.board.domain.File.BoardFile;
import com.maintenance.board.domain.File.File;
import lombok.Builder;
import lombok.Data;

@Data
public class BoardFileDto {

    private Long id;

    private Long boardId;

    public BoardFileDto() {

    }

    @Builder
    public BoardFileDto(Long boardId) {
        this.boardId = boardId;
    }

    public BoardFile toEntity(File file, String isComment) {
        return BoardFile.builder()
                .boardId(boardId)
                .file(file)
                .isComment(isComment)
                .build();
    }
}
