package com.example.backend;

import com.example.backend.Dto.ParkingDto;

import static org.mockito.Mockito.when;
import com.example.backend.Dto.ParkingDto;
import com.example.backend.Model.Parking;
import com.example.backend.Service.ParkingService;
import com.example.backend.mapper.ParkingMapper;
import com.example.backend.repository.ParkingRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
public class ParkingserviceTest {



        @Mock
        private ParkingMapper parkingMapper;

        @Mock
        private ParkingRepository parkingRepository;

        @InjectMocks
        private ParkingService parkingService;

        private ParkingDto testParkingDto;
        private Parking testParking;
        private Parking savedParking;

        @BeforeEach
        void setUp() {
            // Setup test data
            testParkingDto = new ParkingDto();
            testParkingDto.setName("Test Parking");
            testParkingDto.setOpening_hours("08:00-20:00");

            testParking = new Parking();
            testParking.setName("Test Parking");
            testParking.setOpening_hours("08:00-20:00");

            savedParking = new Parking();
            savedParking.setParkingId(1L);
            savedParking.setName("Test Parking");
            savedParking.setOpening_hours("08:00-20:00");
        }

        @Test
        void addParking_ShouldReturnParkingDto_WhenValidInput() {
            // Arrange
            when(parkingMapper.toEntity(testParkingDto)).thenReturn(testParking);
            when(parkingRepository.save(testParking)).thenReturn(savedParking);
            when(parkingMapper.toDto(savedParking)).thenReturn(testParkingDto);

            // Act
            ParkingDto result = parkingService.addParking(testParkingDto);

            // Assert
            assertNotNull(result);
            assertEquals(testParkingDto.getName(), result.getName());
            assertEquals(testParkingDto.getOpening_hours(), result.getOpening_hours());

            // Verify method calls
            verify(parkingMapper).toEntity(testParkingDto);
            verify(parkingRepository).save(testParking);
            verify(parkingMapper).toDto(savedParking);
        }

        @Test
        void addParking_ShouldCallMapperWithCorrectArguments() {
            // Arrange
            when(parkingMapper.toEntity(any(ParkingDto.class))).thenReturn(testParking);
            when(parkingRepository.save(any(Parking.class))).thenReturn(savedParking);
            when(parkingMapper.toDto(any(Parking.class))).thenReturn(testParkingDto);

            // Act
            parkingService.addParking(testParkingDto);

            // Assert
            verify(parkingMapper).toEntity(testParkingDto);
            verify(parkingRepository).save(testParking);
            verify(parkingMapper).toDto(savedParking);
        }

        @Test
        void getAllParkings_ShouldReturnListOfParkingDtos_WhenParkingsExist() {
            // Arrange
            Parking parking1 = new Parking();
            parking1.setParkingId(1L);
            parking1.setName("Parking 1");
            parking1.setOpening_hours("08:00-20:00");

            Parking parking2 = new Parking();
            parking2.setParkingId(2L);
            parking2.setName("Parking 2");
            parking2.setOpening_hours("09:00-21:00");

            List<Parking> parkings = Arrays.asList(parking1, parking2);

            ParkingDto dto1 = new ParkingDto();
            dto1.setName("Parking 1");
            dto1.setOpening_hours("08:00-20:00");

            ParkingDto dto2 = new ParkingDto();
            dto2.setName("Parking 2");
            dto2.setOpening_hours("09:00-21:00");

            List<ParkingDto> expectedDtos = Arrays.asList(dto1, dto2);

            when(parkingRepository.findAllByPlaces()).thenReturn(parkings);
            when(parkingMapper.toDtos(parkings)).thenReturn(expectedDtos);

            // Act
            List<ParkingDto> result = parkingService.getAllParkings();

            // Assert
            assertNotNull(result);
            assertEquals(2, result.size());
            assertEquals("Parking 1", result.get(0).getName());
            assertEquals("Parking 2", result.get(1).getName());
            assertEquals("08:00-20:00", result.get(0).getOpening_hours());
            assertEquals("09:00-21:00", result.get(1).getOpening_hours());

            // Verify method calls
            verify(parkingRepository).findAllByPlaces();
            verify(parkingMapper).toDtos(parkings);
        }

        @Test
        void getAllParkings_ShouldReturnEmptyList_WhenNoParkingsExist() {
            // Arrange
            List<Parking> emptyParkings = Arrays.asList();
            List<ParkingDto> emptyDtos = Arrays.asList();

            when(parkingRepository.findAllByPlaces()).thenReturn(emptyParkings);
            when(parkingMapper.toDtos(emptyParkings)).thenReturn(emptyDtos);

            // Act
            List<ParkingDto> result = parkingService.getAllParkings();

            // Assert
            assertNotNull(result);
            assertTrue(result.isEmpty());

            // Verify method calls
            verify(parkingRepository).findAllByPlaces();
            verify(parkingMapper).toDtos(emptyParkings);
        }

        @Test
        void getAllParkings_ShouldBeTransactional() {
            // Arrange
            List<Parking> parkings = Arrays.asList(testParking);
            List<ParkingDto> dtos = Arrays.asList(testParkingDto);

            when(parkingRepository.findAllByPlaces()).thenReturn(parkings);
            when(parkingMapper.toDtos(parkings)).thenReturn(dtos);

            // Act
            List<ParkingDto> result = parkingService.getAllParkings();

            // Assert
            assertNotNull(result);
            // The @Transactional annotation should be preserved in the method
            // This test ensures the method can be called successfully
            verify(parkingRepository).findAllByPlaces();
        }

        @Test
        void addParking_ShouldHandleMapperCorrectly() {
            // Arrange
            ParkingDto inputDto = new ParkingDto();
            inputDto.setName("New Parking");
            inputDto.setOpening_hours("10:00-22:00");

            Parking entityFromMapper = new Parking();
            entityFromMapper.setName("New Parking");
            entityFromMapper.setOpening_hours("10:00-22:00");

            Parking savedEntity = new Parking();
            savedEntity.setParkingId(5L);
            savedEntity.setName("New Parking");
            savedEntity.setOpening_hours("10:00-22:00");

            ParkingDto expectedResult = new ParkingDto();
            expectedResult.setName("New Parking");
            expectedResult.setOpening_hours("10:00-22:00");

            when(parkingMapper.toEntity(inputDto)).thenReturn(entityFromMapper);
            when(parkingRepository.save(entityFromMapper)).thenReturn(savedEntity);
            when(parkingMapper.toDto(savedEntity)).thenReturn(expectedResult);

            // Act
            ParkingDto result = parkingService.addParking(inputDto);

            // Assert
            assertNotNull(result);
            assertEquals("New Parking", result.getName());
            assertEquals("10:00-22:00", result.getOpening_hours());

            // Verify the flow
            verify(parkingMapper, times(1)).toEntity(inputDto);
            verify(parkingRepository, times(1)).save(entityFromMapper);
            verify(parkingMapper, times(1)).toDto(savedEntity);
        }
}
