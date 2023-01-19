package com.maintenance.board.dto.Member;

import com.maintenance.board.domain.member.Member;
import lombok.Getter;

@Getter
public class MemberResponseDto {

    private final String id;
    private final String facility;
    private final String siteName;
    private final String password;
    private final String siteAddress;
    private final String name;
    private final String callNo;
    private final String phoneNo;
    private final String faxNo;
    private final String email;
    private final String position;
    private final String department;


    public MemberResponseDto(Member entity) {
        this.id = entity.getId();
        this.facility = entity.getFacility();
        this.siteName = entity.getSiteName();
        this.siteAddress = entity.getSiteAddress();
        this.name = entity.getName();
        this.callNo = entity.getCallNo();
        this.phoneNo = entity.getPhoneNo();
        this.faxNo = entity.getFaxNo();
        this.email = entity.getEmail();
        this.position = entity.getPosition();
        this.department =  entity.getDepartment();
        this.password = entity.getPassword();
    }
}

