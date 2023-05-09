cmake_minimum_required(VERSION 3.21)

if (NOT CMAKE_BUILD_TYPE)
  set(CMAKE_BUILD_TYPE Release)
endif ()

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

project(leetcode)

file(GLOB srcList CONFIGURE_DEPENDS src/*.cpp)
add_library(leet STATIC ${srcList})
target_include_directories(leet PRIVATE include)

add_executable(main main.cpp)
target_include_directories(main PUBLIC include)