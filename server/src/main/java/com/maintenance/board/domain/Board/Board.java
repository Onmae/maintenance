package com.maintenance.board.domain.Board;


import com.maintenance.board.domain.BaseTime;
import com.maintenance.board.domain.member.Member;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "board")
public class Board extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long id;
    private String facility;

    private String name;

    private String siteName;

    private String siteAddress;

    private String processing;

    @Column(nullable = false, length = 1000)
    private String title;

    @Column(columnDefinition = "TEXT", length = 4000)
    private String content;

    private String chargedName;

    private String comment;

    private String processedTime;

    //빌더
    @Builder
    public Board(String facility, String name, String siteName, String siteAddress, String processing, String title, String content, String chargedName, String comment) {
        this.facility = facility;
        this.name = name;
        this.siteName = siteName;
        this.siteAddress = siteAddress;
        this.processing = processing;
        this.title = title;
        this.content = content;
        this.chargedName = chargedName;
        this.comment = comment;
    }




    public void update(String title, String content, String chargedName, String comment, String processing, String processedTime) {
        this.title = title;
        this.content = content;
        this.chargedName = chargedName;
        this.comment = comment;
        this.processing = processing;
        this.processedTime = processedTime;
    }
}
