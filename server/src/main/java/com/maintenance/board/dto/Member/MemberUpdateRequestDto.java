package com.maintenance.board.dto.Member;

import com.maintenance.board.domain.member.Member;
import com.maintenance.board.domain.member.Role;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberUpdateRequestDto {

    private String siteName;
    private String siteAddress;
    private String password;
    private String name;
    private String callNo;
    private String phoneNo;
    private String faxNo;
    private String email;
    private String position;
    private String department;
    private Role role;

    @Builder
    public MemberUpdateRequestDto(String siteName, String siteAddress, String password, String name, String callNo, String phoneNo, String faxNo, String email, String position, String department, Role role) {
        this.siteName = siteName;
        this.siteAddress = siteAddress;
        this.password = password;
        this.name = name;
        this.callNo = callNo;
        this.phoneNo = phoneNo;
        this.faxNo = faxNo;
        this.email = email;
        this.position = position;
        this.department = department;
        this.role = role;
    }
}
