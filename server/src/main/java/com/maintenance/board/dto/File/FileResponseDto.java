package com.maintenance.board.dto.File;

import lombok.Builder;
import lombok.Data;

@Data
public class FileResponseDto {
    private Long id;
    private String originFileName;
    private Long size;
    private String extension;
}


