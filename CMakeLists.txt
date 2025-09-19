cmake_minimum_required(VERSION 3.15)
project(ZION VERSION 1.0.0 LANGUAGES CXX C)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Build options
option(BUILD_TESTS "Build tests" ON)
option(BUILD_WALLET "Build wallet application" ON)
option(BUILD_MINER "Build mining daemon" ON)
option(BUILD_MINER_V2 "Build enhanced miner v2" OFF)

# Find packages
find_package(Threads REQUIRED)
find_package(OpenSSL REQUIRED)

# Include directories
include_directories(include)
include_directories(external/randomx/src)

# External dependencies
add_subdirectory(external/randomx)

# Source files
file(GLOB_RECURSE CORE_SOURCES "src/core/*.cpp")
list(APPEND CORE_SOURCES src/core/config.cpp)
file(GLOB_RECURSE NETWORK_SOURCES "src/network/*.cpp")
include_directories(include/network)
file(GLOB_RECURSE CRYPTO_SOURCES "src/crypto/*.cpp")

# Core library
add_library(zion_core STATIC
    ${CORE_SOURCES}
    ${NETWORK_SOURCES}
    ${CRYPTO_SOURCES}
)

# Set position-independent code for shared library compatibility
set_property(TARGET zion_core PROPERTY POSITION_INDEPENDENT_CODE ON)

target_link_libraries(zion_core
    OpenSSL::SSL
    OpenSSL::Crypto
    Threads::Threads
    randomx
)

# ZION daemon
add_executable(ziond
    src/daemon/main.cpp
)

target_link_libraries(ziond zion_core)

# Genesis tool
add_executable(zion_genesis
    tools/zion_genesis.cpp
)

target_link_libraries(zion_genesis zion_core)

# Mining daemon
if(BUILD_MINER)
    # Původní miner (bez v2)
    add_executable(zion_miner
        src/mining/miner.cpp
    )
    target_link_libraries(zion_miner zion_core)
endif()

# Volitelně sestavit vylepšený miner v2
if(BUILD_MINER_V2)
    add_executable(zion_miner_v2
        src/mining/miner_v2.cpp
    )
    target_link_libraries(zion_miner_v2 zion_core)
endif()

# Mining C library for mobile bindings
option(BUILD_MINER_LIB "Build miner C library" ON)
if(BUILD_MINER_LIB)
    add_library(zion_miner_c SHARED
        src/mining/miner_c.cpp
    )
    target_link_libraries(zion_miner_c zion_core)
    target_include_directories(zion_miner_c PUBLIC include)
    
    # Set library properties
    set_target_properties(zion_miner_c PROPERTIES
        VERSION 1.0.0
        SOVERSION 1
        PUBLIC_HEADER include/zion_miner_c.h
    )
    
    # Also build static version
    add_library(zion_miner_c_static STATIC
        src/mining/miner_c.cpp
    )
    target_link_libraries(zion_miner_c_static zion_core)
    target_include_directories(zion_miner_c_static PUBLIC include)
    set_target_properties(zion_miner_c_static PROPERTIES OUTPUT_NAME zion_miner_c)
endif()

# Wallet application
if(BUILD_WALLET)
    file(GLOB_RECURSE WALLET_SOURCES "src/wallet/*.cpp")
    add_executable(zion_wallet
        ${WALLET_SOURCES}
    )
    target_link_libraries(zion_wallet zion_core)
endif()

# Tests
if(BUILD_TESTS)
    enable_testing()
    add_subdirectory(tests)
endif()
