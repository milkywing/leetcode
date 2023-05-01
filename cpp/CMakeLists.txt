cmake_minimum_required(VERSION 3.21)
project(leetcode)

if (NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE "Release" CACHE STRING "Choose the type of build." FORCE)
endif ()

file(GLOB_RECURSE SRC_LIST CONFIGURE_DEPENDS src/*.cpp include/*.h)

add_library(Leet STATIC ${SRC_LIST})
target_include_directories(Leet PUBLIC include)