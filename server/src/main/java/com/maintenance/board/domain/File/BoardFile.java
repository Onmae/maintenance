package com.maintenance.board.domain.File;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.maintenance.board.domain.File.File;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@EntityListeners(AuditingEntityListener.class)
public class BoardFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_file_id")
    private Long id;

    private Long boardId;
    private String delYn;
    private String isComment;

    @OneToOne
    @JsonManagedReference
    @JoinColumn(name = "file_id")
    private File file;

    @Builder
    public BoardFile(Long boardId, Long fileId, String delYn,String isComment, File file){
        this.boardId = boardId;
        this.delYn = "N";
        this.file = file;
        this.isComment = isComment;
    }

    public BoardFile delete(String delYn){
        this.delYn = delYn;
        return this;
    }
}
