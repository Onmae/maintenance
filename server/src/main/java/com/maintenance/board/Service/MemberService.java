package com.maintenance.board.Service;

import com.maintenance.board.domain.member.Member;
import com.maintenance.board.domain.member.MemberRepository;
import com.maintenance.board.domain.member.Role;
import com.maintenance.board.dto.Member.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MemberService {
    private final MemberRepository MemberRepository;

    @Transactional
    public String create(MemberCreateRequestDto requestDto) {
        return MemberRepository.save(requestDto.toEntity()).getId();
    }

    @Transactional
    public String update(String id, MemberUpdateRequestDto requestDto) {
        Member Member = MemberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다."));

        Member.update(requestDto.getSiteName(),
                requestDto.getSiteAddress(),
                requestDto.getPassword(),
                requestDto.getName(),
                requestDto.getCallNo(),
                requestDto.getPhoneNo(),
                requestDto.getFaxNo(),
                requestDto.getEmail(),
                requestDto.getPosition(),
                requestDto.getDepartment());

        return id;
    }

    @Transactional(readOnly = true)
    public MemberResponseDto searchById(String id) {
        Member Member = MemberRepository.findById(id).orElseThrow(()
                -> new IllegalArgumentException("해당 유저가 존재하지 않습니다."));

        return new MemberResponseDto(Member);
    }

    @Transactional(readOnly = true)
    public MemberChargedResponseDto searchChargedByName(String name) {
        Member Member = MemberRepository.findByNameAndRole(name,Role.ADMIN);

        return new MemberChargedResponseDto(Member);
    }

    @Transactional(readOnly = true)
    public List<MemberListResponseDto> searchAllDesc() {
        return MemberRepository.findByRoleOrderByIdDesc(Role.USER).stream()
                .map(MemberListResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public boolean checkIdDuplicate(String id) {
        return MemberRepository.existsById(id);
    }

    @Transactional
    public void delete(String id) {
        Member Member = MemberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다."));

        MemberRepository.delete(Member);
    }

}
