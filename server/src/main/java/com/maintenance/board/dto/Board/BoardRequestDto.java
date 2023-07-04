package com.maintenance.board.dto.Board;

import com.maintenance.board.domain.Board.Board;
import com.maintenance.board.domain.member.Member;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
public class    BoardRequestDto {
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
    private List<MultipartFile> multipartFile ;
    private String isComment;


    @Builder
    public BoardRequestDto(String facility, String name, String siteName, String siteAddress, String processing, String processedTime, String title, String content, String chargedName, String comment, List<MultipartFile> multipartFile, String isComment) {
        this.facility = facility;
        this.name = name;
        this.siteName = siteName;
        this.siteAddress = siteAddress;
        this.processing = processing;
        this.processedTime = processedTime;
        this.title = title;
        this.content = content;
        this.chargedName = chargedName;
        this.comment = comment;
        this.multipartFile = multipartFile;
        this.isComment = isComment;
    }




    public Board toEntity() {
        return Board.builder()
                .facility(facility)
                .name(name)
                .siteName(siteName)
                .siteAddress(siteAddress)
                .processing("접수중")
                .title(title)
                .content(content)
                .build();
    }
}
