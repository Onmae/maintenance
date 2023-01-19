package com.maintenance.board.dto.Board;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.maintenance.board.domain.Board.Board;
import com.maintenance.board.domain.Board.BoardFileInterface;
import com.maintenance.board.domain.File.BoardFile;
import com.maintenance.board.domain.member.Member;
import com.maintenance.board.dto.File.BoardFileDto;
import com.maintenance.board.dto.File.FileDto;
import com.maintenance.board.dto.File.FileResponseDto;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Setter
public class BoardResponseDto {
    private Long id;
    private String createdDate;
    private String facility;
    private String name;
    private String siteName;
    private String siteAddress;
    private String processing;
    private String processedTime;

    private String title;
    private String content;

    private String chargedName;
    private String comment;

    private List<BoardFile> files ;


    public BoardResponseDto(Board entity, List<BoardFile> files) {
        this.id = entity.getId();
        this.facility = entity.getFacility();
        this.name = entity.getName();
        this.siteName = entity.getSiteName();
        this.siteAddress = entity.getSiteAddress();
        this.processing = entity.getProcessing();
        this.processedTime = entity.getProcessedTime();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.createdDate = entity.getCreatedDate();
        this.chargedName = entity.getChargedName();
        this.comment = entity.getComment();
        this.files = files;
    }

}
