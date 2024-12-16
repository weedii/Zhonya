package com.madebywael.zhonya.watch;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.madebywael.zhonya.common.PageResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("watches")
@RequiredArgsConstructor
public class WatchController {

    private final WatchService watchService;

    @GetMapping
    public ResponseEntity<PageResponse<WatchResponse>> getAllWatches(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size) {

        return ResponseEntity.ok(watchService.getAllWatches(page, size));
    }

    @GetMapping("/{watch-id}")
    public ResponseEntity<WatchResponse> getWatchById(
            @PathVariable("watch-id") Long watchReference) {

        return ResponseEntity.ok(watchService.getWatchById(watchReference));
    }

}
