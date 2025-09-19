# Tests for ZION cryptocurrency
cmake_minimum_required(VERSION 3.15)

# Simple test executable (placeholder for now)
add_executable(test_basic test_basic.cpp)
target_link_libraries(test_basic zion_core)

# C library test
if(BUILD_MINER_LIB)
    add_executable(test_miner_c test_miner_c.c)
    target_link_libraries(test_miner_c zion_miner_c)
    target_include_directories(test_miner_c PRIVATE ../include)
endif()

# Register tests
add_test(NAME basic_test COMMAND test_basic)
