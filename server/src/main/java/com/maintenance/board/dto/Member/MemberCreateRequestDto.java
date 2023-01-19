package com.maintenance.board.dto.Member;

import com.maintenance.board.domain.Board.Board;
import com.maintenance.board.domain.member.Member;
import com.maintenance.board.domain.member.Role;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@Getter
@NoArgsConstructor
public class MemberCreateRequestDto {

    private String id;
    private String facility;
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
    public MemberCreateRequestDto(String id, String facility, String siteName, String siteAddress, String password, String name, String callNo, String phoneNo, String faxNo, String email, String position, String department) {
        this.id = id;
        this.facility = facility;
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
        this.role = Role.USER;
    }

    public Member toEntity() {
        return Member.builder()
                .id(id)
                .password(password)
                .facility(facility)
                .siteName(siteName)
                .siteAddress(siteAddress)
                .name(name)
                .callNo(callNo)
                .phoneNo(phoneNo)
                .faxNo(faxNo)
                .email(email)
                .position(position)
                .department(department)
                .build();
    }
}
