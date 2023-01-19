package com.maintenance.board.dto.Member;

import com.maintenance.board.domain.member.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
public class MemberListResponseDto {

    private final String id;
    private final String department;
    private final String position;
    private final String name;
    private final String callNo;
    private final String faxNo;
    private final String email;
    private final String siteName;

    public MemberListResponseDto(Member entity) {
        this.id = entity.getId();
        this.department = entity.getDepartment();
        this.position = entity.getPosition();
        this.name = entity.getName();
        this.callNo = entity.getCallNo();
        this.faxNo = entity.getFaxNo();
        this.email = entity.getEmail();
        this.siteName = entity.getSiteName();
    }
}
