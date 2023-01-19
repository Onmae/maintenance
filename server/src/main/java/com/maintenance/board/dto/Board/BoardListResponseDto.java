package com.maintenance.board.dto.Board;

import com.maintenance.board.domain.Board.Board;
import com.maintenance.board.domain.member.Member;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class BoardListResponseDto {
    private final Long id;
    private final String processing;
    private final String title;
    private final String memberName;
    private final String memberFacility;
    private final String chargedName;
    private final String createDate;

    public BoardListResponseDto(Board entity) {
        this.id = entity.getId();
        this.processing = entity.getProcessing();
        this.title = entity.getTitle();
        this.memberName = entity.getName();
        this.memberFacility = entity.getFacility() + "\r\n(" + entity.getSiteName() + ")";
        this.chargedName = entity.getChargedName();
        this.createDate = entity.getCreatedDate();
    }
}