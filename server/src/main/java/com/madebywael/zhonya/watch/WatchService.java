package com.madebywael.zhonya.watch;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.madebywael.zhonya.common.PageResponse;
import com.madebywael.zhonya.watch.brands.Brands;
import com.madebywael.zhonya.watch.brands.BrandsRepository;
import com.madebywael.zhonya.watch.brands.BrandsRequest;

import io.jsonwebtoken.lang.Collections;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WatchService {

    private final WatchRepository watchRepository;
    private final WatchMapper watchMapper;
    private final BrandsRepository brandsRepository;

    public PageResponse<WatchResponse> getAllWatches(int page, int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("price").ascending());

        Page<Watch> watches = watchRepository.findAll(pageable);

        List<WatchResponse> watchResponses = watches.stream()
                .map(w -> watchMapper.toWatchResponse(w))
                .toList();

        return new PageResponse<>(
                watchResponses,
                watches.getNumber(),
                watches.getSize(),
                watches.getTotalElements(),
                watches.getTotalPages(),
                watches.isFirst(),
                watches.isLast());
    }

    public WatchResponse getWatchById(Long watchReference) {
        return watchRepository.findById(watchReference)
                .map(w -> watchMapper.toWatchResponse(w))
                .orElseThrow(() -> new EntityNotFoundException("No watch found with the reference: " + watchReference));
    }

    public WatchResponse createWatch(WatchRequest request) {
        try {
            // check if the watch brand & model exists
            Watch watchExists = watchRepository.findByBrandAndModel(request.getBrand(), request.getModel());

            if (watchExists != null) {
                watchExists.setQuantity(watchExists.getQuantity() + 1);
                watchRepository.save(watchExists);
                return watchMapper.toWatchResponse(watchExists);
            }

            // create new watch
            Watch watch = Watch.builder()
                    .brand(request.getBrand())
                    .model(request.getModel())
                    .description(request.getDescription())
                    .pictureUrl(request.getPictureUrl())
                    .price(request.getPrice())
                    .quantity(request.getQuantity() != null ? request.getQuantity() : 1)
                    .build();
            watchRepository.save(watch);

            return watchMapper.toWatchResponse(watch);

        } catch (Exception e) {
            throw new RuntimeException("Error while creating new watch: " + e.getMessage(), e);
        }
    }

    public WatchResponse updateWatchById(
            Long watchReference,
            WatchRequest request,
            Authentication connectedUser) {

        // find watch by ID
        Watch watch = watchRepository.findById(watchReference)
                .orElseThrow(() -> new EntityNotFoundException("No watch found with the reference: " + watchReference));

        // update the watch
        if (request.getDescription() != null)
            watch.setDescription((request.getDescription()));

        if (request.getPictureUrl() != null)
            watch.setPictureUrl((request.getPictureUrl()));

        if (request.getPrice() != null)
            watch.setPrice((request.getPrice()));

        if (request.getQuantity() != null)
            watch.setQuantity((request.getQuantity()));

        watchRepository.save(watch);

        return watchMapper.toWatchResponse(watch);
    }

    public void deleteWatchById(Long watchReference) {
        try {
            // find the watch by ID
            Watch watch = watchRepository.findById(watchReference)
                    .orElseThrow(
                            () -> new EntityNotFoundException("No watch found with the reference: " + watchReference));

            watchRepository.delete(watch);
        } catch (Exception e) {
            throw new RuntimeException("Error while delting watch");
        }
    }

    public List<String> getBrandsList() {

        return brandsRepository.findAll()
                .stream()
                .findFirst()
                .map(Brands::getBrands)
                .orElse(Collections.emptyList());
    }

    public void saveBrand(BrandsRequest request) {
        Brands brands = brandsRepository.findAll()
                .stream()
                .findFirst()
                .orElse(Brands.builder().brands(new ArrayList<String>()).build());

        if (!brands.getBrands().contains(request.getBrand())) {
            brands.getBrands().add(request.getBrand());
            brandsRepository.save(brands);
        }

    }

    public List<String> deleteBrand(BrandsRequest request) {
        Brands brands = brandsRepository.findAll()
                .stream()
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException("No brands found to delete"));

        if (brands.getBrands().contains(request.getBrand())) {
            brands.getBrands().remove(request.getBrand());
            brandsRepository.save(brands);
        }

        return brands.getBrands();

    }

}
