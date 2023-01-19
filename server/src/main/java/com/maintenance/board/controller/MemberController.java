package com.maintenance.board.controller;

import com.maintenance.board.Service.MemberService;
import com.maintenance.board.dto.Member.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class MemberController {
    private final MemberService memberService;

    //Create
    @PostMapping("/api/memberCreate")
    @ResponseStatus(HttpStatus.CREATED)
    public String create(@RequestBody MemberCreateRequestDto requestDto) {
        return memberService.create(requestDto);
    }

    //Update
    @PutMapping("/api/member/{id}")
    public String update(@PathVariable String id, @RequestBody MemberUpdateRequestDto requestDto) {
        return memberService.update(id, requestDto);
    }

    //개별 조회
    @GetMapping("/api/member/{id}")
    public MemberResponseDto searchById(@PathVariable String id) {
        return memberService.searchById(id);
    }

    @GetMapping("/api/memberCharged/{name}")
    public MemberChargedResponseDto searchChargedByName(@PathVariable String name) {
        return memberService.searchChargedByName(name);
    }

    //전체 조회(목록)
    @GetMapping("/api/member")
    public List<MemberListResponseDto> searchAllDesc() {
        return memberService.searchAllDesc();
    }

    //Delete
    @DeleteMapping("/api/member/{id}")
    public void delete(@PathVariable String id){
        memberService.delete(id);
    }

    @GetMapping("/api/member/{id}/exists")
    public ResponseEntity<Boolean> checkIdDuplicate(@PathVariable String id) {
        return ResponseEntity.ok(memberService.checkIdDuplicate(id));
    }
}
