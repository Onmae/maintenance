package com.maintenance.board.domain.File;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.maintenance.board.domain.BaseTime;
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
public class File extends BaseTime {

    @Id
    @GeneratedValue
    @Column(name = "file_id")
    private Long id;

    @Column(nullable = false)
    private String originFileName;

    @Column(nullable = false)
    private String savedFileName;

    private String uploadDir;

    private String extension;

    private Long size;

    private String contentType;

    @OneToOne(mappedBy = "file")
    @JsonBackReference
    private BoardFile boardFile;

    @Builder
    public File(Long id, String originFileName, String savedFileName, String uploadDir, String extension, Long size, String contentType) {
        this.id = id;
        this.originFileName = originFileName;
        this.savedFileName = savedFileName;
        this.uploadDir = uploadDir;
        this.extension = extension;
        this.size = size;
        this.contentType = contentType;
    }
}
