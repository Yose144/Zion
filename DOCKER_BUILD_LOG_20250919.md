# ZION BUILD LOG - 19. září 2025

## PŘEHLED BUILDU 🏗️

### STATUS: **93% COMPLETION** ✅
- **ziond daemon**: ✅ ÚSPĚŠNĚ ZKOMPILOVÁN
- **ConnectivityTool**: ❌ LINKING ERROR (Common::read/write)
- **Serialization library**: ❌ Undefined references

### HETZNER SERVER DEPLOYMENT 🖥️
- **Server**: 91.98.122.165 (Ubuntu 24.04.3 LTS)
- **Docker**: Multi-stage build s Ubuntu 22.04
- **Compiler**: GCC 11.4.0, CMake, Boost 1.74.0
- **Ports**: 22, 3333, 18080, 18081, 80, 443

## APLIKOVANÉ FIXES 🔧

### 1. C++ STANDARD LIBRARY HEADERS (12+ fixes)
```cpp
#include <algorithm>  // std::sort
#include <functional> // std::function  
#include <cstring>    // memcpy
#include <memory>     // std::unique_ptr
#include <iostream>   // std::cout
#include <fstream>    // std::ifstream
#include <sstream>    // std::stringstream
#include <vector>     // std::vector
#include <map>        // std::map
#include <set>        // std::set
#include <string>     // std::string
#include <chrono>     // std::chrono
```

### 2. BOOST NAMESPACE RESOLUTION
```cpp
// PŘED:
using namespace boost::placeholders;

// PO:
using boost::placeholders::_1;
using boost::placeholders::_2;
```

### 3. CMAKE GLOB PATTERNS
```cmake
# OPRAVENO v zion-cryptonote/src/CMakeLists.txt:
file(GLOB_RECURSE Common Common/*.cpp)
file(GLOB_RECURSE Serialization Serialization/*.cpp)
```

### 4. DOCKER DEPENDENCIES
```dockerfile
# Přidáno do Dockerfile.zion-cryptonote:
RUN apt-get update && apt-get install -y \
    libminiupnpc-dev \
    # ... ostatní dependencies
```

### 5. LINKING ORDER FIXES
```cmake
# OPRAVENO pořadí libraries:
target_link_libraries(ConnectivityTool 
    Common 
    Serialization 
    CryptoNoteCore 
    Logging 
    Crypto 
    P2P 
    Rpc 
    Http 
    System 
    ${Boost_LIBRARIES} 
    miniupnpc
)
```

## AKTUÁLNÍ PROBLÉM 🚨

### StreamTools.cpp Linking Error
```
/usr/bin/ld: libSerialization.a(KVBinaryInputStreamSerializer.cpp.o): 
undefined reference to `Common::read(Common::IInputStream&, void*, unsigned long)'

/usr/bin/ld: libSerialization.a(KVBinaryOutputStreamSerializer.cpp.o): 
undefined reference to `Common::write(Common::IOutputStream&, void const*, unsigned long)'
```

### Identifikované příčiny:
1. **StreamTools.cpp** existuje v `src/Common/StreamTools.cpp`
2. **GLOB pattern** byl opraven na `Common/*.cpp`
3. **Common library** je definována správně
4. **Linking order** opraven (Common před Serialization)

### Možné řešení:
- Zkontrolovat zda StreamTools.cpp je skutečně kompilován
- Ověřit symbol export/visibility
- Přidat explicit StreamTools.cpp do CMakeLists

## BUILD PROGRESSION 📈

- **Start**: 51% completion
- **Po C++ fixes**: 74% completion  
- **Po Boost fixes**: 92% completion
- **Po GLOB fixes**: 93% completion ← **AKTUÁLNÍ STAV**
- **Cíl**: 100% completion

## ÚSPĚŠNĚ ZKOMPILOVANÉ MODULY ✅

1. **Crypto library** ✅
2. **Common library** ✅ (ale linking issue)
3. **Http library** ✅
4. **Logging library** ✅
5. **NodeRpcProxy** ✅
6. **Rpc library** ✅
7. **CryptoNoteCore** ✅
8. **P2P library** ✅
9. **System library** ✅
10. **Transfers library** ✅
11. **Wallet library** ✅
12. **PaymentGate** ✅
13. **JsonRpcServer** ✅
14. **ziond (Daemon)** ✅ **HOTOVO!**

## ZBÝVAJÍCÍ ÚKOLY 📋

- [ ] **ConnectivityTool linking** - Common::read/write undefined references
- [ ] **Serialization library** - StreamTools.cpp integration
- [ ] **Final executables**: zion_wallet, zion_connectivity_tool
- [ ] **Complete deployment** na port 3333

## COMMANDS PRO POKRAČOVÁNÍ 💻

```bash
# Kontrola StreamTools kompilace:
grep -r "StreamTools" zion-cryptonote/build/src/CMakeFiles/Common.dir/

# Test explicit StreamTools include:
echo 'src/Common/StreamTools.cpp' >> zion-cryptonote/src/CMakeLists.txt

# Final build test:
docker build -f docker/Dockerfile.zion-cryptonote -t zion-cryptonote:latest .
```

---

**BUILD STATUS: 93% COMPLETE** - ALMOST THERE! 🎯

**NÁSLEDUJÍCÍ KROKY**: Dokončit StreamTools.cpp linking a dosáhnout 100% completion\n## Build pá 19. září 2025 10:10:07 UTC
#0 building with "desktop-linux" instance using docker driver

#1 [internal] load build definition from Dockerfile.zion-cryptonote
#1 transferring dockerfile: 1.43kB 0.0s done
#1 DONE 0.0s

#2 resolve image config for docker-image://docker.io/docker/dockerfile:1
#2 ...

#3 [auth] docker/dockerfile:pull token for registry-1.docker.io
#3 DONE 0.0s

#2 resolve image config for docker-image://docker.io/docker/dockerfile:1
#2 DONE 1.6s

#4 docker-image://docker.io/docker/dockerfile:1@sha256:dabfc0969b935b2080555ace70ee69a5261af8a8f1b4df97b9e7fbcf6722eddf
#4 resolve docker.io/docker/dockerfile:1@sha256:dabfc0969b935b2080555ace70ee69a5261af8a8f1b4df97b9e7fbcf6722eddf 0.0s done
#4 CACHED

#5 [internal] load metadata for docker.io/library/ubuntu:22.04
#5 ...

#6 [auth] library/ubuntu:pull token for registry-1.docker.io
#6 DONE 0.0s

#5 [internal] load metadata for docker.io/library/ubuntu:22.04
#5 DONE 0.8s

#7 [internal] load .dockerignore
#7 transferring context: 333B done
#7 DONE 0.0s

#8 [build 1/6] FROM docker.io/library/ubuntu:22.04@sha256:4e0171b9275e12d375863f2b3ae9ce00a4c53ddda176bd55868df97ac6f21a6e
#8 resolve docker.io/library/ubuntu:22.04@sha256:4e0171b9275e12d375863f2b3ae9ce00a4c53ddda176bd55868df97ac6f21a6e done
#8 CACHED

#9 [internal] load build context
#9 transferring context: 259.32kB 0.1s done
#9 DONE 0.1s

#10 [stage-1 2/4] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&             apt-get install -y --no-install-recommends                 libboost-all-dev libc6 procps miniupnpc &&         rm -rf /var/lib/apt/lists/*
#10 0.813 Get:1 http://security.ubuntu.com/ubuntu jammy-security InRelease [129 kB]
#10 0.970 Get:2 http://archive.ubuntu.com/ubuntu jammy InRelease [270 kB]
#10 1.822 Get:3 http://archive.ubuntu.com/ubuntu jammy-updates InRelease [128 kB]
#10 1.993 Get:4 http://archive.ubuntu.com/ubuntu jammy-backports InRelease [127 kB]
#10 2.185 Get:5 http://security.ubuntu.com/ubuntu jammy-security/restricted amd64 Packages [5496 kB]
#10 3.207 Get:6 http://archive.ubuntu.com/ubuntu jammy/multiverse amd64 Packages [266 kB]
#10 3.722 Get:7 http://archive.ubuntu.com/ubuntu jammy/main amd64 Packages [1792 kB]
#10 6.166 Get:8 http://archive.ubuntu.com/ubuntu jammy/restricted amd64 Packages [164 kB]
#10 6.367 Get:9 http://archive.ubuntu.com/ubuntu jammy/universe amd64 Packages [17.5 MB]
#10 8.620 Get:10 http://security.ubuntu.com/ubuntu jammy-security/main amd64 Packages [3327 kB]
#10 ...

#11 [build 2/6] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&         apt-get install -y --no-install-recommends             build-essential cmake git pkg-config             libboost-all-dev libssl-dev libpthread-stubs0-dev libc6-dev libminiupnpc-dev &&         rm -rf /var/lib/apt/lists/*
#11 0.811 Get:1 http://security.ubuntu.com/ubuntu jammy-security InRelease [129 kB]
#11 0.970 Get:2 http://archive.ubuntu.com/ubuntu jammy InRelease [270 kB]
#11 1.800 Get:3 http://archive.ubuntu.com/ubuntu jammy-updates InRelease [128 kB]
#11 1.993 Get:4 http://archive.ubuntu.com/ubuntu jammy-backports InRelease [127 kB]
#11 2.184 Get:5 http://security.ubuntu.com/ubuntu jammy-security/main amd64 Packages [3327 kB]
#11 3.190 Get:6 http://archive.ubuntu.com/ubuntu jammy/multiverse amd64 Packages [266 kB]
#11 3.679 Get:7 http://archive.ubuntu.com/ubuntu jammy/restricted amd64 Packages [164 kB]
#11 3.779 Get:8 http://archive.ubuntu.com/ubuntu jammy/main amd64 Packages [1792 kB]
#11 4.122 Get:9 http://security.ubuntu.com/ubuntu jammy-security/universe amd64 Packages [1274 kB]
#11 4.967 Get:10 http://security.ubuntu.com/ubuntu jammy-security/restricted amd64 Packages [5496 kB]
#11 6.045 Get:11 http://archive.ubuntu.com/ubuntu jammy/universe amd64 Packages [17.5 MB]
#11 8.194 Get:12 http://security.ubuntu.com/ubuntu jammy-security/multiverse amd64 Packages [71.0 kB]
#11 ...

#10 [stage-1 2/4] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&             apt-get install -y --no-install-recommends                 libboost-all-dev libc6 procps miniupnpc &&         rm -rf /var/lib/apt/lists/*
#10 10.99 Get:11 http://security.ubuntu.com/ubuntu jammy-security/universe amd64 Packages [1274 kB]
#10 12.14 Get:12 http://security.ubuntu.com/ubuntu jammy-security/multiverse amd64 Packages [71.0 kB]
#10 16.08 Get:13 http://archive.ubuntu.com/ubuntu jammy-updates/universe amd64 Packages [1581 kB]
#10 16.57 Get:14 http://archive.ubuntu.com/ubuntu jammy-updates/restricted amd64 Packages [5691 kB]
#10 ...

#11 [build 2/6] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&         apt-get install -y --no-install-recommends             build-essential cmake git pkg-config             libboost-all-dev libssl-dev libpthread-stubs0-dev libc6-dev libminiupnpc-dev &&         rm -rf /var/lib/apt/lists/*
#11 17.60 Get:13 http://archive.ubuntu.com/ubuntu jammy-updates/multiverse amd64 Packages [69.1 kB]
#11 17.62 Get:14 http://archive.ubuntu.com/ubuntu jammy-updates/restricted amd64 Packages [5691 kB]
#11 20.27 Get:15 http://archive.ubuntu.com/ubuntu jammy-updates/universe amd64 Packages [1581 kB]
#11 20.93 Get:16 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 Packages [3642 kB]
#11 22.07 Get:17 http://archive.ubuntu.com/ubuntu jammy-backports/universe amd64 Packages [35.2 kB]
#11 22.08 Get:18 http://archive.ubuntu.com/ubuntu jammy-backports/main amd64 Packages [83.2 kB]
#11 22.36 Fetched 41.6 MB in 22s (1905 kB/s)
#11 22.36 Reading package lists...
#11 24.21 Reading package lists...
#11 ...

#10 [stage-1 2/4] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&             apt-get install -y --no-install-recommends                 libboost-all-dev libc6 procps miniupnpc &&         rm -rf /var/lib/apt/lists/*
#10 18.63 Get:15 http://archive.ubuntu.com/ubuntu jammy-updates/multiverse amd64 Packages [69.1 kB]
#10 18.63 Get:16 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 Packages [3642 kB]
#10 19.57 Get:17 http://archive.ubuntu.com/ubuntu jammy-backports/universe amd64 Packages [35.2 kB]
#10 19.57 Get:18 http://archive.ubuntu.com/ubuntu jammy-backports/main amd64 Packages [83.2 kB]
#10 19.86 Fetched 41.6 MB in 19s (2153 kB/s)
#10 19.86 Reading package lists...
#10 21.15 Reading package lists...
#10 22.13 Building dependency tree...
#10 22.44 Reading state information...
#10 22.81 libc6 is already the newest version (2.35-0ubuntu3.10).
#10 22.81 procps is already the newest version (2:3.3.17-6ubuntu2.1).
#10 22.81 The following additional packages will be installed:
#10 22.81   autoconf automake autotools-dev binutils binutils-common
#10 22.81   binutils-x86-64-linux-gnu cpp-11 gcc-11 gcc-11-base gfortran-11
#10 22.81   ibverbs-providers icu-devtools libasan6 libatomic1 libbinutils
#10 22.81   libboost-atomic-dev libboost-atomic1.74-dev libboost-atomic1.74.0
#10 22.81   libboost-chrono-dev libboost-chrono1.74-dev libboost-chrono1.74.0
#10 22.81   libboost-container-dev libboost-container1.74-dev libboost-container1.74.0
#10 22.81   libboost-context-dev libboost-context1.74-dev libboost-context1.74.0
#10 22.81   libboost-coroutine-dev libboost-coroutine1.74-dev libboost-coroutine1.74.0
#10 22.81   libboost-date-time-dev libboost-date-time1.74-dev libboost-date-time1.74.0
#10 22.81   libboost-dev libboost-exception-dev libboost-exception1.74-dev
#10 22.81   libboost-fiber-dev libboost-fiber1.74-dev libboost-fiber1.74.0
#10 22.81   libboost-filesystem-dev libboost-filesystem1.74-dev
#10 22.81   libboost-filesystem1.74.0 libboost-graph-dev libboost-graph-parallel-dev
#10 22.81   libboost-graph-parallel1.74-dev libboost-graph-parallel1.74.0
#10 22.81   libboost-graph1.74-dev libboost-graph1.74.0 libboost-iostreams-dev
#10 22.81   libboost-iostreams1.74-dev libboost-iostreams1.74.0 libboost-locale-dev
#10 22.81   libboost-locale1.74-dev libboost-locale1.74.0 libboost-log-dev
#10 22.81   libboost-log1.74-dev libboost-log1.74.0 libboost-math-dev
#10 22.81   libboost-math1.74-dev libboost-math1.74.0 libboost-mpi-dev
#10 22.81   libboost-mpi-python-dev libboost-mpi-python1.74-dev
#10 22.81   libboost-mpi-python1.74.0 libboost-mpi1.74-dev libboost-mpi1.74.0
#10 22.81   libboost-nowide-dev libboost-nowide1.74-dev libboost-nowide1.74.0
#10 22.81   libboost-numpy-dev libboost-numpy1.74-dev libboost-numpy1.74.0
#10 22.81   libboost-program-options-dev libboost-program-options1.74-dev
#10 22.81   libboost-program-options1.74.0 libboost-python-dev libboost-python1.74-dev
#10 22.81   libboost-python1.74.0 libboost-random-dev libboost-random1.74-dev
#10 22.81   libboost-random1.74.0 libboost-regex-dev libboost-regex1.74-dev
#10 22.81   libboost-regex1.74.0 libboost-serialization-dev
#10 22.81   libboost-serialization1.74-dev libboost-serialization1.74.0
#10 22.81   libboost-stacktrace-dev libboost-stacktrace1.74-dev
#10 22.81   libboost-stacktrace1.74.0 libboost-system-dev libboost-system1.74-dev
#10 22.81   libboost-system1.74.0 libboost-test-dev libboost-test1.74-dev
#10 22.81   libboost-test1.74.0 libboost-thread-dev libboost-thread1.74-dev
#10 22.81   libboost-thread1.74.0 libboost-timer-dev libboost-timer1.74-dev
#10 22.81   libboost-timer1.74.0 libboost-tools-dev libboost-type-erasure-dev
#10 22.81   libboost-type-erasure1.74-dev libboost-type-erasure1.74.0 libboost-wave-dev
#10 22.81   libboost-wave1.74-dev libboost-wave1.74.0 libboost1.74-dev
#10 22.81   libboost1.74-tools-dev libbrotli1 libbsd0 libc-dev-bin libc6-dev libcbor0.8
#10 22.81   libcc1-0 libcrypt-dev libctf-nobfd0 libctf0 libcurl3-gnutls libedit2
#10 22.81   libevent-2.1-7 libevent-core-2.1-7 libevent-dev libevent-extra-2.1-7
#10 22.81   libevent-openssl-2.1-7 libevent-pthreads-2.1-7 libexpat1 libexpat1-dev
#10 22.81   libfabric1 libfido2-1 libgcc-11-dev libgdbm-compat4 libgdbm6
#10 22.81   libgfortran-11-dev libgfortran5 libgomp1 libhwloc-dev libhwloc-plugins
#10 22.81   libhwloc15 libibverbs-dev libibverbs1 libicu-dev libicu70 libisl23 libitm1
#10 22.81   libjs-jquery libjs-jquery-ui libjs-sphinxdoc libjs-underscore libldap-2.5-0
#10 22.81   liblsan0 libltdl-dev libltdl7 libmd0 libminiupnpc17 libmpc3 libmpdec3
#10 22.81   libmpfr6 libnghttp2-14 libnl-3-200 libnl-3-dev libnl-route-3-200
#10 22.81   libnl-route-3-dev libnsl-dev libnuma-dev libnuma1 libopenmpi-dev libopenmpi3
#10 22.81   libpciaccess0 libperl5.34 libpmix-dev libpmix2 libpsl5 libpsm-infinipath1
#10 22.81   libpsm2-2 libpython3-dev libpython3-stdlib libpython3.10 libpython3.10-dev
#10 22.81   libpython3.10-minimal libpython3.10-stdlib libquadmath0 librdmacm1
#10 22.81   libreadline8 librtmp1 libsasl2-2 libsasl2-modules-db libsigsegv2
#10 22.81   libsqlite3-0 libssh-4 libstdc++-11-dev libtirpc-dev libtsan0 libubsan1
#10 22.81   libucx0 libx11-6 libx11-data libxau6 libxcb1 libxdmcp6 libxext6 libxml2
#10 22.81   libxnvctrl0 linux-libc-dev m4 media-types mpi-default-bin mpi-default-dev
#10 22.81   ocl-icd-libopencl1 openmpi-bin openmpi-common openssh-client perl
#10 22.81   perl-modules-5.34 python3 python3-dev python3-distutils python3-lib2to3
#10 22.81   python3-minimal python3.10 python3.10-dev python3.10-minimal readline-common
#10 22.81   rpcsvc-proto zlib1g-dev
#10 22.82 Suggested packages:
#10 22.82   autoconf-archive gnu-standards autoconf-doc libtool gettext binutils-doc
#10 22.82   gcc-11-locales gcc-11-multilib gcc-11-doc gfortran-11-multilib
#10 22.82   gfortran-11-doc libcoarrays-dev libboost-doc graphviz libboost1.74-doc
#10 22.82   gccxml libboost-contract1.74-dev libmpfrc++-dev libntl-dev xsltproc doxygen
#10 22.82   docbook-xml docbook-xsl default-jdk fop glibc-doc manpages-dev gdbm-l10n
#10 22.82   libhwloc-contrib-plugins icu-doc libjs-jquery-ui-docs libtool-doc minissdpd
#10 22.82   openmpi-doc pciutils libstdc++-11-doc m4-doc opencl-icd gfortran
#10 22.82   | fortran-compiler keychain libpam-ssh monkeysphere ssh-askpass perl-doc
#10 22.82   libterm-readline-gnu-perl | libterm-readline-perl-perl make
#10 22.82   libtap-harness-archive-perl python3-doc python3-tk python3-venv
#10 22.82   python3.10-venv python3.10-doc binfmt-support readline-doc
#10 22.82 Recommended packages:
#10 22.82   manpages manpages-dev libc-devtools ca-certificates javascript-common
#10 22.82   libldap-common libtool libcoarrays-openmpi-dev publicsuffix libsasl2-modules
#10 22.82   xauth netbase
#10 23.66 The following NEW packages will be installed:
#10 23.66   autoconf automake autotools-dev binutils binutils-common
#10 23.66   binutils-x86-64-linux-gnu cpp-11 gcc-11 gcc-11-base gfortran-11
#10 23.66   ibverbs-providers icu-devtools libasan6 libatomic1 libbinutils
#10 23.66   libboost-all-dev libboost-atomic-dev libboost-atomic1.74-dev
#10 23.66   libboost-atomic1.74.0 libboost-chrono-dev libboost-chrono1.74-dev
#10 23.66   libboost-chrono1.74.0 libboost-container-dev libboost-container1.74-dev
#10 23.66   libboost-container1.74.0 libboost-context-dev libboost-context1.74-dev
#10 23.66   libboost-context1.74.0 libboost-coroutine-dev libboost-coroutine1.74-dev
#10 23.66   libboost-coroutine1.74.0 libboost-date-time-dev libboost-date-time1.74-dev
#10 23.66   libboost-date-time1.74.0 libboost-dev libboost-exception-dev
#10 23.66   libboost-exception1.74-dev libboost-fiber-dev libboost-fiber1.74-dev
#10 23.66   libboost-fiber1.74.0 libboost-filesystem-dev libboost-filesystem1.74-dev
#10 23.66   libboost-filesystem1.74.0 libboost-graph-dev libboost-graph-parallel-dev
#10 23.66   libboost-graph-parallel1.74-dev libboost-graph-parallel1.74.0
#10 23.66   libboost-graph1.74-dev libboost-graph1.74.0 libboost-iostreams-dev
#10 23.66   libboost-iostreams1.74-dev libboost-iostreams1.74.0 libboost-locale-dev
#10 23.66   libboost-locale1.74-dev libboost-locale1.74.0 libboost-log-dev
#10 23.66   libboost-log1.74-dev libboost-log1.74.0 libboost-math-dev
#10 23.66   libboost-math1.74-dev libboost-math1.74.0 libboost-mpi-dev
#10 23.66   libboost-mpi-python-dev libboost-mpi-python1.74-dev
#10 23.66   libboost-mpi-python1.74.0 libboost-mpi1.74-dev libboost-mpi1.74.0
#10 23.66   libboost-nowide-dev libboost-nowide1.74-dev libboost-nowide1.74.0
#10 23.66   libboost-numpy-dev libboost-numpy1.74-dev libboost-numpy1.74.0
#10 23.66   libboost-program-options-dev libboost-program-options1.74-dev
#10 23.66   libboost-program-options1.74.0 libboost-python-dev libboost-python1.74-dev
#10 23.66   libboost-python1.74.0 libboost-random-dev libboost-random1.74-dev
#10 23.66   libboost-random1.74.0 libboost-regex-dev libboost-regex1.74-dev
#10 23.66   libboost-regex1.74.0 libboost-serialization-dev
#10 23.66   libboost-serialization1.74-dev libboost-serialization1.74.0
#10 23.66   libboost-stacktrace-dev libboost-stacktrace1.74-dev
#10 23.66   libboost-stacktrace1.74.0 libboost-system-dev libboost-system1.74-dev
#10 23.66   libboost-system1.74.0 libboost-test-dev libboost-test1.74-dev
#10 23.66   libboost-test1.74.0 libboost-thread-dev libboost-thread1.74-dev
#10 23.66   libboost-thread1.74.0 libboost-timer-dev libboost-timer1.74-dev
#10 23.66   libboost-timer1.74.0 libboost-tools-dev libboost-type-erasure-dev
#10 23.66   libboost-type-erasure1.74-dev libboost-type-erasure1.74.0 libboost-wave-dev
#10 23.66   libboost-wave1.74-dev libboost-wave1.74.0 libboost1.74-dev
#10 23.66   libboost1.74-tools-dev libbrotli1 libbsd0 libc-dev-bin libc6-dev libcbor0.8
#10 23.66   libcc1-0 libcrypt-dev libctf-nobfd0 libctf0 libcurl3-gnutls libedit2
#10 23.66   libevent-2.1-7 libevent-core-2.1-7 libevent-dev libevent-extra-2.1-7
#10 23.66   libevent-openssl-2.1-7 libevent-pthreads-2.1-7 libexpat1 libexpat1-dev
#10 23.66   libfabric1 libfido2-1 libgcc-11-dev libgdbm-compat4 libgdbm6
#10 23.66   libgfortran-11-dev libgfortran5 libgomp1 libhwloc-dev libhwloc-plugins
#10 23.66   libhwloc15 libibverbs-dev libibverbs1 libicu-dev libicu70 libisl23 libitm1
#10 23.66   libjs-jquery libjs-jquery-ui libjs-sphinxdoc libjs-underscore libldap-2.5-0
#10 23.66   liblsan0 libltdl-dev libltdl7 libmd0 libminiupnpc17 libmpc3 libmpdec3
#10 23.66   libmpfr6 libnghttp2-14 libnl-3-200 libnl-3-dev libnl-route-3-200
#10 23.66   libnl-route-3-dev libnsl-dev libnuma-dev libnuma1 libopenmpi-dev libopenmpi3
#10 23.66   libpciaccess0 libperl5.34 libpmix-dev libpmix2 libpsl5 libpsm-infinipath1
#10 23.66   libpsm2-2 libpython3-dev libpython3-stdlib libpython3.10 libpython3.10-dev
#10 23.66   libpython3.10-minimal libpython3.10-stdlib libquadmath0 librdmacm1
#10 23.66   libreadline8 librtmp1 libsasl2-2 libsasl2-modules-db libsigsegv2
#10 23.66   libsqlite3-0 libssh-4 libstdc++-11-dev libtirpc-dev libtsan0 libubsan1
#10 23.66   libucx0 libx11-6 libx11-data libxau6 libxcb1 libxdmcp6 libxext6 libxml2
#10 23.66   libxnvctrl0 linux-libc-dev m4 media-types miniupnpc mpi-default-bin
#10 23.66   mpi-default-dev ocl-icd-libopencl1 openmpi-bin openmpi-common openssh-client
#10 23.66   perl perl-modules-5.34 python3 python3-dev python3-distutils python3-lib2to3
#10 23.66   python3-minimal python3.10 python3.10-dev python3.10-minimal readline-common
#10 23.66   rpcsvc-proto zlib1g-dev
#10 24.09 0 upgraded, 229 newly installed, 0 to remove and 0 not upgraded.
#10 24.09 Need to get 155 MB of archives.
#10 24.09 After this operation, 787 MB of additional disk space will be used.
#10 24.09 Get:1 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libpython3.10-minimal amd64 3.10.12-1~22.04.11 [815 kB]
#10 25.09 Get:2 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libexpat1 amd64 2.4.7-1ubuntu0.6 [92.1 kB]
#10 25.11 Get:3 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 python3.10-minimal amd64 3.10.12-1~22.04.11 [2264 kB]
#10 ...

#11 [build 2/6] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&         apt-get install -y --no-install-recommends             build-essential cmake git pkg-config             libboost-all-dev libssl-dev libpthread-stubs0-dev libc6-dev libminiupnpc-dev &&         rm -rf /var/lib/apt/lists/*
#11 24.21 Reading package lists...
#11 25.48 Building dependency tree...
#11 25.72 Reading state information...
#11 26.05 The following additional packages will be installed:
#11 26.05   autoconf automake autotools-dev binutils binutils-common
#11 26.05   binutils-x86-64-linux-gnu bzip2 cmake-data cpp cpp-11 dh-elpa-helper
#11 26.06   dpkg-dev emacsen-common g++ g++-11 gcc gcc-11 gcc-11-base gfortran-11
#11 26.06   git-man ibverbs-providers icu-devtools libarchive13 libasan6 libatomic1
#11 26.06   libbinutils libboost-atomic-dev libboost-atomic1.74-dev
#11 26.06   libboost-atomic1.74.0 libboost-chrono-dev libboost-chrono1.74-dev
#11 26.06   libboost-chrono1.74.0 libboost-container-dev libboost-container1.74-dev
#11 26.06   libboost-container1.74.0 libboost-context-dev libboost-context1.74-dev
#11 26.06   libboost-context1.74.0 libboost-coroutine-dev libboost-coroutine1.74-dev
#11 26.06   libboost-coroutine1.74.0 libboost-date-time-dev libboost-date-time1.74-dev
#11 26.06   libboost-date-time1.74.0 libboost-dev libboost-exception-dev
#11 26.06   libboost-exception1.74-dev libboost-fiber-dev libboost-fiber1.74-dev
#11 26.06   libboost-fiber1.74.0 libboost-filesystem-dev libboost-filesystem1.74-dev
#11 26.06   libboost-filesystem1.74.0 libboost-graph-dev libboost-graph-parallel-dev
#11 26.06   libboost-graph-parallel1.74-dev libboost-graph-parallel1.74.0
#11 26.06   libboost-graph1.74-dev libboost-graph1.74.0 libboost-iostreams-dev
#11 26.06   libboost-iostreams1.74-dev libboost-iostreams1.74.0 libboost-locale-dev
#11 26.06   libboost-locale1.74-dev libboost-locale1.74.0 libboost-log-dev
#11 26.06   libboost-log1.74-dev libboost-log1.74.0 libboost-math-dev
#11 26.06   libboost-math1.74-dev libboost-math1.74.0 libboost-mpi-dev
#11 26.06   libboost-mpi-python-dev libboost-mpi-python1.74-dev
#11 26.06   libboost-mpi-python1.74.0 libboost-mpi1.74-dev libboost-mpi1.74.0
#11 26.06   libboost-nowide-dev libboost-nowide1.74-dev libboost-nowide1.74.0
#11 26.06   libboost-numpy-dev libboost-numpy1.74-dev libboost-numpy1.74.0
#11 26.06   libboost-program-options-dev libboost-program-options1.74-dev
#11 26.06   libboost-program-options1.74.0 libboost-python-dev libboost-python1.74-dev
#11 26.06   libboost-python1.74.0 libboost-random-dev libboost-random1.74-dev
#11 26.06   libboost-random1.74.0 libboost-regex-dev libboost-regex1.74-dev
#11 26.06   libboost-regex1.74.0 libboost-serialization-dev
#11 26.06   libboost-serialization1.74-dev libboost-serialization1.74.0
#11 26.06   libboost-stacktrace-dev libboost-stacktrace1.74-dev
#11 26.06   libboost-stacktrace1.74.0 libboost-system-dev libboost-system1.74-dev
#11 26.06   libboost-system1.74.0 libboost-test-dev libboost-test1.74-dev
#11 26.06   libboost-test1.74.0 libboost-thread-dev libboost-thread1.74-dev
#11 26.06   libboost-thread1.74.0 libboost-timer-dev libboost-timer1.74-dev
#11 26.06   libboost-timer1.74.0 libboost-tools-dev libboost-type-erasure-dev
#11 26.06   libboost-type-erasure1.74-dev libboost-type-erasure1.74.0 libboost-wave-dev
#11 26.06   libboost-wave1.74-dev libboost-wave1.74.0 libboost1.74-dev
#11 26.06   libboost1.74-tools-dev libbrotli1 libbsd0 libc-dev-bin libcbor0.8 libcc1-0
#11 26.06   libcrypt-dev libctf-nobfd0 libctf0 libcurl3-gnutls libcurl4 libdpkg-perl
#11 26.06   libedit2 liberror-perl libevent-2.1-7 libevent-core-2.1-7 libevent-dev
#11 26.06   libevent-extra-2.1-7 libevent-openssl-2.1-7 libevent-pthreads-2.1-7
#11 26.06   libexpat1 libexpat1-dev libfabric1 libfido2-1 libgcc-11-dev libgdbm-compat4
#11 26.06   libgdbm6 libgfortran-11-dev libgfortran5 libglib2.0-0 libgomp1 libhwloc-dev
#11 26.06   libhwloc-plugins libhwloc15 libibverbs-dev libibverbs1 libicu-dev libicu70
#11 26.06   libisl23 libitm1 libjs-jquery libjs-jquery-ui libjs-sphinxdoc
#11 26.06   libjs-underscore libjsoncpp25 libldap-2.5-0 liblsan0 libltdl-dev libltdl7
#11 26.06   libmd0 libminiupnpc17 libmpc3 libmpdec3 libmpfr6 libnghttp2-14 libnl-3-200
#11 26.06   libnl-3-dev libnl-route-3-200 libnl-route-3-dev libnsl-dev libnuma-dev
#11 26.06   libnuma1 libopenmpi-dev libopenmpi3 libpciaccess0 libperl5.34 libpmix-dev
#11 26.06   libpmix2 libpsl5 libpsm-infinipath1 libpsm2-2 libpython3-dev
#11 26.06   libpython3-stdlib libpython3.10 libpython3.10-dev libpython3.10-minimal
#11 26.06   libpython3.10-stdlib libquadmath0 librdmacm1 libreadline8 librhash0 librtmp1
#11 26.06   libsasl2-2 libsasl2-modules-db libsigsegv2 libsqlite3-0 libssh-4
#11 26.06   libstdc++-11-dev libtirpc-dev libtsan0 libubsan1 libucx0 libuv1 libx11-6
#11 26.06   libx11-data libxau6 libxcb1 libxdmcp6 libxext6 libxml2 libxnvctrl0
#11 26.06   linux-libc-dev lto-disabled-list m4 make media-types mpi-default-bin
#11 26.06   mpi-default-dev ocl-icd-libopencl1 openmpi-bin openmpi-common openssh-client
#11 26.06   patch perl perl-modules-5.34 python3 python3-dev python3-distutils
#11 26.06   python3-lib2to3 python3-minimal python3.10 python3.10-dev python3.10-minimal
#11 26.06   readline-common rpcsvc-proto xz-utils zlib1g-dev
#11 26.06 Suggested packages:
#11 26.06   autoconf-archive gnu-standards autoconf-doc libtool gettext binutils-doc
#11 26.06   bzip2-doc cmake-doc ninja-build cmake-format cpp-doc gcc-11-locales
#11 26.06   debian-keyring g++-multilib g++-11-multilib gcc-11-doc gcc-multilib
#11 26.06   manpages-dev flex bison gdb gcc-doc gcc-11-multilib gfortran-11-multilib
#11 26.06   gfortran-11-doc libcoarrays-dev gettext-base git-daemon-run
#11 26.06   | git-daemon-sysvinit git-doc git-email git-gui gitk gitweb git-cvs
#11 26.06   git-mediawiki git-svn lrzip libboost-doc graphviz libboost1.74-doc gccxml
#11 26.06   libboost-contract1.74-dev libmpfrc++-dev libntl-dev xsltproc doxygen
#11 26.06   docbook-xml docbook-xsl default-jdk fop glibc-doc gnupg bzr gdbm-l10n
#11 26.06   libhwloc-contrib-plugins icu-doc libjs-jquery-ui-docs libtool-doc minissdpd
#11 26.06   openmpi-doc pciutils libssl-doc libstdc++-11-doc m4-doc make-doc opencl-icd
#11 26.06   gfortran | fortran-compiler keychain libpam-ssh monkeysphere ssh-askpass ed
#11 26.06   diffutils-doc perl-doc libterm-readline-gnu-perl
#11 26.06   | libterm-readline-perl-perl libtap-harness-archive-perl python3-doc
#11 26.06   python3-tk python3-venv python3.10-venv python3.10-doc binfmt-support
#11 26.06   readline-doc
#11 26.06 Recommended packages:
#11 26.06   fakeroot gnupg libalgorithm-merge-perl ca-certificates less manpages
#11 26.06   manpages-dev libc-devtools libfile-fcntllock-perl liblocale-gettext-perl
#11 26.06   libglib2.0-data shared-mime-info xdg-user-dirs javascript-common
#11 26.06   libldap-common libtool libcoarrays-openmpi-dev publicsuffix libsasl2-modules
#11 26.06   xauth netbase
#11 26.77 The following NEW packages will be installed:
#11 26.77   autoconf automake autotools-dev binutils binutils-common
#11 26.77   binutils-x86-64-linux-gnu build-essential bzip2 cmake cmake-data cpp cpp-11
#11 26.77   dh-elpa-helper dpkg-dev emacsen-common g++ g++-11 gcc gcc-11 gcc-11-base
#11 26.77   gfortran-11 git git-man ibverbs-providers icu-devtools libarchive13 libasan6
#11 26.77   libatomic1 libbinutils libboost-all-dev libboost-atomic-dev
#11 26.77   libboost-atomic1.74-dev libboost-atomic1.74.0 libboost-chrono-dev
#11 26.77   libboost-chrono1.74-dev libboost-chrono1.74.0 libboost-container-dev
#11 26.77   libboost-container1.74-dev libboost-container1.74.0 libboost-context-dev
#11 26.77   libboost-context1.74-dev libboost-context1.74.0 libboost-coroutine-dev
#11 26.77   libboost-coroutine1.74-dev libboost-coroutine1.74.0 libboost-date-time-dev
#11 26.77   libboost-date-time1.74-dev libboost-date-time1.74.0 libboost-dev
#11 26.77   libboost-exception-dev libboost-exception1.74-dev libboost-fiber-dev
#11 26.77   libboost-fiber1.74-dev libboost-fiber1.74.0 libboost-filesystem-dev
#11 26.77   libboost-filesystem1.74-dev libboost-filesystem1.74.0 libboost-graph-dev
#11 26.77   libboost-graph-parallel-dev libboost-graph-parallel1.74-dev
#11 26.77   libboost-graph-parallel1.74.0 libboost-graph1.74-dev libboost-graph1.74.0
#11 26.77   libboost-iostreams-dev libboost-iostreams1.74-dev libboost-iostreams1.74.0
#11 26.77   libboost-locale-dev libboost-locale1.74-dev libboost-locale1.74.0
#11 26.77   libboost-log-dev libboost-log1.74-dev libboost-log1.74.0 libboost-math-dev
#11 26.77   libboost-math1.74-dev libboost-math1.74.0 libboost-mpi-dev
#11 26.77   libboost-mpi-python-dev libboost-mpi-python1.74-dev
#11 26.77   libboost-mpi-python1.74.0 libboost-mpi1.74-dev libboost-mpi1.74.0
#11 26.77   libboost-nowide-dev libboost-nowide1.74-dev libboost-nowide1.74.0
#11 26.77   libboost-numpy-dev libboost-numpy1.74-dev libboost-numpy1.74.0
#11 26.77   libboost-program-options-dev libboost-program-options1.74-dev
#11 26.77   libboost-program-options1.74.0 libboost-python-dev libboost-python1.74-dev
#11 26.77   libboost-python1.74.0 libboost-random-dev libboost-random1.74-dev
#11 26.77   libboost-random1.74.0 libboost-regex-dev libboost-regex1.74-dev
#11 26.77   libboost-regex1.74.0 libboost-serialization-dev
#11 26.77   libboost-serialization1.74-dev libboost-serialization1.74.0
#11 26.77   libboost-stacktrace-dev libboost-stacktrace1.74-dev
#11 26.77   libboost-stacktrace1.74.0 libboost-system-dev libboost-system1.74-dev
#11 26.77   libboost-system1.74.0 libboost-test-dev libboost-test1.74-dev
#11 26.77   libboost-test1.74.0 libboost-thread-dev libboost-thread1.74-dev
#11 26.77   libboost-thread1.74.0 libboost-timer-dev libboost-timer1.74-dev
#11 26.77   libboost-timer1.74.0 libboost-tools-dev libboost-type-erasure-dev
#11 26.77   libboost-type-erasure1.74-dev libboost-type-erasure1.74.0 libboost-wave-dev
#11 26.77   libboost-wave1.74-dev libboost-wave1.74.0 libboost1.74-dev
#11 26.78   libboost1.74-tools-dev libbrotli1 libbsd0 libc-dev-bin libc6-dev libcbor0.8
#11 26.78   libcc1-0 libcrypt-dev libctf-nobfd0 libctf0 libcurl3-gnutls libcurl4
#11 26.78   libdpkg-perl libedit2 liberror-perl libevent-2.1-7 libevent-core-2.1-7
#11 26.78   libevent-dev libevent-extra-2.1-7 libevent-openssl-2.1-7
#11 26.78   libevent-pthreads-2.1-7 libexpat1 libexpat1-dev libfabric1 libfido2-1
#11 26.78   libgcc-11-dev libgdbm-compat4 libgdbm6 libgfortran-11-dev libgfortran5
#11 26.78   libglib2.0-0 libgomp1 libhwloc-dev libhwloc-plugins libhwloc15
#11 26.78   libibverbs-dev libibverbs1 libicu-dev libicu70 libisl23 libitm1 libjs-jquery
#11 26.78   libjs-jquery-ui libjs-sphinxdoc libjs-underscore libjsoncpp25 libldap-2.5-0
#11 26.78   liblsan0 libltdl-dev libltdl7 libmd0 libminiupnpc-dev libminiupnpc17 libmpc3
#11 26.78   libmpdec3 libmpfr6 libnghttp2-14 libnl-3-200 libnl-3-dev libnl-route-3-200
#11 26.78   libnl-route-3-dev libnsl-dev libnuma-dev libnuma1 libopenmpi-dev libopenmpi3
#11 26.78   libpciaccess0 libperl5.34 libpmix-dev libpmix2 libpsl5 libpsm-infinipath1
#11 26.78   libpsm2-2 libpthread-stubs0-dev libpython3-dev libpython3-stdlib
#11 26.78   libpython3.10 libpython3.10-dev libpython3.10-minimal libpython3.10-stdlib
#11 26.78   libquadmath0 librdmacm1 libreadline8 librhash0 librtmp1 libsasl2-2
#11 26.78   libsasl2-modules-db libsigsegv2 libsqlite3-0 libssh-4 libssl-dev
#11 26.78   libstdc++-11-dev libtirpc-dev libtsan0 libubsan1 libucx0 libuv1 libx11-6
#11 26.78   libx11-data libxau6 libxcb1 libxdmcp6 libxext6 libxml2 libxnvctrl0
#11 26.78   linux-libc-dev lto-disabled-list m4 make media-types mpi-default-bin
#11 26.78   mpi-default-dev ocl-icd-libopencl1 openmpi-bin openmpi-common openssh-client
#11 26.78   patch perl perl-modules-5.34 pkg-config python3 python3-dev
#11 26.78   python3-distutils python3-lib2to3 python3-minimal python3.10 python3.10-dev
#11 26.78   python3.10-minimal readline-common rpcsvc-proto xz-utils zlib1g-dev
#11 27.86 0 upgraded, 257 newly installed, 0 to remove and 0 not upgraded.
#11 27.86 Need to get 184 MB of archives.
#11 27.86 After this operation, 895 MB of additional disk space will be used.
#11 27.86 Get:1 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libpython3.10-minimal amd64 3.10.12-1~22.04.11 [815 kB]
#11 31.65 Get:2 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libexpat1 amd64 2.4.7-1ubuntu0.6 [92.1 kB]
#11 32.16 Get:3 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 python3.10-minimal amd64 3.10.12-1~22.04.11 [2264 kB]
#11 ...

#10 [stage-1 2/4] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&             apt-get install -y --no-install-recommends                 libboost-all-dev libc6 procps miniupnpc &&         rm -rf /var/lib/apt/lists/*
#10 25.86 Get:4 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 python3-minimal amd64 3.10.6-1~22.04.1 [24.3 kB]
#10 25.86 Get:5 http://archive.ubuntu.com/ubuntu jammy/main amd64 media-types all 7.0.0 [25.5 kB]
#10 25.87 Get:6 http://archive.ubuntu.com/ubuntu jammy/main amd64 libmpdec3 amd64 2.5.1-2build2 [86.8 kB]
#10 25.87 Get:7 http://archive.ubuntu.com/ubuntu jammy/main amd64 readline-common all 8.1.2-1 [53.5 kB]
#10 25.88 Get:8 http://archive.ubuntu.com/ubuntu jammy/main amd64 libreadline8 amd64 8.1.2-1 [153 kB]
#10 25.90 Get:9 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libsqlite3-0 amd64 3.37.2-2ubuntu0.5 [643 kB]
#10 26.03 Get:10 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libpython3.10-stdlib amd64 3.10.12-1~22.04.11 [1850 kB]
#10 26.36 Get:11 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 python3.10 amd64 3.10.12-1~22.04.11 [508 kB]
#10 26.83 Get:12 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libpython3-stdlib amd64 3.10.6-1~22.04.1 [6812 B]
#10 26.83 Get:13 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 python3 amd64 3.10.6-1~22.04.1 [22.8 kB]
#10 26.83 Get:14 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 perl-modules-5.34 all 5.34.0-3ubuntu1.5 [2977 kB]
#10 28.08 Get:15 http://archive.ubuntu.com/ubuntu jammy/main amd64 libgdbm6 amd64 1.23-1 [33.9 kB]
#10 28.08 Get:16 http://archive.ubuntu.com/ubuntu jammy/main amd64 libgdbm-compat4 amd64 1.23-1 [6606 B]
#10 28.08 Get:17 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libperl5.34 amd64 5.34.0-3ubuntu1.5 [4797 kB]
#10 28.97 Get:18 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 perl amd64 5.34.0-3ubuntu1.5 [232 kB]
#10 28.98 Get:19 http://archive.ubuntu.com/ubuntu jammy/main amd64 libmd0 amd64 1.0.4-1build1 [23.0 kB]
#10 28.98 Get:20 http://archive.ubuntu.com/ubuntu jammy/main amd64 libbsd0 amd64 0.11.5-1 [44.8 kB]
#10 28.98 Get:21 http://archive.ubuntu.com/ubuntu jammy/main amd64 libicu70 amd64 70.1-2 [10.6 MB]
#10 32.19 Get:22 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libxml2 amd64 2.9.13+dfsg-1ubuntu0.9 [764 kB]
#10 32.30 Get:23 http://archive.ubuntu.com/ubuntu jammy/main amd64 libcbor0.8 amd64 0.8.0-2ubuntu1 [24.6 kB]
#10 32.31 Get:24 http://archive.ubuntu.com/ubuntu jammy/main amd64 libedit2 amd64 3.1-20210910-1build1 [96.8 kB]
#10 32.31 Get:25 http://archive.ubuntu.com/ubuntu jammy/main amd64 libfido2-1 amd64 1.10.0-1 [82.8 kB]
#10 32.32 Get:26 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libnghttp2-14 amd64 1.43.0-1ubuntu0.2 [76.9 kB]
#10 32.35 Get:27 http://archive.ubuntu.com/ubuntu jammy/main amd64 libnuma1 amd64 2.0.14-3ubuntu2 [22.5 kB]
#10 32.35 Get:28 http://archive.ubuntu.com/ubuntu jammy/main amd64 libpsl5 amd64 0.21.0-1.2build2 [58.4 kB]
#10 32.36 Get:29 http://archive.ubuntu.com/ubuntu jammy/main amd64 libxau6 amd64 1:1.0.9-1build5 [7634 B]
#10 32.36 Get:30 http://archive.ubuntu.com/ubuntu jammy/main amd64 libxdmcp6 amd64 1:1.1.3-0ubuntu5 [10.9 kB]
#10 32.36 Get:31 http://archive.ubuntu.com/ubuntu jammy/main amd64 libxcb1 amd64 1.14-3ubuntu3 [49.0 kB]
#10 32.63 Get:32 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libx11-data all 2:1.7.5-1ubuntu0.3 [120 kB]
#10 32.64 Get:33 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libx11-6 amd64 2:1.7.5-1ubuntu0.3 [667 kB]
#10 32.65 Get:34 http://archive.ubuntu.com/ubuntu jammy/main amd64 libxext6 amd64 2:1.3.4-1build1 [31.8 kB]
#10 32.65 Get:35 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 openssh-client amd64 1:8.9p1-3ubuntu0.13 [903 kB]
#10 32.88 Get:36 http://archive.ubuntu.com/ubuntu jammy/main amd64 libsigsegv2 amd64 2.13-1ubuntu3 [14.6 kB]
#10 32.89 Get:37 http://archive.ubuntu.com/ubuntu jammy/main amd64 m4 amd64 1.4.18-5ubuntu2 [199 kB]
#10 32.93 Get:38 http://archive.ubuntu.com/ubuntu jammy/main amd64 autoconf all 2.71-2 [338 kB]
#10 33.41 Get:39 http://archive.ubuntu.com/ubuntu jammy/main amd64 autotools-dev all 20220109.1 [44.9 kB]
#10 33.41 Get:40 http://archive.ubuntu.com/ubuntu jammy/main amd64 automake all 1:1.16.5-1.3 [558 kB]
#10 33.43 Get:41 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 binutils-common amd64 2.38-4ubuntu2.8 [223 kB]
#10 33.43 Get:42 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libbinutils amd64 2.38-4ubuntu2.8 [661 kB]
#10 33.84 Get:43 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libctf-nobfd0 amd64 2.38-4ubuntu2.8 [108 kB]
#10 33.85 Get:44 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libctf0 amd64 2.38-4ubuntu2.8 [103 kB]
#10 33.85 Get:45 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 binutils-x86-64-linux-gnu amd64 2.38-4ubuntu2.8 [2324 kB]
#10 34.33 Get:46 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 binutils amd64 2.38-4ubuntu2.8 [3196 B]
#10 34.33 Get:47 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 gcc-11-base amd64 11.4.0-1ubuntu1~22.04.2 [20.8 kB]
#10 34.33 Get:48 http://archive.ubuntu.com/ubuntu jammy/main amd64 libisl23 amd64 0.24-2build1 [727 kB]
#10 34.67 Get:49 http://archive.ubuntu.com/ubuntu jammy/main amd64 libmpfr6 amd64 4.1.0-3build3 [1425 kB]
#10 36.05 Get:50 http://archive.ubuntu.com/ubuntu jammy/main amd64 libmpc3 amd64 1.2.1-2build1 [46.9 kB]
#10 36.05 Get:51 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 cpp-11 amd64 11.4.0-1ubuntu1~22.04.2 [10.0 MB]
#10 38.21 Get:52 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libcc1-0 amd64 12.3.0-1ubuntu1~22.04.2 [48.3 kB]
#10 38.22 Get:53 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libgomp1 amd64 12.3.0-1ubuntu1~22.04.2 [127 kB]
#10 38.22 Get:54 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libitm1 amd64 12.3.0-1ubuntu1~22.04.2 [30.2 kB]
#10 38.22 Get:55 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libatomic1 amd64 12.3.0-1ubuntu1~22.04.2 [10.4 kB]
#10 38.22 Get:56 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libasan6 amd64 11.4.0-1ubuntu1~22.04.2 [2283 kB]
#10 38.83 Get:57 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 liblsan0 amd64 12.3.0-1ubuntu1~22.04.2 [1069 kB]
#10 38.87 Get:58 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libtsan0 amd64 11.4.0-1ubuntu1~22.04.2 [2262 kB]
#10 ...

#11 [build 2/6] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&         apt-get install -y --no-install-recommends             build-essential cmake git pkg-config             libboost-all-dev libssl-dev libpthread-stubs0-dev libc6-dev libminiupnpc-dev &&         rm -rf /var/lib/apt/lists/*
#11 38.83 Get:4 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 python3-minimal amd64 3.10.6-1~22.04.1 [24.3 kB]
#11 38.85 Get:5 http://archive.ubuntu.com/ubuntu jammy/main amd64 media-types all 7.0.0 [25.5 kB]
#11 38.88 Get:6 http://archive.ubuntu.com/ubuntu jammy/main amd64 libmpdec3 amd64 2.5.1-2build2 [86.8 kB]
#11 39.12 Get:7 http://archive.ubuntu.com/ubuntu jammy/main amd64 readline-common all 8.1.2-1 [53.5 kB]
#11 39.20 Get:8 http://archive.ubuntu.com/ubuntu jammy/main amd64 libreadline8 amd64 8.1.2-1 [153 kB]
#11 39.93 Get:9 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libsqlite3-0 amd64 3.37.2-2ubuntu0.5 [643 kB]
#11 41.36 Get:10 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libpython3.10-stdlib amd64 3.10.12-1~22.04.11 [1850 kB]
#11 ...

#10 [stage-1 2/4] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&             apt-get install -y --no-install-recommends                 libboost-all-dev libc6 procps miniupnpc &&         rm -rf /var/lib/apt/lists/*
#10 39.54 Get:59 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libubsan1 amd64 12.3.0-1ubuntu1~22.04.2 [976 kB]
#10 39.57 Get:60 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libquadmath0 amd64 12.3.0-1ubuntu1~22.04.2 [154 kB]
#10 39.57 Get:61 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libgcc-11-dev amd64 11.4.0-1ubuntu1~22.04.2 [2517 kB]
#10 40.91 Get:62 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 gcc-11 amd64 11.4.0-1ubuntu1~22.04.2 [20.1 MB]
#10 45.48 Get:63 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libgfortran5 amd64 12.3.0-1ubuntu1~22.04.2 [879 kB]
#10 45.87 Get:64 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libgfortran-11-dev amd64 11.4.0-1ubuntu1~22.04.2 [842 kB]
#10 45.89 Get:65 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libc-dev-bin amd64 2.35-0ubuntu3.10 [20.3 kB]
#10 45.89 Get:66 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 linux-libc-dev amd64 5.15.0-153.163 [1324 kB]
#10 46.33 Get:67 http://archive.ubuntu.com/ubuntu jammy/main amd64 libcrypt-dev amd64 1:4.4.27-1 [112 kB]
#10 46.33 Get:68 http://archive.ubuntu.com/ubuntu jammy/main amd64 rpcsvc-proto amd64 1.4.2-0ubuntu6 [68.5 kB]
#10 46.64 Get:69 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libtirpc-dev amd64 1.3.2-2ubuntu0.1 [192 kB]
#10 46.65 Get:70 http://archive.ubuntu.com/ubuntu jammy/main amd64 libnsl-dev amd64 1.3.0-2build2 [71.3 kB]
#10 46.65 Get:71 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libc6-dev amd64 2.35-0ubuntu3.10 [2100 kB]
#10 46.97 Get:72 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 gfortran-11 amd64 11.4.0-1ubuntu1~22.04.2 [11.2 MB]
#10 ...

#11 [build 2/6] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&         apt-get install -y --no-install-recommends             build-essential cmake git pkg-config             libboost-all-dev libssl-dev libpthread-stubs0-dev libc6-dev libminiupnpc-dev &&         rm -rf /var/lib/apt/lists/*
#11 47.06 Get:11 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 python3.10 amd64 3.10.12-1~22.04.11 [508 kB]
#11 48.26 Get:12 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libpython3-stdlib amd64 3.10.6-1~22.04.1 [6812 B]
#11 48.27 Get:13 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 python3 amd64 3.10.6-1~22.04.1 [22.8 kB]
#11 48.65 Get:14 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 perl-modules-5.34 all 5.34.0-3ubuntu1.5 [2977 kB]
#11 ...

#10 [stage-1 2/4] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&             apt-get install -y --no-install-recommends                 libboost-all-dev libc6 procps miniupnpc &&         rm -rf /var/lib/apt/lists/*
#10 49.45 Get:73 http://archive.ubuntu.com/ubuntu jammy/main amd64 libnl-3-200 amd64 3.5.0-0.1 [59.1 kB]
#10 49.45 Get:74 http://archive.ubuntu.com/ubuntu jammy/main amd64 libnl-route-3-200 amd64 3.5.0-0.1 [180 kB]
#10 49.45 Get:75 http://archive.ubuntu.com/ubuntu jammy/main amd64 libibverbs1 amd64 39.0-1 [69.3 kB]
#10 49.45 Get:76 http://archive.ubuntu.com/ubuntu jammy/main amd64 ibverbs-providers amd64 39.0-1 [341 kB]
#10 49.67 Get:77 http://archive.ubuntu.com/ubuntu jammy/main amd64 icu-devtools amd64 70.1-2 [197 kB]
#10 49.68 Get:78 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libstdc++-11-dev amd64 11.4.0-1ubuntu1~22.04.2 [2101 kB]
#10 49.88 Get:79 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost1.74-dev amd64 1.74.0-14ubuntu3 [9609 kB]
#10 52.94 Get:80 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-dev amd64 1.74.0.3ubuntu7 [3490 B]
#10 52.94 Get:81 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost1.74-tools-dev amd64 1.74.0-14ubuntu3 [1351 kB]
#10 52.97 Get:82 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-tools-dev amd64 1.74.0.3ubuntu7 [3428 B]
#10 52.97 Get:83 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-atomic1.74.0 amd64 1.74.0-14ubuntu3 [224 kB]
#10 53.14 Get:84 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-atomic1.74-dev amd64 1.74.0-14ubuntu3 [221 kB]
#10 53.14 Get:85 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-atomic-dev amd64 1.74.0.3ubuntu7 [3544 B]
#10 53.14 Get:86 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-chrono1.74.0 amd64 1.74.0-14ubuntu3 [232 kB]
#10 53.15 Get:87 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-chrono1.74-dev amd64 1.74.0-14ubuntu3 [239 kB]
#10 53.15 Get:88 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-chrono-dev amd64 1.74.0.3ubuntu7 [3854 B]
#10 53.15 Get:89 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-container1.74.0 amd64 1.74.0-14ubuntu3 [246 kB]
#10 53.18 Get:90 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-container1.74-dev amd64 1.74.0-14ubuntu3 [254 kB]
#10 53.21 Get:91 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-container-dev amd64 1.74.0.3ubuntu7 [3712 B]
#10 53.22 Get:92 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-date-time1.74.0 amd64 1.74.0-14ubuntu3 [221 kB]
#10 53.27 Get:93 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-serialization1.74.0 amd64 1.74.0-14ubuntu3 [327 kB]
#10 53.34 Get:94 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-serialization1.74-dev amd64 1.74.0-14ubuntu3 [375 kB]
#10 53.75 Get:95 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-date-time1.74-dev amd64 1.74.0-14ubuntu3 [226 kB]
#10 53.76 Get:96 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-system1.74.0 amd64 1.74.0-14ubuntu3 [221 kB]
#10 53.76 Get:97 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-system1.74-dev amd64 1.74.0-14ubuntu3 [218 kB]
#10 53.77 Get:98 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-thread1.74.0 amd64 1.74.0-14ubuntu3 [262 kB]
#10 53.77 Get:99 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-thread1.74-dev amd64 1.74.0-14ubuntu3 [272 kB]
#10 53.78 Get:100 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-context1.74.0 amd64 1.74.0-14ubuntu3 [223 kB]
#10 53.79 Get:101 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-context1.74-dev amd64 1.74.0-14ubuntu3 [220 kB]
#10 54.32 Get:102 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-context-dev amd64 1.74.0.3ubuntu7 [3456 B]
#10 54.46 Get:103 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-coroutine1.74.0 amd64 1.74.0-14ubuntu3 [235 kB]
#10 55.38 Get:104 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-coroutine1.74-dev amd64 1.74.0-14ubuntu3 [244 kB]
#10 55.44 Get:105 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-coroutine-dev amd64 1.74.0.3ubuntu7 [3520 B]
#10 55.45 Get:106 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-date-time-dev amd64 1.74.0.3ubuntu7 [3248 B]
#10 55.45 Get:107 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-exception1.74-dev amd64 1.74.0-14ubuntu3 [217 kB]
#10 55.58 Get:108 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-exception-dev amd64 1.74.0.3ubuntu7 [3250 B]
#10 55.58 Get:109 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-filesystem1.74.0 amd64 1.74.0-14ubuntu3 [264 kB]
#10 55.67 Get:110 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-filesystem1.74-dev amd64 1.74.0-14ubuntu3 [287 kB]
#10 55.85 Get:111 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-fiber1.74.0 amd64 1.74.0-14ubuntu3 [242 kB]
#10 55.89 Get:112 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-fiber1.74-dev amd64 1.74.0-14ubuntu3 [254 kB]
#10 55.92 Get:113 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-fiber-dev amd64 1.74.0.3ubuntu7 [3674 B]
#10 55.92 Get:114 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-filesystem-dev amd64 1.74.0.3ubuntu7 [3280 B]
#10 55.92 Get:115 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-regex1.74.0 amd64 1.74.0-14ubuntu3 [511 kB]
#10 56.15 Get:116 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-graph1.74.0 amd64 1.74.0-14ubuntu3 [304 kB]
#10 56.20 Get:117 http://archive.ubuntu.com/ubuntu jammy/main amd64 libicu-dev amd64 70.1-2 [11.6 MB]
#10 60.70 Get:118 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-regex1.74-dev amd64 1.74.0-14ubuntu3 [596 kB]
#10 60.71 Get:119 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-test1.74.0 amd64 1.74.0-14ubuntu3 [446 kB]
#10 60.73 Get:120 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-test1.74-dev amd64 1.74.0-14ubuntu3 [564 kB]
#10 60.74 Get:121 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-graph1.74-dev amd64 1.74.0-14ubuntu3 [335 kB]
#10 60.76 Get:122 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-graph-dev amd64 1.74.0.3ubuntu7 [3348 B]
#10 60.76 Get:123 http://archive.ubuntu.com/ubuntu jammy/main amd64 libevent-core-2.1-7 amd64 2.1.12-stable-1build3 [93.9 kB]
#10 60.76 Get:124 http://archive.ubuntu.com/ubuntu jammy/main amd64 libevent-pthreads-2.1-7 amd64 2.1.12-stable-1build3 [7642 B]
#10 60.76 Get:125 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libpsm-infinipath1 amd64 3.3+20.604758e7-6.1 [170 kB]
#10 60.82 Get:126 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libpsm2-2 amd64 11.2.185-1 [182 kB]
#10 60.84 Get:127 http://archive.ubuntu.com/ubuntu jammy/main amd64 librdmacm1 amd64 39.0-1 [71.2 kB]
#10 61.24 Get:128 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libfabric1 amd64 1.11.0-3 [558 kB]
#10 61.26 Get:129 http://archive.ubuntu.com/ubuntu jammy-updates/universe amd64 libhwloc15 amd64 2.7.0-2ubuntu1 [159 kB]
#10 61.27 Get:130 http://archive.ubuntu.com/ubuntu jammy/main amd64 libbrotli1 amd64 1.0.9-2build6 [315 kB]
#10 61.28 Get:131 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libsasl2-modules-db amd64 2.1.27+dfsg2-3ubuntu1.2 [20.5 kB]
#10 61.28 Get:132 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libsasl2-2 amd64 2.1.27+dfsg2-3ubuntu1.2 [53.8 kB]
#10 61.28 Get:133 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libldap-2.5-0 amd64 2.5.19+dfsg-0ubuntu0.22.04.1 [184 kB]
#10 61.51 Get:134 http://archive.ubuntu.com/ubuntu jammy/main amd64 librtmp1 amd64 2.4+20151223.gitfa8646d.1-2build4 [58.2 kB]
#10 61.52 Get:135 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libssh-4 amd64 0.9.6-2ubuntu0.22.04.4 [187 kB]
#10 61.52 Get:136 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libcurl3-gnutls amd64 7.81.0-1ubuntu1.20 [284 kB]
#10 61.53 Get:137 http://archive.ubuntu.com/ubuntu jammy/main amd64 libpciaccess0 amd64 0.16-3 [19.1 kB]
#10 61.53 Get:138 http://archive.ubuntu.com/ubuntu jammy/main amd64 libxnvctrl0 amd64 510.47.03-0ubuntu1 [11.5 kB]
#10 61.53 Get:139 http://archive.ubuntu.com/ubuntu jammy/universe amd64 ocl-icd-libopencl1 amd64 2.2.14-3 [39.1 kB]
#10 61.53 Get:140 http://archive.ubuntu.com/ubuntu jammy-updates/universe amd64 libhwloc-plugins amd64 2.7.0-2ubuntu1 [15.6 kB]
#10 61.53 Get:141 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libpmix2 amd64 4.1.2-2ubuntu1 [604 kB]
#10 61.65 Get:142 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libucx0 amd64 1.12.1~rc2-1 [891 kB]
#10 61.91 Get:143 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libopenmpi3 amd64 4.1.2-2ubuntu1 [2594 kB]
#10 62.64 Get:144 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-mpi1.74.0 amd64 1.74.0-14ubuntu3 [259 kB]
#10 62.64 Get:145 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-graph-parallel1.74.0 amd64 1.74.0-14ubuntu3 [266 kB]
#10 62.65 Get:146 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-graph-parallel1.74-dev amd64 1.74.0-14ubuntu3 [277 kB]
#10 62.66 Get:147 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-graph-parallel-dev amd64 1.74.0.3ubuntu7 [3384 B]
#10 62.66 Get:148 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-iostreams1.74.0 amd64 1.74.0-14ubuntu3 [245 kB]
#10 62.94 Get:149 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-iostreams1.74-dev amd64 1.74.0-14ubuntu3 [252 kB]
#10 62.95 Get:150 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-iostreams-dev amd64 1.74.0.3ubuntu7 [3238 B]
#10 62.95 Get:151 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-locale1.74.0 amd64 1.74.0-14ubuntu3 [413 kB]
#10 62.95 Get:152 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-locale1.74-dev amd64 1.74.0-14ubuntu3 [594 kB]
#10 63.40 Get:153 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-locale-dev amd64 1.74.0.3ubuntu7 [3572 B]
#10 63.40 Get:154 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-log1.74.0 amd64 1.74.0-14ubuntu3 [592 kB]
#10 63.42 Get:155 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-log1.74-dev amd64 1.74.0-14ubuntu3 [853 kB]
#10 63.77 Get:156 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-log-dev amd64 1.74.0.3ubuntu7 [3446 B]
#10 63.77 Get:157 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-math1.74.0 amd64 1.74.0-14ubuntu3 [423 kB]
#10 64.43 Get:158 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-math1.74-dev amd64 1.74.0-14ubuntu3 [620 kB]
#10 64.44 Get:159 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-math-dev amd64 1.74.0.3ubuntu7 [3454 B]
#10 64.44 Get:160 http://archive.ubuntu.com/ubuntu jammy/universe amd64 openmpi-common all 4.1.2-2ubuntu1 [162 kB]
#10 64.75 Get:161 http://archive.ubuntu.com/ubuntu jammy/main amd64 libnl-3-dev amd64 3.5.0-0.1 [101 kB]
#10 64.76 Get:162 http://archive.ubuntu.com/ubuntu jammy/main amd64 libnl-route-3-dev amd64 3.5.0-0.1 [202 kB]
#10 64.76 Get:163 http://archive.ubuntu.com/ubuntu jammy/main amd64 libibverbs-dev amd64 39.0-1 [628 kB]
#10 64.99 Get:164 http://archive.ubuntu.com/ubuntu jammy/main amd64 libnuma-dev amd64 2.0.14-3ubuntu2 [35.9 kB]
#10 65.00 Get:165 http://archive.ubuntu.com/ubuntu jammy/main amd64 libltdl7 amd64 2.4.6-15build2 [39.6 kB]
#10 65.00 Get:166 http://archive.ubuntu.com/ubuntu jammy/main amd64 libltdl-dev amd64 2.4.6-15build2 [169 kB]
#10 65.03 Get:167 http://archive.ubuntu.com/ubuntu jammy-updates/universe amd64 libhwloc-dev amd64 2.7.0-2ubuntu1 [256 kB]
#10 65.04 Get:168 http://archive.ubuntu.com/ubuntu jammy/main amd64 libevent-2.1-7 amd64 2.1.12-stable-1build3 [148 kB]
#10 65.04 Get:169 http://archive.ubuntu.com/ubuntu jammy/main amd64 libevent-extra-2.1-7 amd64 2.1.12-stable-1build3 [65.4 kB]
#10 65.16 Get:170 http://archive.ubuntu.com/ubuntu jammy/main amd64 libevent-openssl-2.1-7 amd64 2.1.12-stable-1build3 [15.8 kB]
#10 65.42 Get:171 http://archive.ubuntu.com/ubuntu jammy/main amd64 libevent-dev amd64 2.1.12-stable-1build3 [278 kB]
#10 ...

#11 [build 2/6] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&         apt-get install -y --no-install-recommends             build-essential cmake git pkg-config             libboost-all-dev libssl-dev libpthread-stubs0-dev libc6-dev libminiupnpc-dev &&         rm -rf /var/lib/apt/lists/*
#11 55.42 Get:15 http://archive.ubuntu.com/ubuntu jammy/main amd64 libgdbm6 amd64 1.23-1 [33.9 kB]
#11 55.42 Get:16 http://archive.ubuntu.com/ubuntu jammy/main amd64 libgdbm-compat4 amd64 1.23-1 [6606 B]
#11 55.42 Get:17 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libperl5.34 amd64 5.34.0-3ubuntu1.5 [4797 kB]
#11 65.22 Get:18 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 perl amd64 5.34.0-3ubuntu1.5 [232 kB]
#11 65.54 Get:19 http://archive.ubuntu.com/ubuntu jammy/main amd64 libmd0 amd64 1.0.4-1build1 [23.0 kB]
#11 ...

#10 [stage-1 2/4] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&             apt-get install -y --no-install-recommends                 libboost-all-dev libc6 procps miniupnpc &&         rm -rf /var/lib/apt/lists/*
#10 65.52 Get:172 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 zlib1g-dev amd64 1:1.2.11.dfsg-2ubuntu9.2 [164 kB]
#10 65.56 Get:173 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libpmix-dev amd64 4.1.2-2ubuntu1 [805 kB]
#10 65.83 Get:174 http://archive.ubuntu.com/ubuntu jammy/main amd64 libjs-jquery all 3.6.0+dfsg+~3.5.13-1 [321 kB]
#10 65.94 Get:175 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libjs-jquery-ui all 1.13.1+dfsg-1 [253 kB]
#10 66.42 Get:176 http://archive.ubuntu.com/ubuntu jammy/universe amd64 openmpi-bin amd64 4.1.2-2ubuntu1 [116 kB]
#10 66.43 Get:177 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libopenmpi-dev amd64 4.1.2-2ubuntu1 [867 kB]
#10 66.47 Get:178 http://archive.ubuntu.com/ubuntu jammy/universe amd64 mpi-default-dev amd64 1.14 [3698 B]
#10 66.47 Get:179 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-mpi1.74-dev amd64 1.74.0-14ubuntu3 [285 kB]
#10 66.53 Get:180 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-mpi-dev amd64 1.74.0.3ubuntu7 [3328 B]
#10 66.53 Get:181 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-python1.74.0 amd64 1.74.0-14ubuntu3 [299 kB]
#10 66.61 Get:182 http://archive.ubuntu.com/ubuntu jammy/universe amd64 mpi-default-bin amd64 1.14 [2898 B]
#10 66.61 Get:183 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-mpi-python1.74.0 amd64 1.74.0-14ubuntu3 [351 kB]
#10 66.62 Get:184 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-mpi-python1.74-dev amd64 1.74.0-14ubuntu3 [225 kB]
#10 66.62 Get:185 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-mpi-python-dev amd64 1.74.0.3ubuntu7 [3382 B]
#10 66.62 Get:186 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-numpy1.74.0 amd64 1.74.0-14ubuntu3 [229 kB]
#10 66.64 Get:187 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-numpy1.74-dev amd64 1.74.0-14ubuntu3 [233 kB]
#10 66.68 Get:188 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-numpy-dev amd64 1.74.0.3ubuntu7 [3286 B]
#10 66.68 Get:189 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-program-options1.74.0 amd64 1.74.0-14ubuntu3 [311 kB]
#10 66.75 Get:190 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-program-options1.74-dev amd64 1.74.0-14ubuntu3 [380 kB]
#10 67.29 Get:191 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-program-options-dev amd64 1.74.0.3ubuntu7 [3266 B]
#10 67.29 Get:192 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libpython3.10 amd64 3.10.12-1~22.04.11 [1949 kB]
#10 67.87 Get:193 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libexpat1-dev amd64 2.4.7-1ubuntu0.6 [148 kB]
#10 67.87 Get:194 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libpython3.10-dev amd64 3.10.12-1~22.04.11 [4764 kB]
#10 69.54 Get:195 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libpython3-dev amd64 3.10.6-1~22.04.1 [7064 B]
#10 69.54 Get:196 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 python3.10-dev amd64 3.10.12-1~22.04.11 [508 kB]
#10 69.56 Get:197 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 python3-lib2to3 all 3.10.8-1~22.04 [77.6 kB]
#10 69.79 Get:198 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 python3-distutils all 3.10.8-1~22.04 [139 kB]
#10 69.80 Get:199 http://archive.ubuntu.com/ubuntu jammy/main amd64 libjs-underscore all 1.13.2~dfsg-2 [118 kB]
#10 69.80 Get:200 http://archive.ubuntu.com/ubuntu jammy/main amd64 libjs-sphinxdoc all 4.3.2-1 [139 kB]
#10 69.80 Get:201 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 python3-dev amd64 3.10.6-1~22.04.1 [26.0 kB]
#10 69.81 Get:202 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-python1.74-dev amd64 1.74.0-14ubuntu3 [323 kB]
#10 70.10 Get:203 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-python-dev amd64 1.74.0.3ubuntu7 [3538 B]
#10 70.24 Get:204 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-random1.74.0 amd64 1.74.0-14ubuntu3 [231 kB]
#10 70.95 Get:205 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-random1.74-dev amd64 1.74.0-14ubuntu3 [231 kB]
#10 70.98 Get:206 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-random-dev amd64 1.74.0.3ubuntu7 [3258 B]
#10 70.98 Get:207 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-regex-dev amd64 1.74.0.3ubuntu7 [3510 B]
#10 70.98 Get:208 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-serialization-dev amd64 1.74.0.3ubuntu7 [3468 B]
#10 70.99 Get:209 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-stacktrace1.74.0 amd64 1.74.0-14ubuntu3 [267 kB]
#10 71.13 Get:210 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-stacktrace1.74-dev amd64 1.74.0-14ubuntu3 [232 kB]
#10 71.18 Get:211 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-stacktrace-dev amd64 1.74.0.3ubuntu7 [3260 B]
#10 71.18 Get:212 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-system-dev amd64 1.74.0.3ubuntu7 [3390 B]
#10 71.19 Get:213 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-test-dev amd64 1.74.0.3ubuntu7 [3274 B]
#10 71.19 Get:214 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-thread-dev amd64 1.74.0.3ubuntu7 [3266 B]
#10 71.19 Get:215 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-timer1.74.0 amd64 1.74.0-14ubuntu3 [228 kB]
#10 71.27 Get:216 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-timer1.74-dev amd64 1.74.0-14ubuntu3 [231 kB]
#10 71.32 Get:217 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-timer-dev amd64 1.74.0.3ubuntu7 [3380 B]
#10 71.32 Get:218 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-type-erasure1.74.0 amd64 1.74.0-14ubuntu3 [234 kB]
#10 71.78 Get:219 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-type-erasure1.74-dev amd64 1.74.0-14ubuntu3 [239 kB]
#10 71.79 Get:220 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-type-erasure-dev amd64 1.74.0.3ubuntu7 [3344 B]
#10 71.79 Get:221 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-wave1.74.0 amd64 1.74.0-14ubuntu3 [449 kB]
#10 71.79 Get:222 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-wave1.74-dev amd64 1.74.0-14ubuntu3 [496 kB]
#10 71.89 Get:223 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-wave-dev amd64 1.74.0.3ubuntu7 [3292 B]
#10 71.89 Get:224 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-nowide1.74.0 amd64 1.74.0-14ubuntu3 [223 kB]
#10 71.90 Get:225 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-nowide1.74-dev amd64 1.74.0-14ubuntu3 [220 kB]
#10 71.90 Get:226 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-nowide-dev amd64 1.74.0.3ubuntu7 [3322 B]
#10 71.90 Get:227 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-all-dev amd64 1.74.0.3ubuntu7 [2268 B]
#10 71.92 Get:228 http://archive.ubuntu.com/ubuntu jammy/main amd64 libminiupnpc17 amd64 2.2.3-1build1 [27.7 kB]
#10 71.93 Get:229 http://archive.ubuntu.com/ubuntu jammy/universe amd64 miniupnpc amd64 2.2.3-1build1 [14.3 kB]
#10 72.29 debconf: delaying package configuration, since apt-utils is not installed
#10 72.35 Fetched 155 MB in 48s (3218 kB/s)
#10 72.44 Selecting previously unselected package libpython3.10-minimal:amd64.
#10 72.44 (Reading database ... (Reading database ... 5%(Reading database ... 10%(Reading database ... 15%(Reading database ... 20%(Reading database ... 25%(Reading database ... 30%(Reading database ... 35%(Reading database ... 40%(Reading database ... 45%(Reading database ... 50%(Reading database ... 55%(Reading database ... 60%(Reading database ... 65%(Reading database ... 70%(Reading database ... 75%(Reading database ... 80%(Reading database ... 85%(Reading database ... 90%(Reading database ... 95%(Reading database ... 100%(Reading database ... 4393 files and directories currently installed.)
#10 72.47 Preparing to unpack .../libpython3.10-minimal_3.10.12-1~22.04.11_amd64.deb ...
#10 72.47 Unpacking libpython3.10-minimal:amd64 (3.10.12-1~22.04.11) ...
#10 72.61 Selecting previously unselected package libexpat1:amd64.
#10 72.61 Preparing to unpack .../libexpat1_2.4.7-1ubuntu0.6_amd64.deb ...
#10 72.61 Unpacking libexpat1:amd64 (2.4.7-1ubuntu0.6) ...
#10 72.71 Selecting previously unselected package python3.10-minimal.
#10 72.71 Preparing to unpack .../python3.10-minimal_3.10.12-1~22.04.11_amd64.deb ...
#10 72.76 Unpacking python3.10-minimal (3.10.12-1~22.04.11) ...
#10 72.85 Setting up libpython3.10-minimal:amd64 (3.10.12-1~22.04.11) ...
#10 72.88 Setting up libexpat1:amd64 (2.4.7-1ubuntu0.6) ...
#10 72.88 Setting up python3.10-minimal (3.10.12-1~22.04.11) ...
#10 73.75 Selecting previously unselected package python3-minimal.
#10 73.75 (Reading database ... (Reading database ... 5%(Reading database ... 10%(Reading database ... 15%(Reading database ... 20%(Reading database ... 25%(Reading database ... 30%(Reading database ... 35%(Reading database ... 40%(Reading database ... 45%(Reading database ... 50%(Reading database ... 55%(Reading database ... 60%(Reading database ... 65%(Reading database ... 70%(Reading database ... 75%(Reading database ... 80%(Reading database ... 85%(Reading database ... 90%(Reading database ... 95%(Reading database ... 100%(Reading database ... 4697 files and directories currently installed.)
#10 73.75 Preparing to unpack .../0-python3-minimal_3.10.6-1~22.04.1_amd64.deb ...
#10 73.75 Unpacking python3-minimal (3.10.6-1~22.04.1) ...
#10 73.86 Selecting previously unselected package media-types.
#10 73.86 Preparing to unpack .../1-media-types_7.0.0_all.deb ...
#10 73.86 Unpacking media-types (7.0.0) ...
#10 73.99 Selecting previously unselected package libmpdec3:amd64.
#10 73.99 Preparing to unpack .../2-libmpdec3_2.5.1-2build2_amd64.deb ...
#10 74.00 Unpacking libmpdec3:amd64 (2.5.1-2build2) ...
#10 74.11 Selecting previously unselected package readline-common.
#10 74.11 Preparing to unpack .../3-readline-common_8.1.2-1_all.deb ...
#10 74.11 Unpacking readline-common (8.1.2-1) ...
#10 74.20 Selecting previously unselected package libreadline8:amd64.
#10 74.20 Preparing to unpack .../4-libreadline8_8.1.2-1_amd64.deb ...
#10 74.20 Unpacking libreadline8:amd64 (8.1.2-1) ...
#10 74.30 Selecting previously unselected package libsqlite3-0:amd64.
#10 74.30 Preparing to unpack .../5-libsqlite3-0_3.37.2-2ubuntu0.5_amd64.deb ...
#10 74.30 Unpacking libsqlite3-0:amd64 (3.37.2-2ubuntu0.5) ...
#10 74.40 Selecting previously unselected package libpython3.10-stdlib:amd64.
#10 74.40 Preparing to unpack .../6-libpython3.10-stdlib_3.10.12-1~22.04.11_amd64.deb ...
#10 74.40 Unpacking libpython3.10-stdlib:amd64 (3.10.12-1~22.04.11) ...
#10 74.54 Selecting previously unselected package python3.10.
#10 74.54 Preparing to unpack .../7-python3.10_3.10.12-1~22.04.11_amd64.deb ...
#10 74.54 Unpacking python3.10 (3.10.12-1~22.04.11) ...
#10 74.64 Selecting previously unselected package libpython3-stdlib:amd64.
#10 74.64 Preparing to unpack .../8-libpython3-stdlib_3.10.6-1~22.04.1_amd64.deb ...
#10 74.65 Unpacking libpython3-stdlib:amd64 (3.10.6-1~22.04.1) ...
#10 74.74 Setting up python3-minimal (3.10.6-1~22.04.1) ...
#10 75.46 Selecting previously unselected package python3.
#10 75.46 (Reading database ... (Reading database ... 5%(Reading database ... 10%(Reading database ... 15%(Reading database ... 20%(Reading database ... 25%(Reading database ... 30%(Reading database ... 35%(Reading database ... 40%(Reading database ... 45%(Reading database ... 50%(Reading database ... 55%(Reading database ... 60%(Reading database ... 65%(Reading database ... 70%(Reading database ... 75%(Reading database ... 80%(Reading database ... 85%(Reading database ... 90%(Reading database ... 95%(Reading database ... 100%(Reading database ... 5127 files and directories currently installed.)
#10 75.47 Preparing to unpack .../000-python3_3.10.6-1~22.04.1_amd64.deb ...
#10 75.52 Unpacking python3 (3.10.6-1~22.04.1) ...
#10 75.62 Selecting previously unselected package perl-modules-5.34.
#10 ...

#11 [build 2/6] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&         apt-get install -y --no-install-recommends             build-essential cmake git pkg-config             libboost-all-dev libssl-dev libpthread-stubs0-dev libc6-dev libminiupnpc-dev &&         rm -rf /var/lib/apt/lists/*
#11 65.58 Get:20 http://archive.ubuntu.com/ubuntu jammy/main amd64 libbsd0 amd64 0.11.5-1 [44.8 kB]
#11 65.73 Get:21 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libglib2.0-0 amd64 2.72.4-0ubuntu2.6 [1467 kB]
#11 68.14 Get:22 http://archive.ubuntu.com/ubuntu jammy/main amd64 libicu70 amd64 70.1-2 [10.6 MB]
#11 ...

#10 [stage-1 2/4] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&             apt-get install -y --no-install-recommends                 libboost-all-dev libc6 procps miniupnpc &&         rm -rf /var/lib/apt/lists/*
#10 75.62 Preparing to unpack .../001-perl-modules-5.34_5.34.0-3ubuntu1.5_all.deb ...
#10 75.62 Unpacking perl-modules-5.34 (5.34.0-3ubuntu1.5) ...
#10 75.88 Selecting previously unselected package libgdbm6:amd64.
#10 75.88 Preparing to unpack .../002-libgdbm6_1.23-1_amd64.deb ...
#10 75.88 Unpacking libgdbm6:amd64 (1.23-1) ...
#10 75.98 Selecting previously unselected package libgdbm-compat4:amd64.
#10 75.98 Preparing to unpack .../003-libgdbm-compat4_1.23-1_amd64.deb ...
#10 75.98 Unpacking libgdbm-compat4:amd64 (1.23-1) ...
#10 76.07 Selecting previously unselected package libperl5.34:amd64.
#10 76.07 Preparing to unpack .../004-libperl5.34_5.34.0-3ubuntu1.5_amd64.deb ...
#10 76.08 Unpacking libperl5.34:amd64 (5.34.0-3ubuntu1.5) ...
#10 76.32 Selecting previously unselected package perl.
#10 76.33 Preparing to unpack .../005-perl_5.34.0-3ubuntu1.5_amd64.deb ...
#10 76.40 Unpacking perl (5.34.0-3ubuntu1.5) ...
#10 76.52 Selecting previously unselected package libmd0:amd64.
#10 76.52 Preparing to unpack .../006-libmd0_1.0.4-1build1_amd64.deb ...
#10 76.52 Unpacking libmd0:amd64 (1.0.4-1build1) ...
#10 76.62 Selecting previously unselected package libbsd0:amd64.
#10 76.62 Preparing to unpack .../007-libbsd0_0.11.5-1_amd64.deb ...
#10 76.62 Unpacking libbsd0:amd64 (0.11.5-1) ...
#10 76.74 Selecting previously unselected package libicu70:amd64.
#10 76.74 Preparing to unpack .../008-libicu70_70.1-2_amd64.deb ...
#10 76.74 Unpacking libicu70:amd64 (70.1-2) ...
#10 77.02 Selecting previously unselected package libxml2:amd64.
#10 77.02 Preparing to unpack .../009-libxml2_2.9.13+dfsg-1ubuntu0.9_amd64.deb ...
#10 77.03 Unpacking libxml2:amd64 (2.9.13+dfsg-1ubuntu0.9) ...
#10 77.12 Selecting previously unselected package libcbor0.8:amd64.
#10 77.13 Preparing to unpack .../010-libcbor0.8_0.8.0-2ubuntu1_amd64.deb ...
#10 77.13 Unpacking libcbor0.8:amd64 (0.8.0-2ubuntu1) ...
#10 77.22 Selecting previously unselected package libedit2:amd64.
#10 77.22 Preparing to unpack .../011-libedit2_3.1-20210910-1build1_amd64.deb ...
#10 77.22 Unpacking libedit2:amd64 (3.1-20210910-1build1) ...
#10 77.33 Selecting previously unselected package libfido2-1:amd64.
#10 77.34 Preparing to unpack .../012-libfido2-1_1.10.0-1_amd64.deb ...
#10 77.34 Unpacking libfido2-1:amd64 (1.10.0-1) ...
#10 77.43 Selecting previously unselected package libnghttp2-14:amd64.
#10 77.43 Preparing to unpack .../013-libnghttp2-14_1.43.0-1ubuntu0.2_amd64.deb ...
#10 77.43 Unpacking libnghttp2-14:amd64 (1.43.0-1ubuntu0.2) ...
#10 77.53 Selecting previously unselected package libnuma1:amd64.
#10 77.53 Preparing to unpack .../014-libnuma1_2.0.14-3ubuntu2_amd64.deb ...
#10 77.53 Unpacking libnuma1:amd64 (2.0.14-3ubuntu2) ...
#10 77.62 Selecting previously unselected package libpsl5:amd64.
#10 77.62 Preparing to unpack .../015-libpsl5_0.21.0-1.2build2_amd64.deb ...
#10 77.62 Unpacking libpsl5:amd64 (0.21.0-1.2build2) ...
#10 77.72 Selecting previously unselected package libxau6:amd64.
#10 77.72 Preparing to unpack .../016-libxau6_1%3a1.0.9-1build5_amd64.deb ...
#10 77.72 Unpacking libxau6:amd64 (1:1.0.9-1build5) ...
#10 77.81 Selecting previously unselected package libxdmcp6:amd64.
#10 77.81 Preparing to unpack .../017-libxdmcp6_1%3a1.1.3-0ubuntu5_amd64.deb ...
#10 77.81 Unpacking libxdmcp6:amd64 (1:1.1.3-0ubuntu5) ...
#10 77.94 Selecting previously unselected package libxcb1:amd64.
#10 77.94 Preparing to unpack .../018-libxcb1_1.14-3ubuntu3_amd64.deb ...
#10 77.94 Unpacking libxcb1:amd64 (1.14-3ubuntu3) ...
#10 78.03 Selecting previously unselected package libx11-data.
#10 78.03 Preparing to unpack .../019-libx11-data_2%3a1.7.5-1ubuntu0.3_all.deb ...
#10 78.03 Unpacking libx11-data (2:1.7.5-1ubuntu0.3) ...
#10 78.14 Selecting previously unselected package libx11-6:amd64.
#10 78.14 Preparing to unpack .../020-libx11-6_2%3a1.7.5-1ubuntu0.3_amd64.deb ...
#10 78.14 Unpacking libx11-6:amd64 (2:1.7.5-1ubuntu0.3) ...
#10 78.25 Selecting previously unselected package libxext6:amd64.
#10 78.25 Preparing to unpack .../021-libxext6_2%3a1.3.4-1build1_amd64.deb ...
#10 78.25 Unpacking libxext6:amd64 (2:1.3.4-1build1) ...
#10 78.36 Selecting previously unselected package openssh-client.
#10 78.36 Preparing to unpack .../022-openssh-client_1%3a8.9p1-3ubuntu0.13_amd64.deb ...
#10 78.43 Unpacking openssh-client (1:8.9p1-3ubuntu0.13) ...
#10 78.54 Selecting previously unselected package libsigsegv2:amd64.
#10 78.54 Preparing to unpack .../023-libsigsegv2_2.13-1ubuntu3_amd64.deb ...
#10 78.55 Unpacking libsigsegv2:amd64 (2.13-1ubuntu3) ...
#10 78.64 Selecting previously unselected package m4.
#10 78.64 Preparing to unpack .../024-m4_1.4.18-5ubuntu2_amd64.deb ...
#10 78.64 Unpacking m4 (1.4.18-5ubuntu2) ...
#10 78.73 Selecting previously unselected package autoconf.
#10 78.73 Preparing to unpack .../025-autoconf_2.71-2_all.deb ...
#10 78.73 Unpacking autoconf (2.71-2) ...
#10 78.84 Selecting previously unselected package autotools-dev.
#10 78.84 Preparing to unpack .../026-autotools-dev_20220109.1_all.deb ...
#10 78.84 Unpacking autotools-dev (20220109.1) ...
#10 78.95 Selecting previously unselected package automake.
#10 78.95 Preparing to unpack .../027-automake_1%3a1.16.5-1.3_all.deb ...
#10 78.97 Unpacking automake (1:1.16.5-1.3) ...
#10 79.18 Selecting previously unselected package binutils-common:amd64.
#10 79.18 Preparing to unpack .../028-binutils-common_2.38-4ubuntu2.8_amd64.deb ...
#10 79.18 Unpacking binutils-common:amd64 (2.38-4ubuntu2.8) ...
#10 79.31 Selecting previously unselected package libbinutils:amd64.
#10 79.31 Preparing to unpack .../029-libbinutils_2.38-4ubuntu2.8_amd64.deb ...
#10 79.31 Unpacking libbinutils:amd64 (2.38-4ubuntu2.8) ...
#10 79.48 Selecting previously unselected package libctf-nobfd0:amd64.
#10 79.48 Preparing to unpack .../030-libctf-nobfd0_2.38-4ubuntu2.8_amd64.deb ...
#10 79.48 Unpacking libctf-nobfd0:amd64 (2.38-4ubuntu2.8) ...
#10 79.58 Selecting previously unselected package libctf0:amd64.
#10 79.58 Preparing to unpack .../031-libctf0_2.38-4ubuntu2.8_amd64.deb ...
#10 79.59 Unpacking libctf0:amd64 (2.38-4ubuntu2.8) ...
#10 79.68 Selecting previously unselected package binutils-x86-64-linux-gnu.
#10 79.68 Preparing to unpack .../032-binutils-x86-64-linux-gnu_2.38-4ubuntu2.8_amd64.deb ...
#10 79.68 Unpacking binutils-x86-64-linux-gnu (2.38-4ubuntu2.8) ...
#10 79.85 Selecting previously unselected package binutils.
#10 79.85 Preparing to unpack .../033-binutils_2.38-4ubuntu2.8_amd64.deb ...
#10 79.85 Unpacking binutils (2.38-4ubuntu2.8) ...
#10 79.96 Selecting previously unselected package gcc-11-base:amd64.
#10 79.96 Preparing to unpack .../034-gcc-11-base_11.4.0-1ubuntu1~22.04.2_amd64.deb ...
#10 79.96 Unpacking gcc-11-base:amd64 (11.4.0-1ubuntu1~22.04.2) ...
#10 80.06 Selecting previously unselected package libisl23:amd64.
#10 80.06 Preparing to unpack .../035-libisl23_0.24-2build1_amd64.deb ...
#10 80.06 Unpacking libisl23:amd64 (0.24-2build1) ...
#10 80.16 Selecting previously unselected package libmpfr6:amd64.
#10 80.16 Preparing to unpack .../036-libmpfr6_4.1.0-3build3_amd64.deb ...
#10 80.17 Unpacking libmpfr6:amd64 (4.1.0-3build3) ...
#10 80.27 Selecting previously unselected package libmpc3:amd64.
#10 80.27 Preparing to unpack .../037-libmpc3_1.2.1-2build1_amd64.deb ...
#10 80.27 Unpacking libmpc3:amd64 (1.2.1-2build1) ...
#10 80.37 Selecting previously unselected package cpp-11.
#10 80.37 Preparing to unpack .../038-cpp-11_11.4.0-1ubuntu1~22.04.2_amd64.deb ...
#10 80.37 Unpacking cpp-11 (11.4.0-1ubuntu1~22.04.2) ...
#10 80.64 Selecting previously unselected package libcc1-0:amd64.
#10 80.65 Preparing to unpack .../039-libcc1-0_12.3.0-1ubuntu1~22.04.2_amd64.deb ...
#10 80.65 Unpacking libcc1-0:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#10 80.74 Selecting previously unselected package libgomp1:amd64.
#10 80.74 Preparing to unpack .../040-libgomp1_12.3.0-1ubuntu1~22.04.2_amd64.deb ...
#10 80.75 Unpacking libgomp1:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#10 80.84 Selecting previously unselected package libitm1:amd64.
#10 80.84 Preparing to unpack .../041-libitm1_12.3.0-1ubuntu1~22.04.2_amd64.deb ...
#10 80.84 Unpacking libitm1:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#10 80.95 Selecting previously unselected package libatomic1:amd64.
#10 80.95 Preparing to unpack .../042-libatomic1_12.3.0-1ubuntu1~22.04.2_amd64.deb ...
#10 80.95 Unpacking libatomic1:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#10 81.05 Selecting previously unselected package libasan6:amd64.
#10 81.05 Preparing to unpack .../043-libasan6_11.4.0-1ubuntu1~22.04.2_amd64.deb ...
#10 81.05 Unpacking libasan6:amd64 (11.4.0-1ubuntu1~22.04.2) ...
#10 81.19 Selecting previously unselected package liblsan0:amd64.
#10 81.19 Preparing to unpack .../044-liblsan0_12.3.0-1ubuntu1~22.04.2_amd64.deb ...
#10 81.20 Unpacking liblsan0:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#10 81.30 Selecting previously unselected package libtsan0:amd64.
#10 81.30 Preparing to unpack .../045-libtsan0_11.4.0-1ubuntu1~22.04.2_amd64.deb ...
#10 81.30 Unpacking libtsan0:amd64 (11.4.0-1ubuntu1~22.04.2) ...
#10 81.42 Selecting previously unselected package libubsan1:amd64.
#10 81.43 Preparing to unpack .../046-libubsan1_12.3.0-1ubuntu1~22.04.2_amd64.deb ...
#10 81.43 Unpacking libubsan1:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#10 81.56 Selecting previously unselected package libquadmath0:amd64.
#10 81.56 Preparing to unpack .../047-libquadmath0_12.3.0-1ubuntu1~22.04.2_amd64.deb ...
#10 81.56 Unpacking libquadmath0:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#10 81.71 Selecting previously unselected package libgcc-11-dev:amd64.
#10 81.71 Preparing to unpack .../048-libgcc-11-dev_11.4.0-1ubuntu1~22.04.2_amd64.deb ...
#10 81.71 Unpacking libgcc-11-dev:amd64 (11.4.0-1ubuntu1~22.04.2) ...
#10 81.88 Selecting previously unselected package gcc-11.
#10 81.88 Preparing to unpack .../049-gcc-11_11.4.0-1ubuntu1~22.04.2_amd64.deb ...
#10 81.88 Unpacking gcc-11 (11.4.0-1ubuntu1~22.04.2) ...
#10 82.27 Selecting previously unselected package libgfortran5:amd64.
#10 82.27 Preparing to unpack .../050-libgfortran5_12.3.0-1ubuntu1~22.04.2_amd64.deb ...
#10 82.27 Unpacking libgfortran5:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#10 82.38 Selecting previously unselected package libgfortran-11-dev:amd64.
#10 82.38 Preparing to unpack .../051-libgfortran-11-dev_11.4.0-1ubuntu1~22.04.2_amd64.deb ...
#10 82.38 Unpacking libgfortran-11-dev:amd64 (11.4.0-1ubuntu1~22.04.2) ...
#10 82.49 Selecting previously unselected package libc-dev-bin.
#10 82.50 Preparing to unpack .../052-libc-dev-bin_2.35-0ubuntu3.10_amd64.deb ...
#10 82.50 Unpacking libc-dev-bin (2.35-0ubuntu3.10) ...
#10 82.60 Selecting previously unselected package linux-libc-dev:amd64.
#10 82.60 Preparing to unpack .../053-linux-libc-dev_5.15.0-153.163_amd64.deb ...
#10 82.60 Unpacking linux-libc-dev:amd64 (5.15.0-153.163) ...
#10 82.81 Selecting previously unselected package libcrypt-dev:amd64.
#10 82.81 Preparing to unpack .../054-libcrypt-dev_1%3a4.4.27-1_amd64.deb ...
#10 82.81 Unpacking libcrypt-dev:amd64 (1:4.4.27-1) ...
#10 82.91 Selecting previously unselected package rpcsvc-proto.
#10 82.91 Preparing to unpack .../055-rpcsvc-proto_1.4.2-0ubuntu6_amd64.deb ...
#10 82.91 Unpacking rpcsvc-proto (1.4.2-0ubuntu6) ...
#10 83.01 Selecting previously unselected package libtirpc-dev:amd64.
#10 83.01 Preparing to unpack .../056-libtirpc-dev_1.3.2-2ubuntu0.1_amd64.deb ...
#10 83.01 Unpacking libtirpc-dev:amd64 (1.3.2-2ubuntu0.1) ...
#10 83.11 Selecting previously unselected package libnsl-dev:amd64.
#10 83.11 Preparing to unpack .../057-libnsl-dev_1.3.0-2build2_amd64.deb ...
#10 83.11 Unpacking libnsl-dev:amd64 (1.3.0-2build2) ...
#10 83.21 Selecting previously unselected package libc6-dev:amd64.
#10 83.21 Preparing to unpack .../058-libc6-dev_2.35-0ubuntu3.10_amd64.deb ...
#10 83.21 Unpacking libc6-dev:amd64 (2.35-0ubuntu3.10) ...
#10 83.38 Selecting previously unselected package gfortran-11.
#10 83.38 Preparing to unpack .../059-gfortran-11_11.4.0-1ubuntu1~22.04.2_amd64.deb ...
#10 83.38 Unpacking gfortran-11 (11.4.0-1ubuntu1~22.04.2) ...
#10 83.69 Selecting previously unselected package libnl-3-200:amd64.
#10 83.69 Preparing to unpack .../060-libnl-3-200_3.5.0-0.1_amd64.deb ...
#10 83.69 Unpacking libnl-3-200:amd64 (3.5.0-0.1) ...
#10 83.79 Selecting previously unselected package libnl-route-3-200:amd64.
#10 83.79 Preparing to unpack .../061-libnl-route-3-200_3.5.0-0.1_amd64.deb ...
#10 83.79 Unpacking libnl-route-3-200:amd64 (3.5.0-0.1) ...
#10 83.93 Selecting previously unselected package libibverbs1:amd64.
#10 83.93 Preparing to unpack .../062-libibverbs1_39.0-1_amd64.deb ...
#10 83.93 Unpacking libibverbs1:amd64 (39.0-1) ...
#10 84.09 Selecting previously unselected package ibverbs-providers:amd64.
#10 84.09 Preparing to unpack .../063-ibverbs-providers_39.0-1_amd64.deb ...
#10 84.28 Unpacking ibverbs-providers:amd64 (39.0-1) ...
#10 84.38 Selecting previously unselected package icu-devtools.
#10 84.38 Preparing to unpack .../064-icu-devtools_70.1-2_amd64.deb ...
#10 84.38 Unpacking icu-devtools (70.1-2) ...
#10 84.48 Selecting previously unselected package libstdc++-11-dev:amd64.
#10 84.48 Preparing to unpack .../065-libstdc++-11-dev_11.4.0-1ubuntu1~22.04.2_amd64.deb ...
#10 84.48 Unpacking libstdc++-11-dev:amd64 (11.4.0-1ubuntu1~22.04.2) ...
#10 84.72 Selecting previously unselected package libboost1.74-dev:amd64.
#10 84.72 Preparing to unpack .../066-libboost1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 84.72 Unpacking libboost1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 86.36 Selecting previously unselected package libboost-dev:amd64.
#10 86.37 Preparing to unpack .../067-libboost-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 86.37 Unpacking libboost-dev:amd64 (1.74.0.3ubuntu7) ...
#10 86.46 Selecting previously unselected package libboost1.74-tools-dev.
#10 86.47 Preparing to unpack .../068-libboost1.74-tools-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 86.47 Unpacking libboost1.74-tools-dev (1.74.0-14ubuntu3) ...
#10 86.61 Selecting previously unselected package libboost-tools-dev.
#10 ...

#11 [build 2/6] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&         apt-get install -y --no-install-recommends             build-essential cmake git pkg-config             libboost-all-dev libssl-dev libpthread-stubs0-dev libc6-dev libminiupnpc-dev &&         rm -rf /var/lib/apt/lists/*
#11 76.46 Get:23 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libxml2 amd64 2.9.13+dfsg-1ubuntu0.9 [764 kB]
#11 76.72 Get:24 http://archive.ubuntu.com/ubuntu jammy/main amd64 libcbor0.8 amd64 0.8.0-2ubuntu1 [24.6 kB]
#11 76.73 Get:25 http://archive.ubuntu.com/ubuntu jammy/main amd64 libedit2 amd64 3.1-20210910-1build1 [96.8 kB]
#11 76.94 Get:26 http://archive.ubuntu.com/ubuntu jammy/main amd64 libfido2-1 amd64 1.10.0-1 [82.8 kB]
#11 76.94 Get:27 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libnghttp2-14 amd64 1.43.0-1ubuntu0.2 [76.9 kB]
#11 76.94 Get:28 http://archive.ubuntu.com/ubuntu jammy/main amd64 libnuma1 amd64 2.0.14-3ubuntu2 [22.5 kB]
#11 76.94 Get:29 http://archive.ubuntu.com/ubuntu jammy/main amd64 libpsl5 amd64 0.21.0-1.2build2 [58.4 kB]
#11 76.94 Get:30 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libuv1 amd64 1.43.0-1ubuntu0.1 [92.7 kB]
#11 76.94 Get:31 http://archive.ubuntu.com/ubuntu jammy/main amd64 libxau6 amd64 1:1.0.9-1build5 [7634 B]
#11 76.94 Get:32 http://archive.ubuntu.com/ubuntu jammy/main amd64 libxdmcp6 amd64 1:1.1.3-0ubuntu5 [10.9 kB]
#11 76.95 Get:33 http://archive.ubuntu.com/ubuntu jammy/main amd64 libxcb1 amd64 1.14-3ubuntu3 [49.0 kB]
#11 76.95 Get:34 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libx11-data all 2:1.7.5-1ubuntu0.3 [120 kB]
#11 77.08 Get:35 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libx11-6 amd64 2:1.7.5-1ubuntu0.3 [667 kB]
#11 77.33 Get:36 http://archive.ubuntu.com/ubuntu jammy/main amd64 libxext6 amd64 2:1.3.4-1build1 [31.8 kB]
#11 77.34 Get:37 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 openssh-client amd64 1:8.9p1-3ubuntu0.13 [903 kB]
#11 77.86 Get:38 http://archive.ubuntu.com/ubuntu jammy/main amd64 xz-utils amd64 5.2.5-2ubuntu1 [84.8 kB]
#11 77.86 Get:39 http://archive.ubuntu.com/ubuntu jammy/main amd64 libsigsegv2 amd64 2.13-1ubuntu3 [14.6 kB]
#11 77.86 Get:40 http://archive.ubuntu.com/ubuntu jammy/main amd64 m4 amd64 1.4.18-5ubuntu2 [199 kB]
#11 77.86 Get:41 http://archive.ubuntu.com/ubuntu jammy/main amd64 autoconf all 2.71-2 [338 kB]
#11 77.89 Get:42 http://archive.ubuntu.com/ubuntu jammy/main amd64 autotools-dev all 20220109.1 [44.9 kB]
#11 77.91 Get:43 http://archive.ubuntu.com/ubuntu jammy/main amd64 automake all 1:1.16.5-1.3 [558 kB]
#11 78.18 Get:44 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 binutils-common amd64 2.38-4ubuntu2.8 [223 kB]
#11 78.19 Get:45 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libbinutils amd64 2.38-4ubuntu2.8 [661 kB]
#11 78.47 Get:46 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libctf-nobfd0 amd64 2.38-4ubuntu2.8 [108 kB]
#11 78.50 Get:47 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libctf0 amd64 2.38-4ubuntu2.8 [103 kB]
#11 78.51 Get:48 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 binutils-x86-64-linux-gnu amd64 2.38-4ubuntu2.8 [2324 kB]
#11 79.37 Get:49 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 binutils amd64 2.38-4ubuntu2.8 [3196 B]
#11 79.37 Get:50 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libc-dev-bin amd64 2.35-0ubuntu3.10 [20.3 kB]
#11 79.37 Get:51 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 linux-libc-dev amd64 5.15.0-153.163 [1324 kB]
#11 79.63 Get:52 http://archive.ubuntu.com/ubuntu jammy/main amd64 libcrypt-dev amd64 1:4.4.27-1 [112 kB]
#11 79.66 Get:53 http://archive.ubuntu.com/ubuntu jammy/main amd64 rpcsvc-proto amd64 1.4.2-0ubuntu6 [68.5 kB]
#11 79.69 Get:54 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libtirpc-dev amd64 1.3.2-2ubuntu0.1 [192 kB]
#11 79.75 Get:55 http://archive.ubuntu.com/ubuntu jammy/main amd64 libnsl-dev amd64 1.3.0-2build2 [71.3 kB]
#11 80.42 Get:56 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libc6-dev amd64 2.35-0ubuntu3.10 [2100 kB]
#11 80.96 Get:57 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 gcc-11-base amd64 11.4.0-1ubuntu1~22.04.2 [20.8 kB]
#11 80.96 Get:58 http://archive.ubuntu.com/ubuntu jammy/main amd64 libisl23 amd64 0.24-2build1 [727 kB]
#11 81.46 Get:59 http://archive.ubuntu.com/ubuntu jammy/main amd64 libmpfr6 amd64 4.1.0-3build3 [1425 kB]
#11 82.08 Get:60 http://archive.ubuntu.com/ubuntu jammy/main amd64 libmpc3 amd64 1.2.1-2build1 [46.9 kB]
#11 82.09 Get:61 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 cpp-11 amd64 11.4.0-1ubuntu1~22.04.2 [10.0 MB]
#11 84.63 Get:62 http://archive.ubuntu.com/ubuntu jammy/main amd64 cpp amd64 4:11.2.0-1ubuntu1 [27.7 kB]
#11 84.63 Get:63 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libcc1-0 amd64 12.3.0-1ubuntu1~22.04.2 [48.3 kB]
#11 84.63 Get:64 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libgomp1 amd64 12.3.0-1ubuntu1~22.04.2 [127 kB]
#11 84.64 Get:65 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libitm1 amd64 12.3.0-1ubuntu1~22.04.2 [30.2 kB]
#11 84.64 Get:66 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libatomic1 amd64 12.3.0-1ubuntu1~22.04.2 [10.4 kB]
#11 84.64 Get:67 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libasan6 amd64 11.4.0-1ubuntu1~22.04.2 [2283 kB]
#11 85.55 Get:68 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 liblsan0 amd64 12.3.0-1ubuntu1~22.04.2 [1069 kB]
#11 86.49 Get:69 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libtsan0 amd64 11.4.0-1ubuntu1~22.04.2 [2262 kB]
#11 86.52 Get:70 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libubsan1 amd64 12.3.0-1ubuntu1~22.04.2 [976 kB]
#11 86.75 Get:71 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libquadmath0 amd64 12.3.0-1ubuntu1~22.04.2 [154 kB]
#11 ...

#10 [stage-1 2/4] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&             apt-get install -y --no-install-recommends                 libboost-all-dev libc6 procps miniupnpc &&         rm -rf /var/lib/apt/lists/*
#10 86.61 Preparing to unpack .../069-libboost-tools-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 86.61 Unpacking libboost-tools-dev (1.74.0.3ubuntu7) ...
#10 86.71 Selecting previously unselected package libboost-atomic1.74.0:amd64.
#10 86.71 Preparing to unpack .../070-libboost-atomic1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#10 86.71 Unpacking libboost-atomic1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 86.82 Selecting previously unselected package libboost-atomic1.74-dev:amd64.
#10 86.83 Preparing to unpack .../071-libboost-atomic1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 86.83 Unpacking libboost-atomic1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 86.93 Selecting previously unselected package libboost-atomic-dev:amd64.
#10 86.94 Preparing to unpack .../072-libboost-atomic-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 86.94 Unpacking libboost-atomic-dev:amd64 (1.74.0.3ubuntu7) ...
#10 87.03 Selecting previously unselected package libboost-chrono1.74.0:amd64.
#10 87.03 Preparing to unpack .../073-libboost-chrono1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#10 87.03 Unpacking libboost-chrono1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 87.13 Selecting previously unselected package libboost-chrono1.74-dev:amd64.
#10 87.13 Preparing to unpack .../074-libboost-chrono1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 87.13 Unpacking libboost-chrono1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 87.23 Selecting previously unselected package libboost-chrono-dev:amd64.
#10 87.23 Preparing to unpack .../075-libboost-chrono-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 87.23 Unpacking libboost-chrono-dev:amd64 (1.74.0.3ubuntu7) ...
#10 87.33 Selecting previously unselected package libboost-container1.74.0:amd64.
#10 87.33 Preparing to unpack .../076-libboost-container1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#10 87.33 Unpacking libboost-container1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 87.43 Selecting previously unselected package libboost-container1.74-dev:amd64.
#10 87.43 Preparing to unpack .../077-libboost-container1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 87.43 Unpacking libboost-container1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 87.53 Selecting previously unselected package libboost-container-dev:amd64.
#10 87.53 Preparing to unpack .../078-libboost-container-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 87.53 Unpacking libboost-container-dev:amd64 (1.74.0.3ubuntu7) ...
#10 87.62 Selecting previously unselected package libboost-date-time1.74.0:amd64.
#10 87.62 Preparing to unpack .../079-libboost-date-time1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#10 87.62 Unpacking libboost-date-time1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 87.73 Selecting previously unselected package libboost-serialization1.74.0:amd64.
#10 87.73 Preparing to unpack .../080-libboost-serialization1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#10 87.73 Unpacking libboost-serialization1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 87.85 Selecting previously unselected package libboost-serialization1.74-dev:amd64.
#10 87.86 Preparing to unpack .../081-libboost-serialization1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 87.86 Unpacking libboost-serialization1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 87.97 Selecting previously unselected package libboost-date-time1.74-dev:amd64.
#10 87.98 Preparing to unpack .../082-libboost-date-time1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 87.98 Unpacking libboost-date-time1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 88.08 Selecting previously unselected package libboost-system1.74.0:amd64.
#10 88.08 Preparing to unpack .../083-libboost-system1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#10 88.09 Unpacking libboost-system1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 88.21 Selecting previously unselected package libboost-system1.74-dev:amd64.
#10 88.22 Preparing to unpack .../084-libboost-system1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 88.22 Unpacking libboost-system1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 88.33 Selecting previously unselected package libboost-thread1.74.0:amd64.
#10 88.33 Preparing to unpack .../085-libboost-thread1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#10 88.33 Unpacking libboost-thread1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 88.43 Selecting previously unselected package libboost-thread1.74-dev:amd64.
#10 88.43 Preparing to unpack .../086-libboost-thread1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 88.43 Unpacking libboost-thread1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 88.58 Selecting previously unselected package libboost-context1.74.0:amd64.
#10 88.58 Preparing to unpack .../087-libboost-context1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#10 88.58 Unpacking libboost-context1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 88.68 Selecting previously unselected package libboost-context1.74-dev:amd64.
#10 88.69 Preparing to unpack .../088-libboost-context1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 88.69 Unpacking libboost-context1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 88.79 Selecting previously unselected package libboost-context-dev:amd64.
#10 88.80 Preparing to unpack .../089-libboost-context-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 88.80 Unpacking libboost-context-dev:amd64 (1.74.0.3ubuntu7) ...
#10 88.91 Selecting previously unselected package libboost-coroutine1.74.0:amd64.
#10 88.91 Preparing to unpack .../090-libboost-coroutine1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#10 88.91 Unpacking libboost-coroutine1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 89.02 Selecting previously unselected package libboost-coroutine1.74-dev:amd64.
#10 89.02 Preparing to unpack .../091-libboost-coroutine1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 89.02 Unpacking libboost-coroutine1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 89.13 Selecting previously unselected package libboost-coroutine-dev:amd64.
#10 89.13 Preparing to unpack .../092-libboost-coroutine-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 89.13 Unpacking libboost-coroutine-dev:amd64 (1.74.0.3ubuntu7) ...
#10 89.22 Selecting previously unselected package libboost-date-time-dev:amd64.
#10 89.22 Preparing to unpack .../093-libboost-date-time-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 89.23 Unpacking libboost-date-time-dev:amd64 (1.74.0.3ubuntu7) ...
#10 89.32 Selecting previously unselected package libboost-exception1.74-dev:amd64.
#10 89.32 Preparing to unpack .../094-libboost-exception1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 89.32 Unpacking libboost-exception1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 89.42 Selecting previously unselected package libboost-exception-dev:amd64.
#10 89.43 Preparing to unpack .../095-libboost-exception-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 89.43 Unpacking libboost-exception-dev:amd64 (1.74.0.3ubuntu7) ...
#10 89.52 Selecting previously unselected package libboost-filesystem1.74.0:amd64.
#10 89.52 Preparing to unpack .../096-libboost-filesystem1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#10 89.52 Unpacking libboost-filesystem1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 89.62 Selecting previously unselected package libboost-filesystem1.74-dev:amd64.
#10 89.62 Preparing to unpack .../097-libboost-filesystem1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 89.63 Unpacking libboost-filesystem1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 89.73 Selecting previously unselected package libboost-fiber1.74.0:amd64.
#10 89.73 Preparing to unpack .../098-libboost-fiber1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#10 89.73 Unpacking libboost-fiber1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 89.85 Selecting previously unselected package libboost-fiber1.74-dev:amd64.
#10 89.85 Preparing to unpack .../099-libboost-fiber1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 89.85 Unpacking libboost-fiber1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 90.00 Selecting previously unselected package libboost-fiber-dev:amd64.
#10 90.01 Preparing to unpack .../100-libboost-fiber-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 90.01 Unpacking libboost-fiber-dev:amd64 (1.74.0.3ubuntu7) ...
#10 90.10 Selecting previously unselected package libboost-filesystem-dev:amd64.
#10 90.10 Preparing to unpack .../101-libboost-filesystem-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 90.10 Unpacking libboost-filesystem-dev:amd64 (1.74.0.3ubuntu7) ...
#10 90.19 Selecting previously unselected package libboost-regex1.74.0:amd64.
#10 90.20 Preparing to unpack .../102-libboost-regex1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#10 90.20 Unpacking libboost-regex1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 90.30 Selecting previously unselected package libboost-graph1.74.0:amd64.
#10 90.30 Preparing to unpack .../103-libboost-graph1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#10 90.30 Unpacking libboost-graph1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 90.40 Selecting previously unselected package libicu-dev:amd64.
#10 90.41 Preparing to unpack .../104-libicu-dev_70.1-2_amd64.deb ...
#10 90.41 Unpacking libicu-dev:amd64 (70.1-2) ...
#10 90.73 Selecting previously unselected package libboost-regex1.74-dev:amd64.
#10 90.73 Preparing to unpack .../105-libboost-regex1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 90.74 Unpacking libboost-regex1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 90.84 Selecting previously unselected package libboost-test1.74.0:amd64.
#10 90.85 Preparing to unpack .../106-libboost-test1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#10 90.85 Unpacking libboost-test1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 90.96 Selecting previously unselected package libboost-test1.74-dev:amd64.
#10 90.96 Preparing to unpack .../107-libboost-test1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 90.96 Unpacking libboost-test1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 91.09 Selecting previously unselected package libboost-graph1.74-dev:amd64.
#10 91.09 Preparing to unpack .../108-libboost-graph1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 91.09 Unpacking libboost-graph1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 91.21 Selecting previously unselected package libboost-graph-dev:amd64.
#10 91.21 Preparing to unpack .../109-libboost-graph-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 91.21 Unpacking libboost-graph-dev:amd64 (1.74.0.3ubuntu7) ...
#10 91.33 Selecting previously unselected package libevent-core-2.1-7:amd64.
#10 91.34 Preparing to unpack .../110-libevent-core-2.1-7_2.1.12-stable-1build3_amd64.deb ...
#10 91.34 Unpacking libevent-core-2.1-7:amd64 (2.1.12-stable-1build3) ...
#10 91.48 Selecting previously unselected package libevent-pthreads-2.1-7:amd64.
#10 91.48 Preparing to unpack .../111-libevent-pthreads-2.1-7_2.1.12-stable-1build3_amd64.deb ...
#10 91.48 Unpacking libevent-pthreads-2.1-7:amd64 (2.1.12-stable-1build3) ...
#10 91.58 Selecting previously unselected package libpsm-infinipath1.
#10 91.58 Preparing to unpack .../112-libpsm-infinipath1_3.3+20.604758e7-6.1_amd64.deb ...
#10 91.58 Unpacking libpsm-infinipath1 (3.3+20.604758e7-6.1) ...
#10 91.69 Selecting previously unselected package libpsm2-2.
#10 91.69 Preparing to unpack .../113-libpsm2-2_11.2.185-1_amd64.deb ...
#10 91.69 Unpacking libpsm2-2 (11.2.185-1) ...
#10 91.81 Selecting previously unselected package librdmacm1:amd64.
#10 91.81 Preparing to unpack .../114-librdmacm1_39.0-1_amd64.deb ...
#10 91.81 Unpacking librdmacm1:amd64 (39.0-1) ...
#10 91.94 Selecting previously unselected package libfabric1:amd64.
#10 91.94 Preparing to unpack .../115-libfabric1_1.11.0-3_amd64.deb ...
#10 91.94 Unpacking libfabric1:amd64 (1.11.0-3) ...
#10 92.09 Selecting previously unselected package libhwloc15:amd64.
#10 92.10 Preparing to unpack .../116-libhwloc15_2.7.0-2ubuntu1_amd64.deb ...
#10 92.10 Unpacking libhwloc15:amd64 (2.7.0-2ubuntu1) ...
#10 92.19 Selecting previously unselected package libbrotli1:amd64.
#10 92.20 Preparing to unpack .../117-libbrotli1_1.0.9-2build6_amd64.deb ...
#10 92.20 Unpacking libbrotli1:amd64 (1.0.9-2build6) ...
#10 92.32 Selecting previously unselected package libsasl2-modules-db:amd64.
#10 92.32 Preparing to unpack .../118-libsasl2-modules-db_2.1.27+dfsg2-3ubuntu1.2_amd64.deb ...
#10 92.32 Unpacking libsasl2-modules-db:amd64 (2.1.27+dfsg2-3ubuntu1.2) ...
#10 92.43 Selecting previously unselected package libsasl2-2:amd64.
#10 92.43 Preparing to unpack .../119-libsasl2-2_2.1.27+dfsg2-3ubuntu1.2_amd64.deb ...
#10 92.44 Unpacking libsasl2-2:amd64 (2.1.27+dfsg2-3ubuntu1.2) ...
#10 92.55 Selecting previously unselected package libldap-2.5-0:amd64.
#10 92.55 Preparing to unpack .../120-libldap-2.5-0_2.5.19+dfsg-0ubuntu0.22.04.1_amd64.deb ...
#10 92.55 Unpacking libldap-2.5-0:amd64 (2.5.19+dfsg-0ubuntu0.22.04.1) ...
#10 92.67 Selecting previously unselected package librtmp1:amd64.
#10 92.67 Preparing to unpack .../121-librtmp1_2.4+20151223.gitfa8646d.1-2build4_amd64.deb ...
#10 92.67 Unpacking librtmp1:amd64 (2.4+20151223.gitfa8646d.1-2build4) ...
#10 92.80 Selecting previously unselected package libssh-4:amd64.
#10 92.81 Preparing to unpack .../122-libssh-4_0.9.6-2ubuntu0.22.04.4_amd64.deb ...
#10 92.81 Unpacking libssh-4:amd64 (0.9.6-2ubuntu0.22.04.4) ...
#10 92.97 Selecting previously unselected package libcurl3-gnutls:amd64.
#10 92.97 Preparing to unpack .../123-libcurl3-gnutls_7.81.0-1ubuntu1.20_amd64.deb ...
#10 92.98 Unpacking libcurl3-gnutls:amd64 (7.81.0-1ubuntu1.20) ...
#10 93.10 Selecting previously unselected package libpciaccess0:amd64.
#10 93.11 Preparing to unpack .../124-libpciaccess0_0.16-3_amd64.deb ...
#10 93.11 Unpacking libpciaccess0:amd64 (0.16-3) ...
#10 93.20 Selecting previously unselected package libxnvctrl0:amd64.
#10 93.20 Preparing to unpack .../125-libxnvctrl0_510.47.03-0ubuntu1_amd64.deb ...
#10 93.20 Unpacking libxnvctrl0:amd64 (510.47.03-0ubuntu1) ...
#10 93.31 Selecting previously unselected package ocl-icd-libopencl1:amd64.
#10 93.32 Preparing to unpack .../126-ocl-icd-libopencl1_2.2.14-3_amd64.deb ...
#10 93.32 Unpacking ocl-icd-libopencl1:amd64 (2.2.14-3) ...
#10 93.53 Selecting previously unselected package libhwloc-plugins:amd64.
#10 93.53 Preparing to unpack .../127-libhwloc-plugins_2.7.0-2ubuntu1_amd64.deb ...
#10 93.54 Unpacking libhwloc-plugins:amd64 (2.7.0-2ubuntu1) ...
#10 93.64 Selecting previously unselected package libpmix2:amd64.
#10 93.64 Preparing to unpack .../128-libpmix2_4.1.2-2ubuntu1_amd64.deb ...
#10 93.65 Unpacking libpmix2:amd64 (4.1.2-2ubuntu1) ...
#10 93.75 Selecting previously unselected package libucx0:amd64.
#10 93.75 Preparing to unpack .../129-libucx0_1.12.1~rc2-1_amd64.deb ...
#10 93.76 Unpacking libucx0:amd64 (1.12.1~rc2-1) ...
#10 93.88 Selecting previously unselected package libopenmpi3:amd64.
#10 93.89 Preparing to unpack .../130-libopenmpi3_4.1.2-2ubuntu1_amd64.deb ...
#10 93.89 Unpacking libopenmpi3:amd64 (4.1.2-2ubuntu1) ...
#10 94.10 Selecting previously unselected package libboost-mpi1.74.0.
#10 94.12 Preparing to unpack .../131-libboost-mpi1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#10 94.12 Unpacking libboost-mpi1.74.0 (1.74.0-14ubuntu3) ...
#10 94.30 Selecting previously unselected package libboost-graph-parallel1.74.0.
#10 94.30 Preparing to unpack .../132-libboost-graph-parallel1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#10 94.30 Unpacking libboost-graph-parallel1.74.0 (1.74.0-14ubuntu3) ...
#10 94.43 Selecting previously unselected package libboost-graph-parallel1.74-dev.
#10 94.43 Preparing to unpack .../133-libboost-graph-parallel1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 94.43 Unpacking libboost-graph-parallel1.74-dev (1.74.0-14ubuntu3) ...
#10 94.56 Selecting previously unselected package libboost-graph-parallel-dev.
#10 94.57 Preparing to unpack .../134-libboost-graph-parallel-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 94.57 Unpacking libboost-graph-parallel-dev (1.74.0.3ubuntu7) ...
#10 94.69 Selecting previously unselected package libboost-iostreams1.74.0:amd64.
#10 94.69 Preparing to unpack .../135-libboost-iostreams1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#10 94.69 Unpacking libboost-iostreams1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 94.80 Selecting previously unselected package libboost-iostreams1.74-dev:amd64.
#10 94.80 Preparing to unpack .../136-libboost-iostreams1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 94.81 Unpacking libboost-iostreams1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 94.98 Selecting previously unselected package libboost-iostreams-dev:amd64.
#10 94.99 Preparing to unpack .../137-libboost-iostreams-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 94.99 Unpacking libboost-iostreams-dev:amd64 (1.74.0.3ubuntu7) ...
#10 95.13 Selecting previously unselected package libboost-locale1.74.0:amd64.
#10 95.14 Preparing to unpack .../138-libboost-locale1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#10 95.14 Unpacking libboost-locale1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 95.27 Selecting previously unselected package libboost-locale1.74-dev:amd64.
#10 95.28 Preparing to unpack .../139-libboost-locale1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 95.29 Unpacking libboost-locale1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 95.42 Selecting previously unselected package libboost-locale-dev:amd64.
#10 95.42 Preparing to unpack .../140-libboost-locale-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 95.42 Unpacking libboost-locale-dev:amd64 (1.74.0.3ubuntu7) ...
#10 95.52 Selecting previously unselected package libboost-log1.74.0.
#10 95.53 Preparing to unpack .../141-libboost-log1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#10 95.53 Unpacking libboost-log1.74.0 (1.74.0-14ubuntu3) ...
#10 95.64 Selecting previously unselected package libboost-log1.74-dev.
#10 95.64 Preparing to unpack .../142-libboost-log1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 95.64 Unpacking libboost-log1.74-dev (1.74.0-14ubuntu3) ...
#10 95.81 Selecting previously unselected package libboost-log-dev.
#10 95.81 Preparing to unpack .../143-libboost-log-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 95.81 Unpacking libboost-log-dev (1.74.0.3ubuntu7) ...
#10 95.93 Selecting previously unselected package libboost-math1.74.0:amd64.
#10 95.93 Preparing to unpack .../144-libboost-math1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#10 95.93 Unpacking libboost-math1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 96.03 Selecting previously unselected package libboost-math1.74-dev:amd64.
#10 96.03 Preparing to unpack .../145-libboost-math1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 96.03 Unpacking libboost-math1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 96.15 Selecting previously unselected package libboost-math-dev:amd64.
#10 96.15 Preparing to unpack .../146-libboost-math-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 96.15 Unpacking libboost-math-dev:amd64 (1.74.0.3ubuntu7) ...
#10 96.25 Selecting previously unselected package openmpi-common.
#10 96.26 Preparing to unpack .../147-openmpi-common_4.1.2-2ubuntu1_all.deb ...
#10 96.26 Unpacking openmpi-common (4.1.2-2ubuntu1) ...
#10 96.38 Selecting previously unselected package libnl-3-dev:amd64.
#10 96.39 Preparing to unpack .../148-libnl-3-dev_3.5.0-0.1_amd64.deb ...
#10 96.39 Unpacking libnl-3-dev:amd64 (3.5.0-0.1) ...
#10 96.49 Selecting previously unselected package libnl-route-3-dev:amd64.
#10 96.49 Preparing to unpack .../149-libnl-route-3-dev_3.5.0-0.1_amd64.deb ...
#10 96.49 Unpacking libnl-route-3-dev:amd64 (3.5.0-0.1) ...
#10 96.59 Selecting previously unselected package libibverbs-dev:amd64.
#10 96.60 Preparing to unpack .../150-libibverbs-dev_39.0-1_amd64.deb ...
#10 96.60 Unpacking libibverbs-dev:amd64 (39.0-1) ...
#10 96.72 Selecting previously unselected package libnuma-dev:amd64.
#10 96.72 Preparing to unpack .../151-libnuma-dev_2.0.14-3ubuntu2_amd64.deb ...
#10 96.72 Unpacking libnuma-dev:amd64 (2.0.14-3ubuntu2) ...
#10 96.83 Selecting previously unselected package libltdl7:amd64.
#10 ...

#11 [build 2/6] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&         apt-get install -y --no-install-recommends             build-essential cmake git pkg-config             libboost-all-dev libssl-dev libpthread-stubs0-dev libc6-dev libminiupnpc-dev &&         rm -rf /var/lib/apt/lists/*
#11 86.77 Get:72 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libgcc-11-dev amd64 11.4.0-1ubuntu1~22.04.2 [2517 kB]
#11 87.67 Get:73 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 gcc-11 amd64 11.4.0-1ubuntu1~22.04.2 [20.1 MB]
#11 92.83 Get:74 http://archive.ubuntu.com/ubuntu jammy/main amd64 gcc amd64 4:11.2.0-1ubuntu1 [5112 B]
#11 92.83 Get:75 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libstdc++-11-dev amd64 11.4.0-1ubuntu1~22.04.2 [2101 kB]
#11 93.39 Get:76 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 g++-11 amd64 11.4.0-1ubuntu1~22.04.2 [11.4 MB]
#11 96.76 Get:77 http://archive.ubuntu.com/ubuntu jammy/main amd64 g++ amd64 4:11.2.0-1ubuntu1 [1412 B]
#11 96.76 Get:78 http://archive.ubuntu.com/ubuntu jammy/main amd64 make amd64 4.3-4.1build1 [180 kB]
#11 96.96 Get:79 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libdpkg-perl all 1.21.1ubuntu2.3 [237 kB]
#11 ...

#10 [stage-1 2/4] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&             apt-get install -y --no-install-recommends                 libboost-all-dev libc6 procps miniupnpc &&         rm -rf /var/lib/apt/lists/*
#10 96.84 Preparing to unpack .../152-libltdl7_2.4.6-15build2_amd64.deb ...
#10 96.84 Unpacking libltdl7:amd64 (2.4.6-15build2) ...
#10 96.93 Selecting previously unselected package libltdl-dev:amd64.
#10 96.93 Preparing to unpack .../153-libltdl-dev_2.4.6-15build2_amd64.deb ...
#10 96.93 Unpacking libltdl-dev:amd64 (2.4.6-15build2) ...
#10 97.04 Selecting previously unselected package libhwloc-dev:amd64.
#10 97.04 Preparing to unpack .../154-libhwloc-dev_2.7.0-2ubuntu1_amd64.deb ...
#10 97.04 Unpacking libhwloc-dev:amd64 (2.7.0-2ubuntu1) ...
#10 97.15 Selecting previously unselected package libevent-2.1-7:amd64.
#10 97.15 Preparing to unpack .../155-libevent-2.1-7_2.1.12-stable-1build3_amd64.deb ...
#10 97.15 Unpacking libevent-2.1-7:amd64 (2.1.12-stable-1build3) ...
#10 97.25 Selecting previously unselected package libevent-extra-2.1-7:amd64.
#10 97.25 Preparing to unpack .../156-libevent-extra-2.1-7_2.1.12-stable-1build3_amd64.deb ...
#10 97.25 Unpacking libevent-extra-2.1-7:amd64 (2.1.12-stable-1build3) ...
#10 97.35 Selecting previously unselected package libevent-openssl-2.1-7:amd64.
#10 97.35 Preparing to unpack .../157-libevent-openssl-2.1-7_2.1.12-stable-1build3_amd64.deb ...
#10 97.36 Unpacking libevent-openssl-2.1-7:amd64 (2.1.12-stable-1build3) ...
#10 97.45 Selecting previously unselected package libevent-dev.
#10 97.45 Preparing to unpack .../158-libevent-dev_2.1.12-stable-1build3_amd64.deb ...
#10 97.45 Unpacking libevent-dev (2.1.12-stable-1build3) ...
#10 97.55 Selecting previously unselected package zlib1g-dev:amd64.
#10 97.55 Preparing to unpack .../159-zlib1g-dev_1%3a1.2.11.dfsg-2ubuntu9.2_amd64.deb ...
#10 97.56 Unpacking zlib1g-dev:amd64 (1:1.2.11.dfsg-2ubuntu9.2) ...
#10 97.65 Selecting previously unselected package libpmix-dev:amd64.
#10 97.65 Preparing to unpack .../160-libpmix-dev_4.1.2-2ubuntu1_amd64.deb ...
#10 97.65 Unpacking libpmix-dev:amd64 (4.1.2-2ubuntu1) ...
#10 97.76 Selecting previously unselected package libjs-jquery.
#10 97.76 Preparing to unpack .../161-libjs-jquery_3.6.0+dfsg+~3.5.13-1_all.deb ...
#10 97.84 Unpacking libjs-jquery (3.6.0+dfsg+~3.5.13-1) ...
#10 97.94 Selecting previously unselected package libjs-jquery-ui.
#10 97.94 Preparing to unpack .../162-libjs-jquery-ui_1.13.1+dfsg-1_all.deb ...
#10 97.95 Unpacking libjs-jquery-ui (1.13.1+dfsg-1) ...
#10 98.09 Selecting previously unselected package openmpi-bin.
#10 98.09 Preparing to unpack .../163-openmpi-bin_4.1.2-2ubuntu1_amd64.deb ...
#10 98.09 Unpacking openmpi-bin (4.1.2-2ubuntu1) ...
#10 98.19 Selecting previously unselected package libopenmpi-dev:amd64.
#10 98.19 Preparing to unpack .../164-libopenmpi-dev_4.1.2-2ubuntu1_amd64.deb ...
#10 98.31 Unpacking libopenmpi-dev:amd64 (4.1.2-2ubuntu1) ...
#10 98.58 Selecting previously unselected package mpi-default-dev.
#10 98.58 Preparing to unpack .../165-mpi-default-dev_1.14_amd64.deb ...
#10 98.58 Unpacking mpi-default-dev (1.14) ...
#10 98.68 Selecting previously unselected package libboost-mpi1.74-dev.
#10 98.68 Preparing to unpack .../166-libboost-mpi1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 98.68 Unpacking libboost-mpi1.74-dev (1.74.0-14ubuntu3) ...
#10 98.86 Selecting previously unselected package libboost-mpi-dev.
#10 98.86 Preparing to unpack .../167-libboost-mpi-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 98.97 Unpacking libboost-mpi-dev (1.74.0.3ubuntu7) ...
#10 99.07 Selecting previously unselected package libboost-python1.74.0.
#10 99.08 Preparing to unpack .../168-libboost-python1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#10 99.08 Unpacking libboost-python1.74.0 (1.74.0-14ubuntu3) ...
#10 99.21 Selecting previously unselected package mpi-default-bin.
#10 99.22 Preparing to unpack .../169-mpi-default-bin_1.14_amd64.deb ...
#10 99.22 Unpacking mpi-default-bin (1.14) ...
#10 99.35 Selecting previously unselected package libboost-mpi-python1.74.0.
#10 99.36 Preparing to unpack .../170-libboost-mpi-python1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#10 99.36 Unpacking libboost-mpi-python1.74.0 (1.74.0-14ubuntu3) ...
#10 99.49 Selecting previously unselected package libboost-mpi-python1.74-dev.
#10 99.49 Preparing to unpack .../171-libboost-mpi-python1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 99.50 Unpacking libboost-mpi-python1.74-dev (1.74.0-14ubuntu3) ...
#10 99.63 Selecting previously unselected package libboost-mpi-python-dev.
#10 99.63 Preparing to unpack .../172-libboost-mpi-python-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 99.63 Unpacking libboost-mpi-python-dev (1.74.0.3ubuntu7) ...
#10 99.73 Selecting previously unselected package libboost-numpy1.74.0.
#10 99.74 Preparing to unpack .../173-libboost-numpy1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#10 99.74 Unpacking libboost-numpy1.74.0 (1.74.0-14ubuntu3) ...
#10 99.85 Selecting previously unselected package libboost-numpy1.74-dev.
#10 99.85 Preparing to unpack .../174-libboost-numpy1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 99.85 Unpacking libboost-numpy1.74-dev (1.74.0-14ubuntu3) ...
#10 99.95 Selecting previously unselected package libboost-numpy-dev.
#10 99.96 Preparing to unpack .../175-libboost-numpy-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 99.96 Unpacking libboost-numpy-dev (1.74.0.3ubuntu7) ...
#10 100.1 Selecting previously unselected package libboost-program-options1.74.0:amd64.
#10 100.1 Preparing to unpack .../176-libboost-program-options1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#10 100.1 Unpacking libboost-program-options1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 100.2 Selecting previously unselected package libboost-program-options1.74-dev:amd64.
#10 100.2 Preparing to unpack .../177-libboost-program-options1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 100.2 Unpacking libboost-program-options1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 100.3 Selecting previously unselected package libboost-program-options-dev:amd64.
#10 100.3 Preparing to unpack .../178-libboost-program-options-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 100.3 Unpacking libboost-program-options-dev:amd64 (1.74.0.3ubuntu7) ...
#10 100.4 Selecting previously unselected package libpython3.10:amd64.
#10 100.4 Preparing to unpack .../179-libpython3.10_3.10.12-1~22.04.11_amd64.deb ...
#10 100.4 Unpacking libpython3.10:amd64 (3.10.12-1~22.04.11) ...
#10 100.5 Selecting previously unselected package libexpat1-dev:amd64.
#10 100.5 Preparing to unpack .../180-libexpat1-dev_2.4.7-1ubuntu0.6_amd64.deb ...
#10 100.5 Unpacking libexpat1-dev:amd64 (2.4.7-1ubuntu0.6) ...
#10 100.6 Selecting previously unselected package libpython3.10-dev:amd64.
#10 100.6 Preparing to unpack .../181-libpython3.10-dev_3.10.12-1~22.04.11_amd64.deb ...
#10 100.6 Unpacking libpython3.10-dev:amd64 (3.10.12-1~22.04.11) ...
#10 100.8 Selecting previously unselected package libpython3-dev:amd64.
#10 100.8 Preparing to unpack .../182-libpython3-dev_3.10.6-1~22.04.1_amd64.deb ...
#10 100.8 Unpacking libpython3-dev:amd64 (3.10.6-1~22.04.1) ...
#10 100.9 Selecting previously unselected package python3.10-dev.
#10 100.9 Preparing to unpack .../183-python3.10-dev_3.10.12-1~22.04.11_amd64.deb ...
#10 100.9 Unpacking python3.10-dev (3.10.12-1~22.04.11) ...
#10 101.0 Selecting previously unselected package python3-lib2to3.
#10 101.0 Preparing to unpack .../184-python3-lib2to3_3.10.8-1~22.04_all.deb ...
#10 101.0 Unpacking python3-lib2to3 (3.10.8-1~22.04) ...
#10 101.2 Selecting previously unselected package python3-distutils.
#10 101.2 Preparing to unpack .../185-python3-distutils_3.10.8-1~22.04_all.deb ...
#10 101.2 Unpacking python3-distutils (3.10.8-1~22.04) ...
#10 101.3 Selecting previously unselected package libjs-underscore.
#10 101.3 Preparing to unpack .../186-libjs-underscore_1.13.2~dfsg-2_all.deb ...
#10 101.3 Unpacking libjs-underscore (1.13.2~dfsg-2) ...
#10 101.5 Selecting previously unselected package libjs-sphinxdoc.
#10 101.5 Preparing to unpack .../187-libjs-sphinxdoc_4.3.2-1_all.deb ...
#10 101.5 Unpacking libjs-sphinxdoc (4.3.2-1) ...
#10 101.6 Selecting previously unselected package python3-dev.
#10 101.6 Preparing to unpack .../188-python3-dev_3.10.6-1~22.04.1_amd64.deb ...
#10 101.6 Unpacking python3-dev (3.10.6-1~22.04.1) ...
#10 101.7 Selecting previously unselected package libboost-python1.74-dev.
#10 101.7 Preparing to unpack .../189-libboost-python1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 101.7 Unpacking libboost-python1.74-dev (1.74.0-14ubuntu3) ...
#10 101.8 Selecting previously unselected package libboost-python-dev.
#10 101.8 Preparing to unpack .../190-libboost-python-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 101.8 Unpacking libboost-python-dev (1.74.0.3ubuntu7) ...
#10 101.9 Selecting previously unselected package libboost-random1.74.0:amd64.
#10 101.9 Preparing to unpack .../191-libboost-random1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#10 101.9 Unpacking libboost-random1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 102.0 Selecting previously unselected package libboost-random1.74-dev:amd64.
#10 102.0 Preparing to unpack .../192-libboost-random1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 102.0 Unpacking libboost-random1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 102.1 Selecting previously unselected package libboost-random-dev:amd64.
#10 102.1 Preparing to unpack .../193-libboost-random-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 102.1 Unpacking libboost-random-dev:amd64 (1.74.0.3ubuntu7) ...
#10 102.2 Selecting previously unselected package libboost-regex-dev:amd64.
#10 102.2 Preparing to unpack .../194-libboost-regex-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 102.2 Unpacking libboost-regex-dev:amd64 (1.74.0.3ubuntu7) ...
#10 102.3 Selecting previously unselected package libboost-serialization-dev:amd64.
#10 102.3 Preparing to unpack .../195-libboost-serialization-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 102.3 Unpacking libboost-serialization-dev:amd64 (1.74.0.3ubuntu7) ...
#10 102.4 Selecting previously unselected package libboost-stacktrace1.74.0:amd64.
#10 102.4 Preparing to unpack .../196-libboost-stacktrace1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#10 102.4 Unpacking libboost-stacktrace1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 102.5 Selecting previously unselected package libboost-stacktrace1.74-dev:amd64.
#10 102.5 Preparing to unpack .../197-libboost-stacktrace1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 102.5 Unpacking libboost-stacktrace1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 102.6 Selecting previously unselected package libboost-stacktrace-dev:amd64.
#10 102.6 Preparing to unpack .../198-libboost-stacktrace-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 102.6 Unpacking libboost-stacktrace-dev:amd64 (1.74.0.3ubuntu7) ...
#10 102.7 Selecting previously unselected package libboost-system-dev:amd64.
#10 102.7 Preparing to unpack .../199-libboost-system-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 102.7 Unpacking libboost-system-dev:amd64 (1.74.0.3ubuntu7) ...
#10 102.8 Selecting previously unselected package libboost-test-dev:amd64.
#10 102.8 Preparing to unpack .../200-libboost-test-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 102.8 Unpacking libboost-test-dev:amd64 (1.74.0.3ubuntu7) ...
#10 102.9 Selecting previously unselected package libboost-thread-dev:amd64.
#10 102.9 Preparing to unpack .../201-libboost-thread-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 102.9 Unpacking libboost-thread-dev:amd64 (1.74.0.3ubuntu7) ...
#10 103.0 Selecting previously unselected package libboost-timer1.74.0:amd64.
#10 103.0 Preparing to unpack .../202-libboost-timer1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#10 103.0 Unpacking libboost-timer1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 103.1 Selecting previously unselected package libboost-timer1.74-dev:amd64.
#10 103.1 Preparing to unpack .../203-libboost-timer1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 103.1 Unpacking libboost-timer1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 103.2 Selecting previously unselected package libboost-timer-dev:amd64.
#10 103.2 Preparing to unpack .../204-libboost-timer-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 103.2 Unpacking libboost-timer-dev:amd64 (1.74.0.3ubuntu7) ...
#10 103.3 Selecting previously unselected package libboost-type-erasure1.74.0:amd64.
#10 103.4 Preparing to unpack .../205-libboost-type-erasure1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#10 103.4 Unpacking libboost-type-erasure1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 103.5 Selecting previously unselected package libboost-type-erasure1.74-dev:amd64.
#10 103.5 Preparing to unpack .../206-libboost-type-erasure1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 103.5 Unpacking libboost-type-erasure1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 103.6 Selecting previously unselected package libboost-type-erasure-dev:amd64.
#10 103.6 Preparing to unpack .../207-libboost-type-erasure-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 103.6 Unpacking libboost-type-erasure-dev:amd64 (1.74.0.3ubuntu7) ...
#10 103.7 Selecting previously unselected package libboost-wave1.74.0:amd64.
#10 103.7 Preparing to unpack .../208-libboost-wave1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#10 103.7 Unpacking libboost-wave1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 103.8 Selecting previously unselected package libboost-wave1.74-dev:amd64.
#10 103.8 Preparing to unpack .../209-libboost-wave1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 103.8 Unpacking libboost-wave1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 104.0 Selecting previously unselected package libboost-wave-dev:amd64.
#10 104.0 Preparing to unpack .../210-libboost-wave-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 104.0 Unpacking libboost-wave-dev:amd64 (1.74.0.3ubuntu7) ...
#10 104.1 Selecting previously unselected package libboost-nowide1.74.0.
#10 104.1 Preparing to unpack .../211-libboost-nowide1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#10 104.1 Unpacking libboost-nowide1.74.0 (1.74.0-14ubuntu3) ...
#10 104.2 Selecting previously unselected package libboost-nowide1.74-dev.
#10 104.2 Preparing to unpack .../212-libboost-nowide1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#10 104.2 Unpacking libboost-nowide1.74-dev (1.74.0-14ubuntu3) ...
#10 104.3 Selecting previously unselected package libboost-nowide-dev.
#10 104.3 Preparing to unpack .../213-libboost-nowide-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 104.3 Unpacking libboost-nowide-dev (1.74.0.3ubuntu7) ...
#10 104.4 Selecting previously unselected package libboost-all-dev.
#10 104.4 Preparing to unpack .../214-libboost-all-dev_1.74.0.3ubuntu7_amd64.deb ...
#10 104.4 Unpacking libboost-all-dev (1.74.0.3ubuntu7) ...
#10 104.5 Selecting previously unselected package libminiupnpc17:amd64.
#10 104.5 Preparing to unpack .../215-libminiupnpc17_2.2.3-1build1_amd64.deb ...
#10 104.5 Unpacking libminiupnpc17:amd64 (2.2.3-1build1) ...
#10 104.6 Selecting previously unselected package miniupnpc.
#10 104.6 Preparing to unpack .../216-miniupnpc_2.2.3-1build1_amd64.deb ...
#10 104.6 Unpacking miniupnpc (2.2.3-1build1) ...
#10 104.7 Setting up libboost-chrono1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 104.7 Setting up media-types (7.0.0) ...
#10 104.7 Setting up libboost-system1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 104.7 Setting up gcc-11-base:amd64 (11.4.0-1ubuntu1~22.04.2) ...
#10 104.7 Setting up libpciaccess0:amd64 (0.16-3) ...
#10 104.8 Setting up libxau6:amd64 (1:1.0.9-1build5) ...
#10 104.8 Setting up libpsl5:amd64 (0.21.0-1.2build2) ...
#10 104.8 Setting up libboost-atomic1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 104.8 Setting up libboost-iostreams1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 104.8 Setting up libboost-program-options1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 104.8 Setting up libcbor0.8:amd64 (0.8.0-2ubuntu1) ...
#10 104.8 Setting up libbrotli1:amd64 (1.0.9-2build6) ...
#10 104.8 Setting up libsqlite3-0:amd64 (3.37.2-2ubuntu0.5) ...
#10 104.8 Setting up binutils-common:amd64 (2.38-4ubuntu2.8) ...
#10 104.8 Setting up libboost-stacktrace1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 104.8 Setting up libnghttp2-14:amd64 (1.43.0-1ubuntu0.2) ...
#10 104.8 Setting up linux-libc-dev:amd64 (5.15.0-153.163) ...
#10 104.8 Setting up libctf-nobfd0:amd64 (2.38-4ubuntu2.8) ...
#10 104.8 Setting up libboost-nowide1.74.0 (1.74.0-14ubuntu3) ...
#10 104.8 Setting up libboost-filesystem1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 104.8 Setting up libgomp1:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#10 104.8 Setting up perl-modules-5.34 (5.34.0-3ubuntu1.5) ...
#10 104.8 Setting up libminiupnpc17:amd64 (2.2.3-1build1) ...
#10 104.8 Setting up libasan6:amd64 (11.4.0-1ubuntu1~22.04.2) ...
#10 104.8 Setting up libsasl2-modules-db:amd64 (2.1.27+dfsg2-3ubuntu1.2) ...
#10 104.8 Setting up autotools-dev (20220109.1) ...
#10 104.8 Setting up libtirpc-dev:amd64 (1.3.2-2ubuntu0.1) ...
#10 104.8 Setting up rpcsvc-proto (1.4.2-0ubuntu6) ...
#10 104.8 Setting up libboost-test1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 104.8 Setting up libx11-data (2:1.7.5-1ubuntu0.3) ...
#10 104.8 Setting up libmpfr6:amd64 (4.1.0-3build3) ...
#10 104.8 Setting up librtmp1:amd64 (2.4+20151223.gitfa8646d.1-2build4) ...
#10 104.8 Setting up libsigsegv2:amd64 (2.13-1ubuntu3) ...
#10 104.8 Setting up libboost-nowide1.74-dev (1.74.0-14ubuntu3) ...
#10 104.8 Setting up libquadmath0:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#10 104.8 Setting up libhwloc15:amd64 (2.7.0-2ubuntu1) ...
#10 104.9 Setting up libmpc3:amd64 (1.2.1-2build1) ...
#10 104.9 Setting up libevent-core-2.1-7:amd64 (2.1.12-stable-1build3) ...
#10 104.9 Setting up libatomic1:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#10 104.9 Setting up libboost-context1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 104.9 Setting up libevent-2.1-7:amd64 (2.1.12-stable-1build3) ...
#10 104.9 Setting up libboost-random1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 104.9 Setting up libboost1.74-tools-dev (1.74.0-14ubuntu3) ...
#10 104.9 Setting up libltdl7:amd64 (2.4.6-15build2) ...
#10 104.9 Setting up libsasl2-2:amd64 (2.1.27+dfsg2-3ubuntu1.2) ...
#10 104.9 Setting up libssh-4:amd64 (0.9.6-2ubuntu0.22.04.4) ...
#10 104.9 Setting up libgfortran5:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#10 104.9 Setting up libboost-math1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 104.9 Setting up libubsan1:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#10 104.9 Setting up libboost-serialization1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 104.9 Setting up libnuma1:amd64 (2.0.14-3ubuntu2) ...
#10 104.9 Setting up libmd0:amd64 (1.0.4-1build1) ...
#10 104.9 Setting up libboost-container1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 104.9 Setting up libnsl-dev:amd64 (1.3.0-2build2) ...
#10 104.9 Setting up ocl-icd-libopencl1:amd64 (2.2.14-3) ...
#10 104.9 Setting up libcrypt-dev:amd64 (1:4.4.27-1) ...
#10 104.9 Setting up libnl-3-200:amd64 (3.5.0-0.1) ...
#10 104.9 Setting up libmpdec3:amd64 (2.5.1-2build2) ...
#10 104.9 Setting up libpsm2-2 (11.2.185-1) ...
#10 104.9 Setting up openmpi-common (4.1.2-2ubuntu1) ...
#10 104.9 Setting up libpsm-infinipath1 (3.3+20.604758e7-6.1) ...
#10 105.0 update-alternatives: using /usr/lib/libpsm1/libpsm_infinipath.so.1.16 to provide /usr/lib/x86_64-linux-gnu/libpsm_infinipath.so.1 (libpsm_infinipath.so.1) in auto mode
#10 105.0 Setting up libjs-jquery (3.6.0+dfsg+~3.5.13-1) ...
#10 105.1 Setting up libboost-date-time1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 105.1 Setting up libbinutils:amd64 (2.38-4ubuntu2.8) ...
#10 105.1 Setting up libfido2-1:amd64 (1.10.0-1) ...
#10 105.1 Setting up libboost-python1.74.0 (1.74.0-14ubuntu3) ...
#10 105.1 Setting up libisl23:amd64 (0.24-2build1) ...
#10 105.1 Setting up libboost-fiber1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 105.1 Setting up libc-dev-bin (2.35-0ubuntu3.10) ...
#10 105.1 Setting up libbsd0:amd64 (0.11.5-1) ...
#10 105.1 Setting up readline-common (8.1.2-1) ...
#10 105.1 Setting up libboost-timer1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 105.1 Setting up miniupnpc (2.2.3-1build1) ...
#10 105.1 Setting up libcc1-0:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#10 105.1 Setting up liblsan0:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#10 105.1 Setting up libitm1:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#10 105.1 Setting up libgdbm6:amd64 (1.23-1) ...
#10 105.1 Setting up libjs-underscore (1.13.2~dfsg-2) ...
#10 105.2 Setting up libboost-thread1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 105.2 Setting up libicu70:amd64 (70.1-2) ...
#10 105.2 Setting up libboost-numpy1.74.0 (1.74.0-14ubuntu3) ...
#10 105.2 Setting up libevent-pthreads-2.1-7:amd64 (2.1.12-stable-1build3) ...
#10 105.2 Setting up libtsan0:amd64 (11.4.0-1ubuntu1~22.04.2) ...
#10 105.2 Setting up libctf0:amd64 (2.38-4ubuntu2.8) ...
#10 105.2 Setting up cpp-11 (11.4.0-1ubuntu1~22.04.2) ...
#10 105.2 Setting up libxdmcp6:amd64 (1:1.1.3-0ubuntu5) ...
#10 105.2 Setting up libevent-extra-2.1-7:amd64 (2.1.12-stable-1build3) ...
#10 105.2 Setting up libxcb1:amd64 (1.14-3ubuntu3) ...
#10 105.2 Setting up libboost-coroutine1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 105.2 Setting up libedit2:amd64 (3.1-20210910-1build1) ...
#10 105.2 Setting up libreadline8:amd64 (8.1.2-1) ...
#10 105.2 Setting up libevent-openssl-2.1-7:amd64 (2.1.12-stable-1build3) ...
#10 105.2 Setting up m4 (1.4.18-5ubuntu2) ...
#10 105.2 Setting up libboost-tools-dev (1.74.0.3ubuntu7) ...
#10 105.2 Setting up libboost-nowide-dev (1.74.0.3ubuntu7) ...
#10 105.2 Setting up libldap-2.5-0:amd64 (2.5.19+dfsg-0ubuntu0.22.04.1) ...
#10 105.2 Setting up libnl-route-3-200:amd64 (3.5.0-0.1) ...
#10 105.2 Setting up libpython3.10-stdlib:amd64 (3.10.12-1~22.04.11) ...
#10 105.2 Setting up libjs-jquery-ui (1.13.1+dfsg-1) ...
#10 105.2 Setting up libboost-regex1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 105.2 Setting up libevent-dev (2.1.12-stable-1build3) ...
#10 105.3 Setting up libboost-numpy1.74-dev (1.74.0-14ubuntu3) ...
#10 105.3 Setting up libboost-graph1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 105.3 Setting up icu-devtools (70.1-2) ...
#10 105.3 Setting up libgdbm-compat4:amd64 (1.23-1) ...
#10 105.3 Setting up libjs-sphinxdoc (4.3.2-1) ...
#10 105.3 Setting up libboost-wave1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 105.3 Setting up libgcc-11-dev:amd64 (11.4.0-1ubuntu1~22.04.2) ...
#10 105.3 Setting up libnl-3-dev:amd64 (3.5.0-0.1) ...
#10 105.3 Setting up libc6-dev:amd64 (2.35-0ubuntu3.10) ...
#10 105.3 Setting up libx11-6:amd64 (2:1.7.5-1ubuntu0.3) ...
#10 105.3 Setting up libboost-locale1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 105.3 Setting up libicu-dev:amd64 (70.1-2) ...
#10 105.3 Setting up libxml2:amd64 (2.9.13+dfsg-1ubuntu0.9) ...
#10 105.3 Setting up libboost-type-erasure1.74.0:amd64 (1.74.0-14ubuntu3) ...
#10 105.3 Setting up libpython3-stdlib:amd64 (3.10.6-1~22.04.1) ...
#10 105.3 Setting up binutils-x86-64-linux-gnu (2.38-4ubuntu2.8) ...
#10 105.3 Setting up libboost-log1.74.0 (1.74.0-14ubuntu3) ...
#10 105.3 Setting up libpython3.10:amd64 (3.10.12-1~22.04.11) ...
#10 105.3 Setting up libibverbs1:amd64 (39.0-1) ...
#10 105.5 Setting up libperl5.34:amd64 (5.34.0-3ubuntu1.5) ...
#10 105.5 Setting up python3.10 (3.10.12-1~22.04.11) ...
#10 106.4 Setting up ibverbs-providers:amd64 (39.0-1) ...
#10 106.6 Setting up libgfortran-11-dev:amd64 (11.4.0-1ubuntu1~22.04.2) ...
#10 106.6 Setting up openssh-client (1:8.9p1-3ubuntu0.13) ...
#10 107.0 update-alternatives: using /usr/bin/ssh to provide /usr/bin/rsh (rsh) in auto mode
#10 107.0 update-alternatives: warning: skip creation of /usr/share/man/man1/rsh.1.gz because associated file /usr/share/man/man1/ssh.1.gz (of link group rsh) doesn't exist
#10 107.0 update-alternatives: using /usr/bin/slogin to provide /usr/bin/rlogin (rlogin) in auto mode
#10 107.0 update-alternatives: warning: skip creation of /usr/share/man/man1/rlogin.1.gz because associated file /usr/share/man/man1/slogin.1.gz (of link group rlogin) doesn't exist
#10 107.0 update-alternatives: using /usr/bin/scp to provide /usr/bin/rcp (rcp) in auto mode
#10 107.0 update-alternatives: warning: skip creation of /usr/share/man/man1/rcp.1.gz because associated file /usr/share/man/man1/scp.1.gz (of link group rcp) doesn't exist
#10 107.1 Setting up libxext6:amd64 (2:1.3.4-1build1) ...
#10 107.1 Setting up libcurl3-gnutls:amd64 (7.81.0-1ubuntu1.20) ...
#10 ...

#11 [build 2/6] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&         apt-get install -y --no-install-recommends             build-essential cmake git pkg-config             libboost-all-dev libssl-dev libpthread-stubs0-dev libc6-dev libminiupnpc-dev &&         rm -rf /var/lib/apt/lists/*
#11 96.96 Get:80 http://archive.ubuntu.com/ubuntu jammy/main amd64 bzip2 amd64 1.0.8-5build1 [34.8 kB]
#11 96.96 Get:81 http://archive.ubuntu.com/ubuntu jammy/main amd64 patch amd64 2.7.6-7build2 [109 kB]
#11 96.98 Get:82 http://archive.ubuntu.com/ubuntu jammy/main amd64 lto-disabled-list all 24 [12.5 kB]
#11 96.98 Get:83 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 dpkg-dev all 1.21.1ubuntu2.3 [922 kB]
#11 97.04 Get:84 http://archive.ubuntu.com/ubuntu jammy/main amd64 build-essential amd64 12.9ubuntu3 [4744 B]
#11 97.04 Get:85 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libarchive13 amd64 3.6.0-1ubuntu1.5 [368 kB]
#11 97.10 Get:86 http://archive.ubuntu.com/ubuntu jammy/main amd64 libbrotli1 amd64 1.0.9-2build6 [315 kB]
#11 97.15 Get:87 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libsasl2-modules-db amd64 2.1.27+dfsg2-3ubuntu1.2 [20.5 kB]
#11 97.15 Get:88 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libsasl2-2 amd64 2.1.27+dfsg2-3ubuntu1.2 [53.8 kB]
#11 97.98 Get:89 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libldap-2.5-0 amd64 2.5.19+dfsg-0ubuntu0.22.04.1 [184 kB]
#11 97.98 Get:90 http://archive.ubuntu.com/ubuntu jammy/main amd64 librtmp1 amd64 2.4+20151223.gitfa8646d.1-2build4 [58.2 kB]
#11 97.98 Get:91 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libssh-4 amd64 0.9.6-2ubuntu0.22.04.4 [187 kB]
#11 97.99 Get:92 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libcurl4 amd64 7.81.0-1ubuntu1.20 [289 kB]
#11 97.99 Get:93 http://archive.ubuntu.com/ubuntu jammy/main amd64 libjsoncpp25 amd64 1.9.5-3 [80.0 kB]
#11 97.99 Get:94 http://archive.ubuntu.com/ubuntu jammy/main amd64 librhash0 amd64 1.4.2-1ubuntu1 [125 kB]
#11 97.99 Get:95 http://archive.ubuntu.com/ubuntu jammy/main amd64 dh-elpa-helper all 2.0.9ubuntu1 [7610 B]
#11 97.99 Get:96 http://archive.ubuntu.com/ubuntu jammy/main amd64 emacsen-common all 3.0.4 [14.9 kB]
#11 98.00 Get:97 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 cmake-data all 3.22.1-1ubuntu1.22.04.2 [1913 kB]
#11 98.34 Get:98 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 cmake amd64 3.22.1-1ubuntu1.22.04.2 [5010 kB]
#11 99.55 Get:99 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libgfortran5 amd64 12.3.0-1ubuntu1~22.04.2 [879 kB]
#11 100.0 Get:100 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libgfortran-11-dev amd64 11.4.0-1ubuntu1~22.04.2 [842 kB]
#11 100.7 Get:101 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 gfortran-11 amd64 11.4.0-1ubuntu1~22.04.2 [11.2 MB]
#11 104.0 Get:102 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libcurl3-gnutls amd64 7.81.0-1ubuntu1.20 [284 kB]
#11 104.5 Get:103 http://archive.ubuntu.com/ubuntu jammy/main amd64 liberror-perl all 0.17029-1 [26.5 kB]
#11 104.5 Get:104 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 git-man all 1:2.34.1-1ubuntu1.15 [955 kB]
#11 104.9 Get:105 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 git amd64 1:2.34.1-1ubuntu1.15 [3166 kB]
#11 106.1 Get:106 http://archive.ubuntu.com/ubuntu jammy/main amd64 libnl-3-200 amd64 3.5.0-0.1 [59.1 kB]
#11 106.1 Get:107 http://archive.ubuntu.com/ubuntu jammy/main amd64 libnl-route-3-200 amd64 3.5.0-0.1 [180 kB]
#11 106.2 Get:108 http://archive.ubuntu.com/ubuntu jammy/main amd64 libibverbs1 amd64 39.0-1 [69.3 kB]
#11 106.2 Get:109 http://archive.ubuntu.com/ubuntu jammy/main amd64 ibverbs-providers amd64 39.0-1 [341 kB]
#11 106.3 Get:110 http://archive.ubuntu.com/ubuntu jammy/main amd64 icu-devtools amd64 70.1-2 [197 kB]
#11 106.3 Get:111 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost1.74-dev amd64 1.74.0-14ubuntu3 [9609 kB]
#11 ...

#10 [stage-1 2/4] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&             apt-get install -y --no-install-recommends                 libboost-all-dev libc6 procps miniupnpc &&         rm -rf /var/lib/apt/lists/*
#10 107.1 Setting up python3 (3.10.6-1~22.04.1) ...
#10 107.5 Setting up binutils (2.38-4ubuntu2.8) ...
#10 107.5 Setting up libnuma-dev:amd64 (2.0.14-3ubuntu2) ...
#10 107.5 Setting up libxnvctrl0:amd64 (510.47.03-0ubuntu1) ...
#10 107.5 Setting up libnl-route-3-dev:amd64 (3.5.0-0.1) ...
#10 107.5 Setting up perl (5.34.0-3ubuntu1.5) ...
#10 107.6 Setting up libexpat1-dev:amd64 (2.4.7-1ubuntu0.6) ...
#10 107.6 Setting up libboost-numpy-dev (1.74.0.3ubuntu7) ...
#10 107.6 Setting up autoconf (2.71-2) ...
#10 107.6 Setting up libstdc++-11-dev:amd64 (11.4.0-1ubuntu1~22.04.2) ...
#10 107.6 Setting up zlib1g-dev:amd64 (1:1.2.11.dfsg-2ubuntu9.2) ...
#10 107.6 Setting up gcc-11 (11.4.0-1ubuntu1~22.04.2) ...
#10 107.6 Setting up python3-lib2to3 (3.10.8-1~22.04) ...
#10 108.0 Setting up automake (1:1.16.5-1.3) ...
#10 108.1 update-alternatives: using /usr/bin/automake-1.16 to provide /usr/bin/automake (automake) in auto mode
#10 108.1 update-alternatives: warning: skip creation of /usr/share/man/man1/automake.1.gz because associated file /usr/share/man/man1/automake-1.16.1.gz (of link group automake) doesn't exist
#10 108.1 update-alternatives: warning: skip creation of /usr/share/man/man1/aclocal.1.gz because associated file /usr/share/man/man1/aclocal-1.16.1.gz (of link group automake) doesn't exist
#10 108.1 Setting up python3-distutils (3.10.8-1~22.04) ...
#10 108.4 Setting up librdmacm1:amd64 (39.0-1) ...
#10 108.4 Setting up libucx0:amd64 (1.12.1~rc2-1) ...
#10 108.4 Setting up libboost1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 108.4 Setting up libboost-container1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 108.4 Setting up libboost-chrono1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 108.4 Setting up libboost-exception1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 108.4 Setting up libboost-exception-dev:amd64 (1.74.0.3ubuntu7) ...
#10 108.4 Setting up libibverbs-dev:amd64 (39.0-1) ...
#10 108.4 Setting up libhwloc-plugins:amd64 (2.7.0-2ubuntu1) ...
#10 108.4 Setting up libboost-container-dev:amd64 (1.74.0.3ubuntu7) ...
#10 108.4 Setting up libboost-program-options1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 108.4 Setting up libltdl-dev:amd64 (2.4.6-15build2) ...
#10 108.4 Setting up libboost-program-options-dev:amd64 (1.74.0.3ubuntu7) ...
#10 108.4 Setting up libboost-system1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 108.4 Setting up libboost-random1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 108.4 Setting up libboost-timer1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 108.4 Setting up libpython3.10-dev:amd64 (3.10.12-1~22.04.11) ...
#10 108.4 Setting up gfortran-11 (11.4.0-1ubuntu1~22.04.2) ...
#10 108.4 Setting up libboost-serialization1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 108.4 Setting up libboost-atomic1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 108.4 Setting up libboost-atomic-dev:amd64 (1.74.0.3ubuntu7) ...
#10 108.4 Setting up python3.10-dev (3.10.12-1~22.04.11) ...
#10 108.4 Setting up libboost-regex1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 108.4 Setting up libhwloc-dev:amd64 (2.7.0-2ubuntu1) ...
#10 108.4 Setting up libboost-dev:amd64 (1.74.0.3ubuntu7) ...
#10 108.4 Setting up libboost-math1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 108.4 Setting up libboost-filesystem1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 108.4 Setting up libboost-stacktrace1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 108.4 Setting up libboost-test1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 108.4 Setting up libboost-regex-dev:amd64 (1.74.0.3ubuntu7) ...
#10 108.4 Setting up libboost-timer-dev:amd64 (1.74.0.3ubuntu7) ...
#10 108.4 Setting up libboost-filesystem-dev:amd64 (1.74.0.3ubuntu7) ...
#10 108.5 Setting up libfabric1:amd64 (1.11.0-3) ...
#10 108.5 Setting up libpython3-dev:amd64 (3.10.6-1~22.04.1) ...
#10 108.5 Setting up libboost-wave1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 108.5 Setting up libpmix2:amd64 (4.1.2-2ubuntu1) ...
#10 108.5 Setting up libboost-chrono-dev:amd64 (1.74.0.3ubuntu7) ...
#10 108.5 Setting up libboost-math-dev:amd64 (1.74.0.3ubuntu7) ...
#10 108.5 Setting up libopenmpi3:amd64 (4.1.2-2ubuntu1) ...
#10 108.5 Setting up libboost-system-dev:amd64 (1.74.0.3ubuntu7) ...
#10 108.5 Setting up libboost-mpi1.74.0 (1.74.0-14ubuntu3) ...
#10 108.5 Setting up libboost-random-dev:amd64 (1.74.0.3ubuntu7) ...
#10 108.5 Setting up libboost-wave-dev:amd64 (1.74.0.3ubuntu7) ...
#10 108.5 Setting up libboost-test-dev:amd64 (1.74.0.3ubuntu7) ...
#10 108.5 Setting up libboost-iostreams1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 108.5 Setting up libboost-date-time1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 108.5 Setting up libboost-graph1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 108.5 Setting up python3-dev (3.10.6-1~22.04.1) ...
#10 108.5 Setting up libboost-serialization-dev:amd64 (1.74.0.3ubuntu7) ...
#10 108.5 Setting up libboost-date-time-dev:amd64 (1.74.0.3ubuntu7) ...
#10 108.5 Setting up libboost-stacktrace-dev:amd64 (1.74.0.3ubuntu7) ...
#10 108.5 Setting up libboost-thread1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 108.5 Setting up libboost-graph-parallel1.74.0 (1.74.0-14ubuntu3) ...
#10 108.5 Setting up libpmix-dev:amd64 (4.1.2-2ubuntu1) ...
#10 108.5 Setting up openmpi-bin (4.1.2-2ubuntu1) ...
#10 108.6 update-alternatives: using /usr/bin/mpirun.openmpi to provide /usr/bin/mpirun (mpirun) in auto mode
#10 108.6 update-alternatives: warning: skip creation of /usr/share/man/man1/mpirun.1.gz because associated file /usr/share/man/man1/mpirun.openmpi.1.gz (of link group mpirun) doesn't exist
#10 108.6 update-alternatives: warning: skip creation of /usr/share/man/man1/mpiexec.1.gz because associated file /usr/share/man/man1/mpiexec.openmpi.1.gz (of link group mpirun) doesn't exist
#10 108.6 update-alternatives: using /usr/bin/mpicc.openmpi to provide /usr/bin/mpicc (mpi) in auto mode
#10 108.6 update-alternatives: warning: skip creation of /usr/share/man/man1/mpicc.1.gz because associated file /usr/share/man/man1/mpicc.openmpi.1.gz (of link group mpi) doesn't exist
#10 108.6 update-alternatives: warning: skip creation of /usr/share/man/man1/mpic++.1.gz because associated file /usr/share/man/man1/mpic++.openmpi.1.gz (of link group mpi) doesn't exist
#10 108.6 update-alternatives: warning: skip creation of /usr/share/man/man1/mpicxx.1.gz because associated file /usr/share/man/man1/mpicxx.openmpi.1.gz (of link group mpi) doesn't exist
#10 108.6 update-alternatives: warning: skip creation of /usr/share/man/man1/mpiCC.1.gz because associated file /usr/share/man/man1/mpiCC.openmpi.1.gz (of link group mpi) doesn't exist
#10 108.6 update-alternatives: warning: skip creation of /usr/share/man/man1/mpif77.1.gz because associated file /usr/share/man/man1/mpif77.openmpi.1.gz (of link group mpi) doesn't exist
#10 108.6 update-alternatives: warning: skip creation of /usr/share/man/man1/mpif90.1.gz because associated file /usr/share/man/man1/mpif90.openmpi.1.gz (of link group mpi) doesn't exist
#10 108.6 update-alternatives: warning: skip creation of /usr/share/man/man1/mpifort.1.gz because associated file /usr/share/man/man1/mpifort.openmpi.1.gz (of link group mpi) doesn't exist
#10 108.6 Setting up libboost-thread-dev:amd64 (1.74.0.3ubuntu7) ...
#10 108.6 Setting up libboost-graph-dev:amd64 (1.74.0.3ubuntu7) ...
#10 108.6 Setting up libboost-log1.74-dev (1.74.0-14ubuntu3) ...
#10 108.6 Setting up mpi-default-bin (1.14) ...
#10 108.6 Setting up libboost-iostreams-dev:amd64 (1.74.0.3ubuntu7) ...
#10 108.6 Setting up libboost-context1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 108.6 Setting up libboost-python1.74-dev (1.74.0-14ubuntu3) ...
#10 108.6 Setting up libboost-python-dev (1.74.0.3ubuntu7) ...
#10 108.6 Setting up libboost-fiber1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 108.6 Setting up libboost-type-erasure1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 108.6 Setting up libboost-locale1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 108.6 Setting up libboost-graph-parallel1.74-dev (1.74.0-14ubuntu3) ...
#10 108.6 Setting up libboost-coroutine1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#10 108.6 Setting up libboost-coroutine-dev:amd64 (1.74.0.3ubuntu7) ...
#10 108.6 Setting up libopenmpi-dev:amd64 (4.1.2-2ubuntu1) ...
#10 108.7 update-alternatives: using /usr/lib/x86_64-linux-gnu/openmpi/include to provide /usr/include/x86_64-linux-gnu/mpi (mpi-x86_64-linux-gnu) in auto mode
#10 108.7 Setting up libboost-log-dev (1.74.0.3ubuntu7) ...
#10 108.7 Setting up libboost-fiber-dev:amd64 (1.74.0.3ubuntu7) ...
#10 108.7 Setting up libboost-mpi-python1.74.0 (1.74.0-14ubuntu3) ...
#10 109.2 Setting up libboost-locale-dev:amd64 (1.74.0.3ubuntu7) ...
#10 109.3 Setting up libboost-context-dev:amd64 (1.74.0.3ubuntu7) ...
#10 109.3 Setting up libboost-type-erasure-dev:amd64 (1.74.0.3ubuntu7) ...
#10 109.3 Setting up libboost-graph-parallel-dev (1.74.0.3ubuntu7) ...
#10 109.3 Setting up mpi-default-dev (1.14) ...
#10 109.3 Setting up libboost-mpi1.74-dev (1.74.0-14ubuntu3) ...
#10 109.3 Setting up libboost-mpi-python1.74-dev (1.74.0-14ubuntu3) ...
#10 109.3 Setting up libboost-mpi-python-dev (1.74.0.3ubuntu7) ...
#10 109.3 Setting up libboost-mpi-dev (1.74.0.3ubuntu7) ...
#10 109.3 Setting up libboost-all-dev (1.74.0.3ubuntu7) ...
#10 109.3 Processing triggers for libc-bin (2.35-0ubuntu3.10) ...
#10 DONE 109.6s

#11 [build 2/6] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&         apt-get install -y --no-install-recommends             build-essential cmake git pkg-config             libboost-all-dev libssl-dev libpthread-stubs0-dev libc6-dev libminiupnpc-dev &&         rm -rf /var/lib/apt/lists/*
#11 109.4 Get:112 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-dev amd64 1.74.0.3ubuntu7 [3490 B]
#11 109.4 Get:113 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost1.74-tools-dev amd64 1.74.0-14ubuntu3 [1351 kB]
#11 110.2 Get:114 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-tools-dev amd64 1.74.0.3ubuntu7 [3428 B]
#11 110.2 Get:115 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-atomic1.74.0 amd64 1.74.0-14ubuntu3 [224 kB]
#11 110.2 Get:116 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-atomic1.74-dev amd64 1.74.0-14ubuntu3 [221 kB]
#11 110.2 Get:117 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-atomic-dev amd64 1.74.0.3ubuntu7 [3544 B]
#11 110.2 Get:118 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-chrono1.74.0 amd64 1.74.0-14ubuntu3 [232 kB]
#11 110.3 Get:119 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-chrono1.74-dev amd64 1.74.0-14ubuntu3 [239 kB]
#11 110.3 Get:120 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-chrono-dev amd64 1.74.0.3ubuntu7 [3854 B]
#11 110.3 Get:121 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-container1.74.0 amd64 1.74.0-14ubuntu3 [246 kB]
#11 110.4 Get:122 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-container1.74-dev amd64 1.74.0-14ubuntu3 [254 kB]
#11 110.7 Get:123 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-container-dev amd64 1.74.0.3ubuntu7 [3712 B]
#11 110.7 Get:124 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-date-time1.74.0 amd64 1.74.0-14ubuntu3 [221 kB]
#11 110.7 Get:125 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-serialization1.74.0 amd64 1.74.0-14ubuntu3 [327 kB]
#11 110.7 Get:126 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-serialization1.74-dev amd64 1.74.0-14ubuntu3 [375 kB]
#11 110.9 Get:127 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-date-time1.74-dev amd64 1.74.0-14ubuntu3 [226 kB]
#11 110.9 Get:128 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-system1.74.0 amd64 1.74.0-14ubuntu3 [221 kB]
#11 110.9 Get:129 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-system1.74-dev amd64 1.74.0-14ubuntu3 [218 kB]
#11 111.2 Get:130 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-thread1.74.0 amd64 1.74.0-14ubuntu3 [262 kB]
#11 111.2 Get:131 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-thread1.74-dev amd64 1.74.0-14ubuntu3 [272 kB]
#11 111.2 Get:132 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-context1.74.0 amd64 1.74.0-14ubuntu3 [223 kB]
#11 111.3 Get:133 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-context1.74-dev amd64 1.74.0-14ubuntu3 [220 kB]
#11 111.5 Get:134 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-context-dev amd64 1.74.0.3ubuntu7 [3456 B]
#11 111.5 Get:135 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-coroutine1.74.0 amd64 1.74.0-14ubuntu3 [235 kB]
#11 111.5 Get:136 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-coroutine1.74-dev amd64 1.74.0-14ubuntu3 [244 kB]
#11 111.5 Get:137 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-coroutine-dev amd64 1.74.0.3ubuntu7 [3520 B]
#11 111.5 Get:138 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-date-time-dev amd64 1.74.0.3ubuntu7 [3248 B]
#11 111.5 Get:139 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-exception1.74-dev amd64 1.74.0-14ubuntu3 [217 kB]
#11 111.5 Get:140 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-exception-dev amd64 1.74.0.3ubuntu7 [3250 B]
#11 111.5 Get:141 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-filesystem1.74.0 amd64 1.74.0-14ubuntu3 [264 kB]
#11 111.5 Get:142 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-filesystem1.74-dev amd64 1.74.0-14ubuntu3 [287 kB]
#11 111.8 Get:143 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-fiber1.74.0 amd64 1.74.0-14ubuntu3 [242 kB]
#11 111.8 Get:144 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-fiber1.74-dev amd64 1.74.0-14ubuntu3 [254 kB]
#11 111.8 Get:145 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-fiber-dev amd64 1.74.0.3ubuntu7 [3674 B]
#11 111.8 Get:146 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-filesystem-dev amd64 1.74.0.3ubuntu7 [3280 B]
#11 111.8 Get:147 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-regex1.74.0 amd64 1.74.0-14ubuntu3 [511 kB]
#11 111.8 Get:148 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-graph1.74.0 amd64 1.74.0-14ubuntu3 [304 kB]
#11 111.9 Get:149 http://archive.ubuntu.com/ubuntu jammy/main amd64 libicu-dev amd64 70.1-2 [11.6 MB]
#11 115.4 Get:150 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-regex1.74-dev amd64 1.74.0-14ubuntu3 [596 kB]
#11 116.0 Get:151 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-test1.74.0 amd64 1.74.0-14ubuntu3 [446 kB]
#11 116.1 Get:152 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-test1.74-dev amd64 1.74.0-14ubuntu3 [564 kB]
#11 116.1 Get:153 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-graph1.74-dev amd64 1.74.0-14ubuntu3 [335 kB]
#11 116.1 Get:154 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-graph-dev amd64 1.74.0.3ubuntu7 [3348 B]
#11 116.1 Get:155 http://archive.ubuntu.com/ubuntu jammy/main amd64 libevent-core-2.1-7 amd64 2.1.12-stable-1build3 [93.9 kB]
#11 116.1 Get:156 http://archive.ubuntu.com/ubuntu jammy/main amd64 libevent-pthreads-2.1-7 amd64 2.1.12-stable-1build3 [7642 B]
#11 116.1 Get:157 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libpsm-infinipath1 amd64 3.3+20.604758e7-6.1 [170 kB]
#11 116.1 Get:158 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libpsm2-2 amd64 11.2.185-1 [182 kB]
#11 116.2 Get:159 http://archive.ubuntu.com/ubuntu jammy/main amd64 librdmacm1 amd64 39.0-1 [71.2 kB]
#11 116.2 Get:160 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libfabric1 amd64 1.11.0-3 [558 kB]
#11 116.4 Get:161 http://archive.ubuntu.com/ubuntu jammy-updates/universe amd64 libhwloc15 amd64 2.7.0-2ubuntu1 [159 kB]
#11 116.6 Get:162 http://archive.ubuntu.com/ubuntu jammy/main amd64 libpciaccess0 amd64 0.16-3 [19.1 kB]
#11 116.6 Get:163 http://archive.ubuntu.com/ubuntu jammy/main amd64 libxnvctrl0 amd64 510.47.03-0ubuntu1 [11.5 kB]
#11 116.6 Get:164 http://archive.ubuntu.com/ubuntu jammy/universe amd64 ocl-icd-libopencl1 amd64 2.2.14-3 [39.1 kB]
#11 116.6 Get:165 http://archive.ubuntu.com/ubuntu jammy-updates/universe amd64 libhwloc-plugins amd64 2.7.0-2ubuntu1 [15.6 kB]
#11 116.6 Get:166 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libpmix2 amd64 4.1.2-2ubuntu1 [604 kB]
#11 116.8 Get:167 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libucx0 amd64 1.12.1~rc2-1 [891 kB]
#11 117.1 Get:168 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libopenmpi3 amd64 4.1.2-2ubuntu1 [2594 kB]
#11 117.5 Get:169 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-mpi1.74.0 amd64 1.74.0-14ubuntu3 [259 kB]
#11 118.0 Get:170 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-graph-parallel1.74.0 amd64 1.74.0-14ubuntu3 [266 kB]
#11 118.0 Get:171 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-graph-parallel1.74-dev amd64 1.74.0-14ubuntu3 [277 kB]
#11 118.0 Get:172 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-graph-parallel-dev amd64 1.74.0.3ubuntu7 [3384 B]
#11 118.0 Get:173 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-iostreams1.74.0 amd64 1.74.0-14ubuntu3 [245 kB]
#11 118.0 Get:174 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-iostreams1.74-dev amd64 1.74.0-14ubuntu3 [252 kB]
#11 118.0 Get:175 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-iostreams-dev amd64 1.74.0.3ubuntu7 [3238 B]
#11 118.0 Get:176 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-locale1.74.0 amd64 1.74.0-14ubuntu3 [413 kB]
#11 118.2 Get:177 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-locale1.74-dev amd64 1.74.0-14ubuntu3 [594 kB]
#11 118.6 Get:178 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-locale-dev amd64 1.74.0.3ubuntu7 [3572 B]
#11 118.6 Get:179 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-log1.74.0 amd64 1.74.0-14ubuntu3 [592 kB]
#11 118.7 Get:180 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-log1.74-dev amd64 1.74.0-14ubuntu3 [853 kB]
#11 118.9 Get:181 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-log-dev amd64 1.74.0.3ubuntu7 [3446 B]
#11 118.9 Get:182 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-math1.74.0 amd64 1.74.0-14ubuntu3 [423 kB]
#11 119.5 Get:183 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-math1.74-dev amd64 1.74.0-14ubuntu3 [620 kB]
#11 119.6 Get:184 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-math-dev amd64 1.74.0.3ubuntu7 [3454 B]
#11 119.6 Get:185 http://archive.ubuntu.com/ubuntu jammy/universe amd64 openmpi-common all 4.1.2-2ubuntu1 [162 kB]
#11 119.6 Get:186 http://archive.ubuntu.com/ubuntu jammy/main amd64 libnl-3-dev amd64 3.5.0-0.1 [101 kB]
#11 119.6 Get:187 http://archive.ubuntu.com/ubuntu jammy/main amd64 libnl-route-3-dev amd64 3.5.0-0.1 [202 kB]
#11 119.6 Get:188 http://archive.ubuntu.com/ubuntu jammy/main amd64 libibverbs-dev amd64 39.0-1 [628 kB]
#11 119.6 Get:189 http://archive.ubuntu.com/ubuntu jammy/main amd64 libnuma-dev amd64 2.0.14-3ubuntu2 [35.9 kB]
#11 119.6 Get:190 http://archive.ubuntu.com/ubuntu jammy/main amd64 libltdl7 amd64 2.4.6-15build2 [39.6 kB]
#11 119.6 Get:191 http://archive.ubuntu.com/ubuntu jammy/main amd64 libltdl-dev amd64 2.4.6-15build2 [169 kB]
#11 119.7 Get:192 http://archive.ubuntu.com/ubuntu jammy-updates/universe amd64 libhwloc-dev amd64 2.7.0-2ubuntu1 [256 kB]
#11 119.9 Get:193 http://archive.ubuntu.com/ubuntu jammy/main amd64 libevent-2.1-7 amd64 2.1.12-stable-1build3 [148 kB]
#11 119.9 Get:194 http://archive.ubuntu.com/ubuntu jammy/main amd64 libevent-extra-2.1-7 amd64 2.1.12-stable-1build3 [65.4 kB]
#11 119.9 Get:195 http://archive.ubuntu.com/ubuntu jammy/main amd64 libevent-openssl-2.1-7 amd64 2.1.12-stable-1build3 [15.8 kB]
#11 119.9 Get:196 http://archive.ubuntu.com/ubuntu jammy/main amd64 libevent-dev amd64 2.1.12-stable-1build3 [278 kB]
#11 119.9 Get:197 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 zlib1g-dev amd64 1:1.2.11.dfsg-2ubuntu9.2 [164 kB]
#11 119.9 Get:198 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libpmix-dev amd64 4.1.2-2ubuntu1 [805 kB]
#11 120.2 Get:199 http://archive.ubuntu.com/ubuntu jammy/main amd64 libjs-jquery all 3.6.0+dfsg+~3.5.13-1 [321 kB]
#11 120.2 Get:200 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libjs-jquery-ui all 1.13.1+dfsg-1 [253 kB]
#11 120.2 Get:201 http://archive.ubuntu.com/ubuntu jammy/universe amd64 openmpi-bin amd64 4.1.2-2ubuntu1 [116 kB]
#11 120.2 Get:202 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libopenmpi-dev amd64 4.1.2-2ubuntu1 [867 kB]
#11 120.8 Get:203 http://archive.ubuntu.com/ubuntu jammy/universe amd64 mpi-default-dev amd64 1.14 [3698 B]
#11 120.9 Get:204 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-mpi1.74-dev amd64 1.74.0-14ubuntu3 [285 kB]
#11 121.3 Get:205 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-mpi-dev amd64 1.74.0.3ubuntu7 [3328 B]
#11 121.3 Get:206 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-python1.74.0 amd64 1.74.0-14ubuntu3 [299 kB]
#11 121.3 Get:207 http://archive.ubuntu.com/ubuntu jammy/universe amd64 mpi-default-bin amd64 1.14 [2898 B]
#11 121.3 Get:208 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-mpi-python1.74.0 amd64 1.74.0-14ubuntu3 [351 kB]
#11 121.6 Get:209 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-mpi-python1.74-dev amd64 1.74.0-14ubuntu3 [225 kB]
#11 121.6 Get:210 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-mpi-python-dev amd64 1.74.0.3ubuntu7 [3382 B]
#11 121.6 Get:211 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-numpy1.74.0 amd64 1.74.0-14ubuntu3 [229 kB]
#11 121.7 Get:212 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-numpy1.74-dev amd64 1.74.0-14ubuntu3 [233 kB]
#11 121.7 Get:213 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-numpy-dev amd64 1.74.0.3ubuntu7 [3286 B]
#11 121.7 Get:214 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-program-options1.74.0 amd64 1.74.0-14ubuntu3 [311 kB]
#11 121.7 Get:215 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-program-options1.74-dev amd64 1.74.0-14ubuntu3 [380 kB]
#11 122.0 Get:216 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-program-options-dev amd64 1.74.0.3ubuntu7 [3266 B]
#11 122.0 Get:217 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libpython3.10 amd64 3.10.12-1~22.04.11 [1949 kB]
#11 122.6 Get:218 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libexpat1-dev amd64 2.4.7-1ubuntu0.6 [148 kB]
#11 122.6 Get:219 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libpython3.10-dev amd64 3.10.12-1~22.04.11 [4764 kB]
#11 124.8 Get:220 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libpython3-dev amd64 3.10.6-1~22.04.1 [7064 B]
#11 124.8 Get:221 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 python3.10-dev amd64 3.10.12-1~22.04.11 [508 kB]
#11 124.9 Get:222 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 python3-lib2to3 all 3.10.8-1~22.04 [77.6 kB]
#11 124.9 Get:223 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 python3-distutils all 3.10.8-1~22.04 [139 kB]
#11 125.0 Get:224 http://archive.ubuntu.com/ubuntu jammy/main amd64 libjs-underscore all 1.13.2~dfsg-2 [118 kB]
#11 125.0 Get:225 http://archive.ubuntu.com/ubuntu jammy/main amd64 libjs-sphinxdoc all 4.3.2-1 [139 kB]
#11 125.0 Get:226 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 python3-dev amd64 3.10.6-1~22.04.1 [26.0 kB]
#11 125.0 Get:227 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-python1.74-dev amd64 1.74.0-14ubuntu3 [323 kB]
#11 125.0 Get:228 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-python-dev amd64 1.74.0.3ubuntu7 [3538 B]
#11 125.0 Get:229 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-random1.74.0 amd64 1.74.0-14ubuntu3 [231 kB]
#11 125.0 Get:230 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-random1.74-dev amd64 1.74.0-14ubuntu3 [231 kB]
#11 125.1 Get:231 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-random-dev amd64 1.74.0.3ubuntu7 [3258 B]
#11 125.1 Get:232 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-regex-dev amd64 1.74.0.3ubuntu7 [3510 B]
#11 125.1 Get:233 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-serialization-dev amd64 1.74.0.3ubuntu7 [3468 B]
#11 125.1 Get:234 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-stacktrace1.74.0 amd64 1.74.0-14ubuntu3 [267 kB]
#11 125.2 Get:235 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-stacktrace1.74-dev amd64 1.74.0-14ubuntu3 [232 kB]
#11 125.2 Get:236 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-stacktrace-dev amd64 1.74.0.3ubuntu7 [3260 B]
#11 125.2 Get:237 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-system-dev amd64 1.74.0.3ubuntu7 [3390 B]
#11 125.2 Get:238 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-test-dev amd64 1.74.0.3ubuntu7 [3274 B]
#11 125.2 Get:239 http://archive.ubuntu.com/ubuntu jammy/main amd64 libboost-thread-dev amd64 1.74.0.3ubuntu7 [3266 B]
#11 125.2 Get:240 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-timer1.74.0 amd64 1.74.0-14ubuntu3 [228 kB]
#11 125.3 Get:241 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-timer1.74-dev amd64 1.74.0-14ubuntu3 [231 kB]
#11 125.3 Get:242 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-timer-dev amd64 1.74.0.3ubuntu7 [3380 B]
#11 125.3 Get:243 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-type-erasure1.74.0 amd64 1.74.0-14ubuntu3 [234 kB]
#11 125.4 Get:244 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-type-erasure1.74-dev amd64 1.74.0-14ubuntu3 [239 kB]
#11 125.4 Get:245 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-type-erasure-dev amd64 1.74.0.3ubuntu7 [3344 B]
#11 125.4 Get:246 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-wave1.74.0 amd64 1.74.0-14ubuntu3 [449 kB]
#11 125.6 Get:247 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-wave1.74-dev amd64 1.74.0-14ubuntu3 [496 kB]
#11 125.6 Get:248 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-wave-dev amd64 1.74.0.3ubuntu7 [3292 B]
#11 125.6 Get:249 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-nowide1.74.0 amd64 1.74.0-14ubuntu3 [223 kB]
#11 125.8 Get:250 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-nowide1.74-dev amd64 1.74.0-14ubuntu3 [220 kB]
#11 125.8 Get:251 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-nowide-dev amd64 1.74.0.3ubuntu7 [3322 B]
#11 125.8 Get:252 http://archive.ubuntu.com/ubuntu jammy/universe amd64 libboost-all-dev amd64 1.74.0.3ubuntu7 [2268 B]
#11 125.8 Get:253 http://archive.ubuntu.com/ubuntu jammy/main amd64 libminiupnpc17 amd64 2.2.3-1build1 [27.7 kB]
#11 125.8 Get:254 http://archive.ubuntu.com/ubuntu jammy/main amd64 libminiupnpc-dev amd64 2.2.3-1build1 [36.4 kB]
#11 125.9 Get:255 http://archive.ubuntu.com/ubuntu jammy/main amd64 libpthread-stubs0-dev amd64 0.4-1build2 [5516 B]
#11 125.9 Get:256 http://archive.ubuntu.com/ubuntu jammy-updates/main amd64 libssl-dev amd64 3.0.2-0ubuntu1.19 [2376 kB]
#11 126.4 Get:257 http://archive.ubuntu.com/ubuntu jammy/main amd64 pkg-config amd64 0.29.2-1ubuntu3 [48.2 kB]
#11 126.8 debconf: delaying package configuration, since apt-utils is not installed
#11 126.8 Fetched 184 MB in 1min 40s (1850 kB/s)
#11 126.9 Selecting previously unselected package libpython3.10-minimal:amd64.
#11 126.9 (Reading database ... (Reading database ... 5%(Reading database ... 10%(Reading database ... 15%(Reading database ... 20%(Reading database ... 25%(Reading database ... 30%(Reading database ... 35%(Reading database ... 40%(Reading database ... 45%(Reading database ... 50%(Reading database ... 55%(Reading database ... 60%(Reading database ... 65%(Reading database ... 70%(Reading database ... 75%(Reading database ... 80%(Reading database ... 85%(Reading database ... 90%(Reading database ... 95%(Reading database ... 100%(Reading database ... 4393 files and directories currently installed.)
#11 126.9 Preparing to unpack .../libpython3.10-minimal_3.10.12-1~22.04.11_amd64.deb ...
#11 126.9 Unpacking libpython3.10-minimal:amd64 (3.10.12-1~22.04.11) ...
#11 127.1 Selecting previously unselected package libexpat1:amd64.
#11 127.1 Preparing to unpack .../libexpat1_2.4.7-1ubuntu0.6_amd64.deb ...
#11 127.1 Unpacking libexpat1:amd64 (2.4.7-1ubuntu0.6) ...
#11 127.2 Selecting previously unselected package python3.10-minimal.
#11 127.2 Preparing to unpack .../python3.10-minimal_3.10.12-1~22.04.11_amd64.deb ...
#11 127.2 Unpacking python3.10-minimal (3.10.12-1~22.04.11) ...
#11 127.3 Setting up libpython3.10-minimal:amd64 (3.10.12-1~22.04.11) ...
#11 127.3 Setting up libexpat1:amd64 (2.4.7-1ubuntu0.6) ...
#11 127.3 Setting up python3.10-minimal (3.10.12-1~22.04.11) ...
#11 128.2 Selecting previously unselected package python3-minimal.
#11 128.2 (Reading database ... (Reading database ... 5%(Reading database ... 10%(Reading database ... 15%(Reading database ... 20%(Reading database ... 25%(Reading database ... 30%(Reading database ... 35%(Reading database ... 40%(Reading database ... 45%(Reading database ... 50%(Reading database ... 55%(Reading database ... 60%(Reading database ... 65%(Reading database ... 70%(Reading database ... 75%(Reading database ... 80%(Reading database ... 85%(Reading database ... 90%(Reading database ... 95%(Reading database ... 100%(Reading database ... 4697 files and directories currently installed.)
#11 128.2 Preparing to unpack .../0-python3-minimal_3.10.6-1~22.04.1_amd64.deb ...
#11 128.2 Unpacking python3-minimal (3.10.6-1~22.04.1) ...
#11 128.3 Selecting previously unselected package media-types.
#11 128.3 Preparing to unpack .../1-media-types_7.0.0_all.deb ...
#11 128.3 Unpacking media-types (7.0.0) ...
#11 128.4 Selecting previously unselected package libmpdec3:amd64.
#11 128.4 Preparing to unpack .../2-libmpdec3_2.5.1-2build2_amd64.deb ...
#11 128.4 Unpacking libmpdec3:amd64 (2.5.1-2build2) ...
#11 128.5 Selecting previously unselected package readline-common.
#11 128.5 Preparing to unpack .../3-readline-common_8.1.2-1_all.deb ...
#11 128.5 Unpacking readline-common (8.1.2-1) ...
#11 128.6 Selecting previously unselected package libreadline8:amd64.
#11 128.6 Preparing to unpack .../4-libreadline8_8.1.2-1_amd64.deb ...
#11 128.6 Unpacking libreadline8:amd64 (8.1.2-1) ...
#11 128.7 Selecting previously unselected package libsqlite3-0:amd64.
#11 128.7 Preparing to unpack .../5-libsqlite3-0_3.37.2-2ubuntu0.5_amd64.deb ...
#11 128.7 Unpacking libsqlite3-0:amd64 (3.37.2-2ubuntu0.5) ...
#11 128.8 Selecting previously unselected package libpython3.10-stdlib:amd64.
#11 128.8 Preparing to unpack .../6-libpython3.10-stdlib_3.10.12-1~22.04.11_amd64.deb ...
#11 128.8 Unpacking libpython3.10-stdlib:amd64 (3.10.12-1~22.04.11) ...
#11 128.9 Selecting previously unselected package python3.10.
#11 128.9 Preparing to unpack .../7-python3.10_3.10.12-1~22.04.11_amd64.deb ...
#11 128.9 Unpacking python3.10 (3.10.12-1~22.04.11) ...
#11 129.0 Selecting previously unselected package libpython3-stdlib:amd64.
#11 129.0 Preparing to unpack .../8-libpython3-stdlib_3.10.6-1~22.04.1_amd64.deb ...
#11 129.0 Unpacking libpython3-stdlib:amd64 (3.10.6-1~22.04.1) ...
#11 129.1 Setting up python3-minimal (3.10.6-1~22.04.1) ...
#11 129.7 Selecting previously unselected package python3.
#11 129.7 (Reading database ... (Reading database ... 5%(Reading database ... 10%(Reading database ... 15%(Reading database ... 20%(Reading database ... 25%(Reading database ... 30%(Reading database ... 35%(Reading database ... 40%(Reading database ... 45%(Reading database ... 50%(Reading database ... 55%(Reading database ... 60%(Reading database ... 65%(Reading database ... 70%(Reading database ... 75%(Reading database ... 80%(Reading database ... 85%(Reading database ... 90%(Reading database ... 95%(Reading database ... 100%(Reading database ... 5127 files and directories currently installed.)
#11 129.7 Preparing to unpack .../000-python3_3.10.6-1~22.04.1_amd64.deb ...
#11 129.8 Unpacking python3 (3.10.6-1~22.04.1) ...
#11 129.9 Selecting previously unselected package perl-modules-5.34.
#11 129.9 Preparing to unpack .../001-perl-modules-5.34_5.34.0-3ubuntu1.5_all.deb ...
#11 129.9 Unpacking perl-modules-5.34 (5.34.0-3ubuntu1.5) ...
#11 130.1 Selecting previously unselected package libgdbm6:amd64.
#11 130.1 Preparing to unpack .../002-libgdbm6_1.23-1_amd64.deb ...
#11 130.1 Unpacking libgdbm6:amd64 (1.23-1) ...
#11 130.3 Selecting previously unselected package libgdbm-compat4:amd64.
#11 130.3 Preparing to unpack .../003-libgdbm-compat4_1.23-1_amd64.deb ...
#11 130.3 Unpacking libgdbm-compat4:amd64 (1.23-1) ...
#11 130.4 Selecting previously unselected package libperl5.34:amd64.
#11 130.4 Preparing to unpack .../004-libperl5.34_5.34.0-3ubuntu1.5_amd64.deb ...
#11 130.4 Unpacking libperl5.34:amd64 (5.34.0-3ubuntu1.5) ...
#11 130.7 Selecting previously unselected package perl.
#11 130.7 Preparing to unpack .../005-perl_5.34.0-3ubuntu1.5_amd64.deb ...
#11 130.7 Unpacking perl (5.34.0-3ubuntu1.5) ...
#11 130.8 Selecting previously unselected package libmd0:amd64.
#11 130.8 Preparing to unpack .../006-libmd0_1.0.4-1build1_amd64.deb ...
#11 130.8 Unpacking libmd0:amd64 (1.0.4-1build1) ...
#11 130.9 Selecting previously unselected package libbsd0:amd64.
#11 130.9 Preparing to unpack .../007-libbsd0_0.11.5-1_amd64.deb ...
#11 130.9 Unpacking libbsd0:amd64 (0.11.5-1) ...
#11 131.0 Selecting previously unselected package libglib2.0-0:amd64.
#11 131.0 Preparing to unpack .../008-libglib2.0-0_2.72.4-0ubuntu2.6_amd64.deb ...
#11 131.0 Unpacking libglib2.0-0:amd64 (2.72.4-0ubuntu2.6) ...
#11 131.1 Selecting previously unselected package libicu70:amd64.
#11 131.1 Preparing to unpack .../009-libicu70_70.1-2_amd64.deb ...
#11 131.1 Unpacking libicu70:amd64 (70.1-2) ...
#11 131.4 Selecting previously unselected package libxml2:amd64.
#11 131.5 Preparing to unpack .../010-libxml2_2.9.13+dfsg-1ubuntu0.9_amd64.deb ...
#11 131.5 Unpacking libxml2:amd64 (2.9.13+dfsg-1ubuntu0.9) ...
#11 131.6 Selecting previously unselected package libcbor0.8:amd64.
#11 131.6 Preparing to unpack .../011-libcbor0.8_0.8.0-2ubuntu1_amd64.deb ...
#11 131.6 Unpacking libcbor0.8:amd64 (0.8.0-2ubuntu1) ...
#11 131.6 Selecting previously unselected package libedit2:amd64.
#11 131.6 Preparing to unpack .../012-libedit2_3.1-20210910-1build1_amd64.deb ...
#11 131.6 Unpacking libedit2:amd64 (3.1-20210910-1build1) ...
#11 131.7 Selecting previously unselected package libfido2-1:amd64.
#11 131.7 Preparing to unpack .../013-libfido2-1_1.10.0-1_amd64.deb ...
#11 131.7 Unpacking libfido2-1:amd64 (1.10.0-1) ...
#11 131.9 Selecting previously unselected package libnghttp2-14:amd64.
#11 131.9 Preparing to unpack .../014-libnghttp2-14_1.43.0-1ubuntu0.2_amd64.deb ...
#11 131.9 Unpacking libnghttp2-14:amd64 (1.43.0-1ubuntu0.2) ...
#11 132.0 Selecting previously unselected package libnuma1:amd64.
#11 132.0 Preparing to unpack .../015-libnuma1_2.0.14-3ubuntu2_amd64.deb ...
#11 132.0 Unpacking libnuma1:amd64 (2.0.14-3ubuntu2) ...
#11 132.1 Selecting previously unselected package libpsl5:amd64.
#11 132.1 Preparing to unpack .../016-libpsl5_0.21.0-1.2build2_amd64.deb ...
#11 132.1 Unpacking libpsl5:amd64 (0.21.0-1.2build2) ...
#11 132.2 Selecting previously unselected package libuv1:amd64.
#11 132.2 Preparing to unpack .../017-libuv1_1.43.0-1ubuntu0.1_amd64.deb ...
#11 132.2 Unpacking libuv1:amd64 (1.43.0-1ubuntu0.1) ...
#11 132.3 Selecting previously unselected package libxau6:amd64.
#11 132.3 Preparing to unpack .../018-libxau6_1%3a1.0.9-1build5_amd64.deb ...
#11 132.3 Unpacking libxau6:amd64 (1:1.0.9-1build5) ...
#11 132.4 Selecting previously unselected package libxdmcp6:amd64.
#11 132.4 Preparing to unpack .../019-libxdmcp6_1%3a1.1.3-0ubuntu5_amd64.deb ...
#11 132.4 Unpacking libxdmcp6:amd64 (1:1.1.3-0ubuntu5) ...
#11 132.5 Selecting previously unselected package libxcb1:amd64.
#11 132.5 Preparing to unpack .../020-libxcb1_1.14-3ubuntu3_amd64.deb ...
#11 132.5 Unpacking libxcb1:amd64 (1.14-3ubuntu3) ...
#11 132.6 Selecting previously unselected package libx11-data.
#11 132.6 Preparing to unpack .../021-libx11-data_2%3a1.7.5-1ubuntu0.3_all.deb ...
#11 132.6 Unpacking libx11-data (2:1.7.5-1ubuntu0.3) ...
#11 132.7 Selecting previously unselected package libx11-6:amd64.
#11 132.7 Preparing to unpack .../022-libx11-6_2%3a1.7.5-1ubuntu0.3_amd64.deb ...
#11 132.7 Unpacking libx11-6:amd64 (2:1.7.5-1ubuntu0.3) ...
#11 132.8 Selecting previously unselected package libxext6:amd64.
#11 132.8 Preparing to unpack .../023-libxext6_2%3a1.3.4-1build1_amd64.deb ...
#11 132.8 Unpacking libxext6:amd64 (2:1.3.4-1build1) ...
#11 132.9 Selecting previously unselected package openssh-client.
#11 132.9 Preparing to unpack .../024-openssh-client_1%3a8.9p1-3ubuntu0.13_amd64.deb ...
#11 133.0 Unpacking openssh-client (1:8.9p1-3ubuntu0.13) ...
#11 133.1 Selecting previously unselected package xz-utils.
#11 133.1 Preparing to unpack .../025-xz-utils_5.2.5-2ubuntu1_amd64.deb ...
#11 133.1 Unpacking xz-utils (5.2.5-2ubuntu1) ...
#11 133.2 Selecting previously unselected package libsigsegv2:amd64.
#11 133.2 Preparing to unpack .../026-libsigsegv2_2.13-1ubuntu3_amd64.deb ...
#11 133.2 Unpacking libsigsegv2:amd64 (2.13-1ubuntu3) ...
#11 133.3 Selecting previously unselected package m4.
#11 133.3 Preparing to unpack .../027-m4_1.4.18-5ubuntu2_amd64.deb ...
#11 133.3 Unpacking m4 (1.4.18-5ubuntu2) ...
#11 133.4 Selecting previously unselected package autoconf.
#11 133.4 Preparing to unpack .../028-autoconf_2.71-2_all.deb ...
#11 133.4 Unpacking autoconf (2.71-2) ...
#11 133.5 Selecting previously unselected package autotools-dev.
#11 133.5 Preparing to unpack .../029-autotools-dev_20220109.1_all.deb ...
#11 133.5 Unpacking autotools-dev (20220109.1) ...
#11 133.6 Selecting previously unselected package automake.
#11 133.6 Preparing to unpack .../030-automake_1%3a1.16.5-1.3_all.deb ...
#11 133.6 Unpacking automake (1:1.16.5-1.3) ...
#11 133.7 Selecting previously unselected package binutils-common:amd64.
#11 133.7 Preparing to unpack .../031-binutils-common_2.38-4ubuntu2.8_amd64.deb ...
#11 133.7 Unpacking binutils-common:amd64 (2.38-4ubuntu2.8) ...
#11 133.8 Selecting previously unselected package libbinutils:amd64.
#11 133.8 Preparing to unpack .../032-libbinutils_2.38-4ubuntu2.8_amd64.deb ...
#11 133.8 Unpacking libbinutils:amd64 (2.38-4ubuntu2.8) ...
#11 133.9 Selecting previously unselected package libctf-nobfd0:amd64.
#11 133.9 Preparing to unpack .../033-libctf-nobfd0_2.38-4ubuntu2.8_amd64.deb ...
#11 133.9 Unpacking libctf-nobfd0:amd64 (2.38-4ubuntu2.8) ...
#11 134.0 Selecting previously unselected package libctf0:amd64.
#11 134.0 Preparing to unpack .../034-libctf0_2.38-4ubuntu2.8_amd64.deb ...
#11 134.0 Unpacking libctf0:amd64 (2.38-4ubuntu2.8) ...
#11 134.1 Selecting previously unselected package binutils-x86-64-linux-gnu.
#11 134.1 Preparing to unpack .../035-binutils-x86-64-linux-gnu_2.38-4ubuntu2.8_amd64.deb ...
#11 134.1 Unpacking binutils-x86-64-linux-gnu (2.38-4ubuntu2.8) ...
#11 134.3 Selecting previously unselected package binutils.
#11 134.3 Preparing to unpack .../036-binutils_2.38-4ubuntu2.8_amd64.deb ...
#11 134.3 Unpacking binutils (2.38-4ubuntu2.8) ...
#11 134.4 Selecting previously unselected package libc-dev-bin.
#11 134.4 Preparing to unpack .../037-libc-dev-bin_2.35-0ubuntu3.10_amd64.deb ...
#11 134.4 Unpacking libc-dev-bin (2.35-0ubuntu3.10) ...
#11 134.5 Selecting previously unselected package linux-libc-dev:amd64.
#11 134.5 Preparing to unpack .../038-linux-libc-dev_5.15.0-153.163_amd64.deb ...
#11 134.5 Unpacking linux-libc-dev:amd64 (5.15.0-153.163) ...
#11 134.7 Selecting previously unselected package libcrypt-dev:amd64.
#11 134.7 Preparing to unpack .../039-libcrypt-dev_1%3a4.4.27-1_amd64.deb ...
#11 134.7 Unpacking libcrypt-dev:amd64 (1:4.4.27-1) ...
#11 134.8 Selecting previously unselected package rpcsvc-proto.
#11 134.8 Preparing to unpack .../040-rpcsvc-proto_1.4.2-0ubuntu6_amd64.deb ...
#11 134.8 Unpacking rpcsvc-proto (1.4.2-0ubuntu6) ...
#11 134.9 Selecting previously unselected package libtirpc-dev:amd64.
#11 134.9 Preparing to unpack .../041-libtirpc-dev_1.3.2-2ubuntu0.1_amd64.deb ...
#11 134.9 Unpacking libtirpc-dev:amd64 (1.3.2-2ubuntu0.1) ...
#11 135.0 Selecting previously unselected package libnsl-dev:amd64.
#11 135.0 Preparing to unpack .../042-libnsl-dev_1.3.0-2build2_amd64.deb ...
#11 135.0 Unpacking libnsl-dev:amd64 (1.3.0-2build2) ...
#11 135.1 Selecting previously unselected package libc6-dev:amd64.
#11 135.1 Preparing to unpack .../043-libc6-dev_2.35-0ubuntu3.10_amd64.deb ...
#11 135.1 Unpacking libc6-dev:amd64 (2.35-0ubuntu3.10) ...
#11 135.2 Selecting previously unselected package gcc-11-base:amd64.
#11 135.2 Preparing to unpack .../044-gcc-11-base_11.4.0-1ubuntu1~22.04.2_amd64.deb ...
#11 135.2 Unpacking gcc-11-base:amd64 (11.4.0-1ubuntu1~22.04.2) ...
#11 135.3 Selecting previously unselected package libisl23:amd64.
#11 135.3 Preparing to unpack .../045-libisl23_0.24-2build1_amd64.deb ...
#11 135.3 Unpacking libisl23:amd64 (0.24-2build1) ...
#11 135.4 Selecting previously unselected package libmpfr6:amd64.
#11 135.4 Preparing to unpack .../046-libmpfr6_4.1.0-3build3_amd64.deb ...
#11 135.4 Unpacking libmpfr6:amd64 (4.1.0-3build3) ...
#11 135.6 Selecting previously unselected package libmpc3:amd64.
#11 135.6 Preparing to unpack .../047-libmpc3_1.2.1-2build1_amd64.deb ...
#11 135.6 Unpacking libmpc3:amd64 (1.2.1-2build1) ...
#11 135.7 Selecting previously unselected package cpp-11.
#11 135.7 Preparing to unpack .../048-cpp-11_11.4.0-1ubuntu1~22.04.2_amd64.deb ...
#11 135.7 Unpacking cpp-11 (11.4.0-1ubuntu1~22.04.2) ...
#11 135.9 Selecting previously unselected package cpp.
#11 135.9 Preparing to unpack .../049-cpp_4%3a11.2.0-1ubuntu1_amd64.deb ...
#11 135.9 Unpacking cpp (4:11.2.0-1ubuntu1) ...
#11 136.0 Selecting previously unselected package libcc1-0:amd64.
#11 136.0 Preparing to unpack .../050-libcc1-0_12.3.0-1ubuntu1~22.04.2_amd64.deb ...
#11 136.0 Unpacking libcc1-0:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#11 136.1 Selecting previously unselected package libgomp1:amd64.
#11 136.1 Preparing to unpack .../051-libgomp1_12.3.0-1ubuntu1~22.04.2_amd64.deb ...
#11 136.1 Unpacking libgomp1:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#11 136.2 Selecting previously unselected package libitm1:amd64.
#11 136.2 Preparing to unpack .../052-libitm1_12.3.0-1ubuntu1~22.04.2_amd64.deb ...
#11 136.2 Unpacking libitm1:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#11 136.3 Selecting previously unselected package libatomic1:amd64.
#11 136.3 Preparing to unpack .../053-libatomic1_12.3.0-1ubuntu1~22.04.2_amd64.deb ...
#11 136.3 Unpacking libatomic1:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#11 136.4 Selecting previously unselected package libasan6:amd64.
#11 136.4 Preparing to unpack .../054-libasan6_11.4.0-1ubuntu1~22.04.2_amd64.deb ...
#11 136.4 Unpacking libasan6:amd64 (11.4.0-1ubuntu1~22.04.2) ...
#11 136.5 Selecting previously unselected package liblsan0:amd64.
#11 136.5 Preparing to unpack .../055-liblsan0_12.3.0-1ubuntu1~22.04.2_amd64.deb ...
#11 136.5 Unpacking liblsan0:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#11 136.7 Selecting previously unselected package libtsan0:amd64.
#11 136.7 Preparing to unpack .../056-libtsan0_11.4.0-1ubuntu1~22.04.2_amd64.deb ...
#11 136.7 Unpacking libtsan0:amd64 (11.4.0-1ubuntu1~22.04.2) ...
#11 136.8 Selecting previously unselected package libubsan1:amd64.
#11 136.8 Preparing to unpack .../057-libubsan1_12.3.0-1ubuntu1~22.04.2_amd64.deb ...
#11 136.8 Unpacking libubsan1:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#11 136.9 Selecting previously unselected package libquadmath0:amd64.
#11 136.9 Preparing to unpack .../058-libquadmath0_12.3.0-1ubuntu1~22.04.2_amd64.deb ...
#11 136.9 Unpacking libquadmath0:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#11 137.0 Selecting previously unselected package libgcc-11-dev:amd64.
#11 137.0 Preparing to unpack .../059-libgcc-11-dev_11.4.0-1ubuntu1~22.04.2_amd64.deb ...
#11 137.0 Unpacking libgcc-11-dev:amd64 (11.4.0-1ubuntu1~22.04.2) ...
#11 137.2 Selecting previously unselected package gcc-11.
#11 137.2 Preparing to unpack .../060-gcc-11_11.4.0-1ubuntu1~22.04.2_amd64.deb ...
#11 137.2 Unpacking gcc-11 (11.4.0-1ubuntu1~22.04.2) ...
#11 137.6 Selecting previously unselected package gcc.
#11 137.6 Preparing to unpack .../061-gcc_4%3a11.2.0-1ubuntu1_amd64.deb ...
#11 137.6 Unpacking gcc (4:11.2.0-1ubuntu1) ...
#11 137.6 Selecting previously unselected package libstdc++-11-dev:amd64.
#11 137.6 Preparing to unpack .../062-libstdc++-11-dev_11.4.0-1ubuntu1~22.04.2_amd64.deb ...
#11 137.6 Unpacking libstdc++-11-dev:amd64 (11.4.0-1ubuntu1~22.04.2) ...
#11 137.8 Selecting previously unselected package g++-11.
#11 137.8 Preparing to unpack .../063-g++-11_11.4.0-1ubuntu1~22.04.2_amd64.deb ...
#11 137.8 Unpacking g++-11 (11.4.0-1ubuntu1~22.04.2) ...
#11 138.1 Selecting previously unselected package g++.
#11 138.1 Preparing to unpack .../064-g++_4%3a11.2.0-1ubuntu1_amd64.deb ...
#11 138.1 Unpacking g++ (4:11.2.0-1ubuntu1) ...
#11 138.2 Selecting previously unselected package make.
#11 138.2 Preparing to unpack .../065-make_4.3-4.1build1_amd64.deb ...
#11 138.2 Unpacking make (4.3-4.1build1) ...
#11 138.3 Selecting previously unselected package libdpkg-perl.
#11 138.3 Preparing to unpack .../066-libdpkg-perl_1.21.1ubuntu2.3_all.deb ...
#11 138.3 Unpacking libdpkg-perl (1.21.1ubuntu2.3) ...
#11 138.4 Selecting previously unselected package bzip2.
#11 138.4 Preparing to unpack .../067-bzip2_1.0.8-5build1_amd64.deb ...
#11 138.4 Unpacking bzip2 (1.0.8-5build1) ...
#11 138.5 Selecting previously unselected package patch.
#11 138.5 Preparing to unpack .../068-patch_2.7.6-7build2_amd64.deb ...
#11 138.5 Unpacking patch (2.7.6-7build2) ...
#11 138.6 Selecting previously unselected package lto-disabled-list.
#11 138.6 Preparing to unpack .../069-lto-disabled-list_24_all.deb ...
#11 138.6 Unpacking lto-disabled-list (24) ...
#11 138.7 Selecting previously unselected package dpkg-dev.
#11 138.7 Preparing to unpack .../070-dpkg-dev_1.21.1ubuntu2.3_all.deb ...
#11 138.7 Unpacking dpkg-dev (1.21.1ubuntu2.3) ...
#11 138.8 Selecting previously unselected package build-essential.
#11 138.8 Preparing to unpack .../071-build-essential_12.9ubuntu3_amd64.deb ...
#11 138.8 Unpacking build-essential (12.9ubuntu3) ...
#11 138.9 Selecting previously unselected package libarchive13:amd64.
#11 138.9 Preparing to unpack .../072-libarchive13_3.6.0-1ubuntu1.5_amd64.deb ...
#11 138.9 Unpacking libarchive13:amd64 (3.6.0-1ubuntu1.5) ...
#11 139.1 Selecting previously unselected package libbrotli1:amd64.
#11 139.1 Preparing to unpack .../073-libbrotli1_1.0.9-2build6_amd64.deb ...
#11 139.1 Unpacking libbrotli1:amd64 (1.0.9-2build6) ...
#11 139.3 Selecting previously unselected package libsasl2-modules-db:amd64.
#11 139.3 Preparing to unpack .../074-libsasl2-modules-db_2.1.27+dfsg2-3ubuntu1.2_amd64.deb ...
#11 139.3 Unpacking libsasl2-modules-db:amd64 (2.1.27+dfsg2-3ubuntu1.2) ...
#11 139.4 Selecting previously unselected package libsasl2-2:amd64.
#11 139.4 Preparing to unpack .../075-libsasl2-2_2.1.27+dfsg2-3ubuntu1.2_amd64.deb ...
#11 139.4 Unpacking libsasl2-2:amd64 (2.1.27+dfsg2-3ubuntu1.2) ...
#11 139.6 Selecting previously unselected package libldap-2.5-0:amd64.
#11 139.6 Preparing to unpack .../076-libldap-2.5-0_2.5.19+dfsg-0ubuntu0.22.04.1_amd64.deb ...
#11 139.6 Unpacking libldap-2.5-0:amd64 (2.5.19+dfsg-0ubuntu0.22.04.1) ...
#11 139.7 Selecting previously unselected package librtmp1:amd64.
#11 139.7 Preparing to unpack .../077-librtmp1_2.4+20151223.gitfa8646d.1-2build4_amd64.deb ...
#11 139.7 Unpacking librtmp1:amd64 (2.4+20151223.gitfa8646d.1-2build4) ...
#11 139.8 Selecting previously unselected package libssh-4:amd64.
#11 139.8 Preparing to unpack .../078-libssh-4_0.9.6-2ubuntu0.22.04.4_amd64.deb ...
#11 139.8 Unpacking libssh-4:amd64 (0.9.6-2ubuntu0.22.04.4) ...
#11 139.9 Selecting previously unselected package libcurl4:amd64.
#11 139.9 Preparing to unpack .../079-libcurl4_7.81.0-1ubuntu1.20_amd64.deb ...
#11 139.9 Unpacking libcurl4:amd64 (7.81.0-1ubuntu1.20) ...
#11 140.0 Selecting previously unselected package libjsoncpp25:amd64.
#11 140.0 Preparing to unpack .../080-libjsoncpp25_1.9.5-3_amd64.deb ...
#11 140.0 Unpacking libjsoncpp25:amd64 (1.9.5-3) ...
#11 140.1 Selecting previously unselected package librhash0:amd64.
#11 140.1 Preparing to unpack .../081-librhash0_1.4.2-1ubuntu1_amd64.deb ...
#11 140.1 Unpacking librhash0:amd64 (1.4.2-1ubuntu1) ...
#11 140.2 Selecting previously unselected package dh-elpa-helper.
#11 140.2 Preparing to unpack .../082-dh-elpa-helper_2.0.9ubuntu1_all.deb ...
#11 140.2 Unpacking dh-elpa-helper (2.0.9ubuntu1) ...
#11 140.3 Selecting previously unselected package emacsen-common.
#11 140.3 Preparing to unpack .../083-emacsen-common_3.0.4_all.deb ...
#11 140.5 Unpacking emacsen-common (3.0.4) ...
#11 140.6 Selecting previously unselected package cmake-data.
#11 140.6 Preparing to unpack .../084-cmake-data_3.22.1-1ubuntu1.22.04.2_all.deb ...
#11 140.7 Unpacking cmake-data (3.22.1-1ubuntu1.22.04.2) ...
#11 141.0 Selecting previously unselected package cmake.
#11 141.0 Preparing to unpack .../085-cmake_3.22.1-1ubuntu1.22.04.2_amd64.deb ...
#11 141.0 Unpacking cmake (3.22.1-1ubuntu1.22.04.2) ...
#11 141.2 Selecting previously unselected package libgfortran5:amd64.
#11 141.2 Preparing to unpack .../086-libgfortran5_12.3.0-1ubuntu1~22.04.2_amd64.deb ...
#11 141.2 Unpacking libgfortran5:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#11 141.3 Selecting previously unselected package libgfortran-11-dev:amd64.
#11 141.3 Preparing to unpack .../087-libgfortran-11-dev_11.4.0-1ubuntu1~22.04.2_amd64.deb ...
#11 141.3 Unpacking libgfortran-11-dev:amd64 (11.4.0-1ubuntu1~22.04.2) ...
#11 141.4 Selecting previously unselected package gfortran-11.
#11 141.4 Preparing to unpack .../088-gfortran-11_11.4.0-1ubuntu1~22.04.2_amd64.deb ...
#11 141.4 Unpacking gfortran-11 (11.4.0-1ubuntu1~22.04.2) ...
#11 141.7 Selecting previously unselected package libcurl3-gnutls:amd64.
#11 141.7 Preparing to unpack .../089-libcurl3-gnutls_7.81.0-1ubuntu1.20_amd64.deb ...
#11 141.7 Unpacking libcurl3-gnutls:amd64 (7.81.0-1ubuntu1.20) ...
#11 141.8 Selecting previously unselected package liberror-perl.
#11 141.8 Preparing to unpack .../090-liberror-perl_0.17029-1_all.deb ...
#11 141.8 Unpacking liberror-perl (0.17029-1) ...
#11 141.9 Selecting previously unselected package git-man.
#11 141.9 Preparing to unpack .../091-git-man_1%3a2.34.1-1ubuntu1.15_all.deb ...
#11 141.9 Unpacking git-man (1:2.34.1-1ubuntu1.15) ...
#11 142.0 Selecting previously unselected package git.
#11 142.0 Preparing to unpack .../092-git_1%3a2.34.1-1ubuntu1.15_amd64.deb ...
#11 142.1 Unpacking git (1:2.34.1-1ubuntu1.15) ...
#11 142.3 Selecting previously unselected package libnl-3-200:amd64.
#11 142.3 Preparing to unpack .../093-libnl-3-200_3.5.0-0.1_amd64.deb ...
#11 142.3 Unpacking libnl-3-200:amd64 (3.5.0-0.1) ...
#11 142.4 Selecting previously unselected package libnl-route-3-200:amd64.
#11 142.4 Preparing to unpack .../094-libnl-route-3-200_3.5.0-0.1_amd64.deb ...
#11 142.4 Unpacking libnl-route-3-200:amd64 (3.5.0-0.1) ...
#11 142.5 Selecting previously unselected package libibverbs1:amd64.
#11 142.5 Preparing to unpack .../095-libibverbs1_39.0-1_amd64.deb ...
#11 142.5 Unpacking libibverbs1:amd64 (39.0-1) ...
#11 142.6 Selecting previously unselected package ibverbs-providers:amd64.
#11 142.6 Preparing to unpack .../096-ibverbs-providers_39.0-1_amd64.deb ...
#11 142.7 Unpacking ibverbs-providers:amd64 (39.0-1) ...
#11 142.8 Selecting previously unselected package icu-devtools.
#11 142.8 Preparing to unpack .../097-icu-devtools_70.1-2_amd64.deb ...
#11 142.8 Unpacking icu-devtools (70.1-2) ...
#11 142.9 Selecting previously unselected package libboost1.74-dev:amd64.
#11 142.9 Preparing to unpack .../098-libboost1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 142.9 Unpacking libboost1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 144.3 Selecting previously unselected package libboost-dev:amd64.
#11 144.3 Preparing to unpack .../099-libboost-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 144.4 Unpacking libboost-dev:amd64 (1.74.0.3ubuntu7) ...
#11 144.4 Selecting previously unselected package libboost1.74-tools-dev.
#11 144.4 Preparing to unpack .../100-libboost1.74-tools-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 144.4 Unpacking libboost1.74-tools-dev (1.74.0-14ubuntu3) ...
#11 144.6 Selecting previously unselected package libboost-tools-dev.
#11 144.6 Preparing to unpack .../101-libboost-tools-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 144.6 Unpacking libboost-tools-dev (1.74.0.3ubuntu7) ...
#11 144.7 Selecting previously unselected package libboost-atomic1.74.0:amd64.
#11 144.7 Preparing to unpack .../102-libboost-atomic1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#11 144.7 Unpacking libboost-atomic1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 144.8 Selecting previously unselected package libboost-atomic1.74-dev:amd64.
#11 144.8 Preparing to unpack .../103-libboost-atomic1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 144.8 Unpacking libboost-atomic1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 144.9 Selecting previously unselected package libboost-atomic-dev:amd64.
#11 144.9 Preparing to unpack .../104-libboost-atomic-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 144.9 Unpacking libboost-atomic-dev:amd64 (1.74.0.3ubuntu7) ...
#11 145.0 Selecting previously unselected package libboost-chrono1.74.0:amd64.
#11 145.0 Preparing to unpack .../105-libboost-chrono1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#11 145.0 Unpacking libboost-chrono1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 145.1 Selecting previously unselected package libboost-chrono1.74-dev:amd64.
#11 145.1 Preparing to unpack .../106-libboost-chrono1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 145.1 Unpacking libboost-chrono1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 145.2 Selecting previously unselected package libboost-chrono-dev:amd64.
#11 145.2 Preparing to unpack .../107-libboost-chrono-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 145.2 Unpacking libboost-chrono-dev:amd64 (1.74.0.3ubuntu7) ...
#11 145.3 Selecting previously unselected package libboost-container1.74.0:amd64.
#11 145.3 Preparing to unpack .../108-libboost-container1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#11 145.3 Unpacking libboost-container1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 145.4 Selecting previously unselected package libboost-container1.74-dev:amd64.
#11 145.4 Preparing to unpack .../109-libboost-container1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 145.4 Unpacking libboost-container1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 145.5 Selecting previously unselected package libboost-container-dev:amd64.
#11 145.5 Preparing to unpack .../110-libboost-container-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 145.5 Unpacking libboost-container-dev:amd64 (1.74.0.3ubuntu7) ...
#11 145.6 Selecting previously unselected package libboost-date-time1.74.0:amd64.
#11 145.6 Preparing to unpack .../111-libboost-date-time1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#11 145.6 Unpacking libboost-date-time1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 145.7 Selecting previously unselected package libboost-serialization1.74.0:amd64.
#11 145.7 Preparing to unpack .../112-libboost-serialization1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#11 145.7 Unpacking libboost-serialization1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 145.8 Selecting previously unselected package libboost-serialization1.74-dev:amd64.
#11 145.8 Preparing to unpack .../113-libboost-serialization1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 145.8 Unpacking libboost-serialization1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 145.9 Selecting previously unselected package libboost-date-time1.74-dev:amd64.
#11 145.9 Preparing to unpack .../114-libboost-date-time1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 145.9 Unpacking libboost-date-time1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 146.0 Selecting previously unselected package libboost-system1.74.0:amd64.
#11 146.0 Preparing to unpack .../115-libboost-system1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#11 146.0 Unpacking libboost-system1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 146.1 Selecting previously unselected package libboost-system1.74-dev:amd64.
#11 146.1 Preparing to unpack .../116-libboost-system1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 146.1 Unpacking libboost-system1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 146.3 Selecting previously unselected package libboost-thread1.74.0:amd64.
#11 146.3 Preparing to unpack .../117-libboost-thread1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#11 146.3 Unpacking libboost-thread1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 146.4 Selecting previously unselected package libboost-thread1.74-dev:amd64.
#11 146.4 Preparing to unpack .../118-libboost-thread1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 146.4 Unpacking libboost-thread1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 146.5 Selecting previously unselected package libboost-context1.74.0:amd64.
#11 146.5 Preparing to unpack .../119-libboost-context1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#11 146.5 Unpacking libboost-context1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 146.6 Selecting previously unselected package libboost-context1.74-dev:amd64.
#11 146.6 Preparing to unpack .../120-libboost-context1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 146.6 Unpacking libboost-context1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 146.7 Selecting previously unselected package libboost-context-dev:amd64.
#11 146.7 Preparing to unpack .../121-libboost-context-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 146.7 Unpacking libboost-context-dev:amd64 (1.74.0.3ubuntu7) ...
#11 146.8 Selecting previously unselected package libboost-coroutine1.74.0:amd64.
#11 146.8 Preparing to unpack .../122-libboost-coroutine1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#11 146.8 Unpacking libboost-coroutine1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 146.9 Selecting previously unselected package libboost-coroutine1.74-dev:amd64.
#11 146.9 Preparing to unpack .../123-libboost-coroutine1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 146.9 Unpacking libboost-coroutine1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 147.0 Selecting previously unselected package libboost-coroutine-dev:amd64.
#11 147.0 Preparing to unpack .../124-libboost-coroutine-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 147.0 Unpacking libboost-coroutine-dev:amd64 (1.74.0.3ubuntu7) ...
#11 147.1 Selecting previously unselected package libboost-date-time-dev:amd64.
#11 147.1 Preparing to unpack .../125-libboost-date-time-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 147.1 Unpacking libboost-date-time-dev:amd64 (1.74.0.3ubuntu7) ...
#11 147.2 Selecting previously unselected package libboost-exception1.74-dev:amd64.
#11 147.2 Preparing to unpack .../126-libboost-exception1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 147.2 Unpacking libboost-exception1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 147.5 Selecting previously unselected package libboost-exception-dev:amd64.
#11 147.5 Preparing to unpack .../127-libboost-exception-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 147.5 Unpacking libboost-exception-dev:amd64 (1.74.0.3ubuntu7) ...
#11 147.6 Selecting previously unselected package libboost-filesystem1.74.0:amd64.
#11 147.6 Preparing to unpack .../128-libboost-filesystem1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#11 147.6 Unpacking libboost-filesystem1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 147.7 Selecting previously unselected package libboost-filesystem1.74-dev:amd64.
#11 147.7 Preparing to unpack .../129-libboost-filesystem1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 147.7 Unpacking libboost-filesystem1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 147.8 Selecting previously unselected package libboost-fiber1.74.0:amd64.
#11 147.8 Preparing to unpack .../130-libboost-fiber1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#11 147.8 Unpacking libboost-fiber1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 147.9 Selecting previously unselected package libboost-fiber1.74-dev:amd64.
#11 147.9 Preparing to unpack .../131-libboost-fiber1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 147.9 Unpacking libboost-fiber1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 148.0 Selecting previously unselected package libboost-fiber-dev:amd64.
#11 148.0 Preparing to unpack .../132-libboost-fiber-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 148.0 Unpacking libboost-fiber-dev:amd64 (1.74.0.3ubuntu7) ...
#11 148.1 Selecting previously unselected package libboost-filesystem-dev:amd64.
#11 148.1 Preparing to unpack .../133-libboost-filesystem-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 148.1 Unpacking libboost-filesystem-dev:amd64 (1.74.0.3ubuntu7) ...
#11 148.2 Selecting previously unselected package libboost-regex1.74.0:amd64.
#11 148.2 Preparing to unpack .../134-libboost-regex1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#11 148.2 Unpacking libboost-regex1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 148.3 Selecting previously unselected package libboost-graph1.74.0:amd64.
#11 148.4 Preparing to unpack .../135-libboost-graph1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#11 148.4 Unpacking libboost-graph1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 148.5 Selecting previously unselected package libicu-dev:amd64.
#11 148.5 Preparing to unpack .../136-libicu-dev_70.1-2_amd64.deb ...
#11 148.5 Unpacking libicu-dev:amd64 (70.1-2) ...
#11 148.8 Selecting previously unselected package libboost-regex1.74-dev:amd64.
#11 148.8 Preparing to unpack .../137-libboost-regex1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 148.8 Unpacking libboost-regex1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 148.9 Selecting previously unselected package libboost-test1.74.0:amd64.
#11 148.9 Preparing to unpack .../138-libboost-test1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#11 148.9 Unpacking libboost-test1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 149.1 Selecting previously unselected package libboost-test1.74-dev:amd64.
#11 149.1 Preparing to unpack .../139-libboost-test1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 149.1 Unpacking libboost-test1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 149.2 Selecting previously unselected package libboost-graph1.74-dev:amd64.
#11 149.2 Preparing to unpack .../140-libboost-graph1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 149.2 Unpacking libboost-graph1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 149.3 Selecting previously unselected package libboost-graph-dev:amd64.
#11 149.3 Preparing to unpack .../141-libboost-graph-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 149.3 Unpacking libboost-graph-dev:amd64 (1.74.0.3ubuntu7) ...
#11 149.4 Selecting previously unselected package libevent-core-2.1-7:amd64.
#11 149.4 Preparing to unpack .../142-libevent-core-2.1-7_2.1.12-stable-1build3_amd64.deb ...
#11 149.4 Unpacking libevent-core-2.1-7:amd64 (2.1.12-stable-1build3) ...
#11 149.5 Selecting previously unselected package libevent-pthreads-2.1-7:amd64.
#11 149.5 Preparing to unpack .../143-libevent-pthreads-2.1-7_2.1.12-stable-1build3_amd64.deb ...
#11 149.5 Unpacking libevent-pthreads-2.1-7:amd64 (2.1.12-stable-1build3) ...
#11 149.6 Selecting previously unselected package libpsm-infinipath1.
#11 149.6 Preparing to unpack .../144-libpsm-infinipath1_3.3+20.604758e7-6.1_amd64.deb ...
#11 149.6 Unpacking libpsm-infinipath1 (3.3+20.604758e7-6.1) ...
#11 149.7 Selecting previously unselected package libpsm2-2.
#11 149.7 Preparing to unpack .../145-libpsm2-2_11.2.185-1_amd64.deb ...
#11 149.7 Unpacking libpsm2-2 (11.2.185-1) ...
#11 149.8 Selecting previously unselected package librdmacm1:amd64.
#11 149.8 Preparing to unpack .../146-librdmacm1_39.0-1_amd64.deb ...
#11 149.8 Unpacking librdmacm1:amd64 (39.0-1) ...
#11 149.9 Selecting previously unselected package libfabric1:amd64.
#11 149.9 Preparing to unpack .../147-libfabric1_1.11.0-3_amd64.deb ...
#11 149.9 Unpacking libfabric1:amd64 (1.11.0-3) ...
#11 150.0 Selecting previously unselected package libhwloc15:amd64.
#11 150.0 Preparing to unpack .../148-libhwloc15_2.7.0-2ubuntu1_amd64.deb ...
#11 150.0 Unpacking libhwloc15:amd64 (2.7.0-2ubuntu1) ...
#11 150.1 Selecting previously unselected package libpciaccess0:amd64.
#11 150.1 Preparing to unpack .../149-libpciaccess0_0.16-3_amd64.deb ...
#11 150.1 Unpacking libpciaccess0:amd64 (0.16-3) ...
#11 150.2 Selecting previously unselected package libxnvctrl0:amd64.
#11 150.2 Preparing to unpack .../150-libxnvctrl0_510.47.03-0ubuntu1_amd64.deb ...
#11 150.2 Unpacking libxnvctrl0:amd64 (510.47.03-0ubuntu1) ...
#11 150.3 Selecting previously unselected package ocl-icd-libopencl1:amd64.
#11 150.3 Preparing to unpack .../151-ocl-icd-libopencl1_2.2.14-3_amd64.deb ...
#11 150.3 Unpacking ocl-icd-libopencl1:amd64 (2.2.14-3) ...
#11 150.4 Selecting previously unselected package libhwloc-plugins:amd64.
#11 150.4 Preparing to unpack .../152-libhwloc-plugins_2.7.0-2ubuntu1_amd64.deb ...
#11 150.4 Unpacking libhwloc-plugins:amd64 (2.7.0-2ubuntu1) ...
#11 150.5 Selecting previously unselected package libpmix2:amd64.
#11 150.5 Preparing to unpack .../153-libpmix2_4.1.2-2ubuntu1_amd64.deb ...
#11 150.5 Unpacking libpmix2:amd64 (4.1.2-2ubuntu1) ...
#11 150.6 Selecting previously unselected package libucx0:amd64.
#11 150.6 Preparing to unpack .../154-libucx0_1.12.1~rc2-1_amd64.deb ...
#11 150.6 Unpacking libucx0:amd64 (1.12.1~rc2-1) ...
#11 150.7 Selecting previously unselected package libopenmpi3:amd64.
#11 150.7 Preparing to unpack .../155-libopenmpi3_4.1.2-2ubuntu1_amd64.deb ...
#11 150.7 Unpacking libopenmpi3:amd64 (4.1.2-2ubuntu1) ...
#11 150.9 Selecting previously unselected package libboost-mpi1.74.0.
#11 150.9 Preparing to unpack .../156-libboost-mpi1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#11 150.9 Unpacking libboost-mpi1.74.0 (1.74.0-14ubuntu3) ...
#11 151.0 Selecting previously unselected package libboost-graph-parallel1.74.0.
#11 151.0 Preparing to unpack .../157-libboost-graph-parallel1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#11 151.0 Unpacking libboost-graph-parallel1.74.0 (1.74.0-14ubuntu3) ...
#11 151.1 Selecting previously unselected package libboost-graph-parallel1.74-dev.
#11 151.1 Preparing to unpack .../158-libboost-graph-parallel1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 151.1 Unpacking libboost-graph-parallel1.74-dev (1.74.0-14ubuntu3) ...
#11 151.2 Selecting previously unselected package libboost-graph-parallel-dev.
#11 151.2 Preparing to unpack .../159-libboost-graph-parallel-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 151.2 Unpacking libboost-graph-parallel-dev (1.74.0.3ubuntu7) ...
#11 151.3 Selecting previously unselected package libboost-iostreams1.74.0:amd64.
#11 151.3 Preparing to unpack .../160-libboost-iostreams1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#11 151.3 Unpacking libboost-iostreams1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 151.4 Selecting previously unselected package libboost-iostreams1.74-dev:amd64.
#11 151.4 Preparing to unpack .../161-libboost-iostreams1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 151.4 Unpacking libboost-iostreams1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 151.6 Selecting previously unselected package libboost-iostreams-dev:amd64.
#11 151.6 Preparing to unpack .../162-libboost-iostreams-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 151.6 Unpacking libboost-iostreams-dev:amd64 (1.74.0.3ubuntu7) ...
#11 151.7 Selecting previously unselected package libboost-locale1.74.0:amd64.
#11 151.7 Preparing to unpack .../163-libboost-locale1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#11 151.7 Unpacking libboost-locale1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 151.8 Selecting previously unselected package libboost-locale1.74-dev:amd64.
#11 151.8 Preparing to unpack .../164-libboost-locale1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 151.8 Unpacking libboost-locale1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 151.9 Selecting previously unselected package libboost-locale-dev:amd64.
#11 151.9 Preparing to unpack .../165-libboost-locale-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 151.9 Unpacking libboost-locale-dev:amd64 (1.74.0.3ubuntu7) ...
#11 152.0 Selecting previously unselected package libboost-log1.74.0.
#11 152.0 Preparing to unpack .../166-libboost-log1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#11 152.0 Unpacking libboost-log1.74.0 (1.74.0-14ubuntu3) ...
#11 152.1 Selecting previously unselected package libboost-log1.74-dev.
#11 152.1 Preparing to unpack .../167-libboost-log1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 152.1 Unpacking libboost-log1.74-dev (1.74.0-14ubuntu3) ...
#11 152.3 Selecting previously unselected package libboost-log-dev.
#11 152.3 Preparing to unpack .../168-libboost-log-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 152.3 Unpacking libboost-log-dev (1.74.0.3ubuntu7) ...
#11 152.4 Selecting previously unselected package libboost-math1.74.0:amd64.
#11 152.4 Preparing to unpack .../169-libboost-math1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#11 152.4 Unpacking libboost-math1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 152.5 Selecting previously unselected package libboost-math1.74-dev:amd64.
#11 152.5 Preparing to unpack .../170-libboost-math1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 152.5 Unpacking libboost-math1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 152.6 Selecting previously unselected package libboost-math-dev:amd64.
#11 152.6 Preparing to unpack .../171-libboost-math-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 152.6 Unpacking libboost-math-dev:amd64 (1.74.0.3ubuntu7) ...
#11 152.7 Selecting previously unselected package openmpi-common.
#11 152.7 Preparing to unpack .../172-openmpi-common_4.1.2-2ubuntu1_all.deb ...
#11 152.7 Unpacking openmpi-common (4.1.2-2ubuntu1) ...
#11 152.8 Selecting previously unselected package libnl-3-dev:amd64.
#11 152.8 Preparing to unpack .../173-libnl-3-dev_3.5.0-0.1_amd64.deb ...
#11 152.8 Unpacking libnl-3-dev:amd64 (3.5.0-0.1) ...
#11 152.9 Selecting previously unselected package libnl-route-3-dev:amd64.
#11 152.9 Preparing to unpack .../174-libnl-route-3-dev_3.5.0-0.1_amd64.deb ...
#11 152.9 Unpacking libnl-route-3-dev:amd64 (3.5.0-0.1) ...
#11 153.0 Selecting previously unselected package libibverbs-dev:amd64.
#11 153.0 Preparing to unpack .../175-libibverbs-dev_39.0-1_amd64.deb ...
#11 153.0 Unpacking libibverbs-dev:amd64 (39.0-1) ...
#11 153.1 Selecting previously unselected package libnuma-dev:amd64.
#11 153.1 Preparing to unpack .../176-libnuma-dev_2.0.14-3ubuntu2_amd64.deb ...
#11 153.1 Unpacking libnuma-dev:amd64 (2.0.14-3ubuntu2) ...
#11 153.2 Selecting previously unselected package libltdl7:amd64.
#11 153.2 Preparing to unpack .../177-libltdl7_2.4.6-15build2_amd64.deb ...
#11 153.2 Unpacking libltdl7:amd64 (2.4.6-15build2) ...
#11 153.3 Selecting previously unselected package libltdl-dev:amd64.
#11 153.3 Preparing to unpack .../178-libltdl-dev_2.4.6-15build2_amd64.deb ...
#11 153.3 Unpacking libltdl-dev:amd64 (2.4.6-15build2) ...
#11 153.5 Selecting previously unselected package libhwloc-dev:amd64.
#11 153.5 Preparing to unpack .../179-libhwloc-dev_2.7.0-2ubuntu1_amd64.deb ...
#11 153.5 Unpacking libhwloc-dev:amd64 (2.7.0-2ubuntu1) ...
#11 153.6 Selecting previously unselected package libevent-2.1-7:amd64.
#11 153.6 Preparing to unpack .../180-libevent-2.1-7_2.1.12-stable-1build3_amd64.deb ...
#11 153.6 Unpacking libevent-2.1-7:amd64 (2.1.12-stable-1build3) ...
#11 153.8 Selecting previously unselected package libevent-extra-2.1-7:amd64.
#11 153.8 Preparing to unpack .../181-libevent-extra-2.1-7_2.1.12-stable-1build3_amd64.deb ...
#11 153.8 Unpacking libevent-extra-2.1-7:amd64 (2.1.12-stable-1build3) ...
#11 153.9 Selecting previously unselected package libevent-openssl-2.1-7:amd64.
#11 153.9 Preparing to unpack .../182-libevent-openssl-2.1-7_2.1.12-stable-1build3_amd64.deb ...
#11 153.9 Unpacking libevent-openssl-2.1-7:amd64 (2.1.12-stable-1build3) ...
#11 154.0 Selecting previously unselected package libevent-dev.
#11 154.0 Preparing to unpack .../183-libevent-dev_2.1.12-stable-1build3_amd64.deb ...
#11 154.0 Unpacking libevent-dev (2.1.12-stable-1build3) ...
#11 154.1 Selecting previously unselected package zlib1g-dev:amd64.
#11 154.1 Preparing to unpack .../184-zlib1g-dev_1%3a1.2.11.dfsg-2ubuntu9.2_amd64.deb ...
#11 154.1 Unpacking zlib1g-dev:amd64 (1:1.2.11.dfsg-2ubuntu9.2) ...
#11 154.2 Selecting previously unselected package libpmix-dev:amd64.
#11 154.2 Preparing to unpack .../185-libpmix-dev_4.1.2-2ubuntu1_amd64.deb ...
#11 154.2 Unpacking libpmix-dev:amd64 (4.1.2-2ubuntu1) ...
#11 154.4 Selecting previously unselected package libjs-jquery.
#11 154.4 Preparing to unpack .../186-libjs-jquery_3.6.0+dfsg+~3.5.13-1_all.deb ...
#11 154.4 Unpacking libjs-jquery (3.6.0+dfsg+~3.5.13-1) ...
#11 154.5 Selecting previously unselected package libjs-jquery-ui.
#11 154.5 Preparing to unpack .../187-libjs-jquery-ui_1.13.1+dfsg-1_all.deb ...
#11 154.5 Unpacking libjs-jquery-ui (1.13.1+dfsg-1) ...
#11 154.7 Selecting previously unselected package openmpi-bin.
#11 154.7 Preparing to unpack .../188-openmpi-bin_4.1.2-2ubuntu1_amd64.deb ...
#11 154.7 Unpacking openmpi-bin (4.1.2-2ubuntu1) ...
#11 154.8 Selecting previously unselected package libopenmpi-dev:amd64.
#11 154.8 Preparing to unpack .../189-libopenmpi-dev_4.1.2-2ubuntu1_amd64.deb ...
#11 154.9 Unpacking libopenmpi-dev:amd64 (4.1.2-2ubuntu1) ...
#11 155.1 Selecting previously unselected package mpi-default-dev.
#11 155.1 Preparing to unpack .../190-mpi-default-dev_1.14_amd64.deb ...
#11 155.1 Unpacking mpi-default-dev (1.14) ...
#11 155.2 Selecting previously unselected package libboost-mpi1.74-dev.
#11 155.2 Preparing to unpack .../191-libboost-mpi1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 155.2 Unpacking libboost-mpi1.74-dev (1.74.0-14ubuntu3) ...
#11 155.4 Selecting previously unselected package libboost-mpi-dev.
#11 155.4 Preparing to unpack .../192-libboost-mpi-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 155.4 Unpacking libboost-mpi-dev (1.74.0.3ubuntu7) ...
#11 155.5 Selecting previously unselected package libboost-python1.74.0.
#11 155.5 Preparing to unpack .../193-libboost-python1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#11 155.5 Unpacking libboost-python1.74.0 (1.74.0-14ubuntu3) ...
#11 155.6 Selecting previously unselected package mpi-default-bin.
#11 155.6 Preparing to unpack .../194-mpi-default-bin_1.14_amd64.deb ...
#11 155.6 Unpacking mpi-default-bin (1.14) ...
#11 155.7 Selecting previously unselected package libboost-mpi-python1.74.0.
#11 155.7 Preparing to unpack .../195-libboost-mpi-python1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#11 155.7 Unpacking libboost-mpi-python1.74.0 (1.74.0-14ubuntu3) ...
#11 155.9 Selecting previously unselected package libboost-mpi-python1.74-dev.
#11 155.9 Preparing to unpack .../196-libboost-mpi-python1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 155.9 Unpacking libboost-mpi-python1.74-dev (1.74.0-14ubuntu3) ...
#11 156.0 Selecting previously unselected package libboost-mpi-python-dev.
#11 156.0 Preparing to unpack .../197-libboost-mpi-python-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 156.0 Unpacking libboost-mpi-python-dev (1.74.0.3ubuntu7) ...
#11 156.1 Selecting previously unselected package libboost-numpy1.74.0.
#11 156.1 Preparing to unpack .../198-libboost-numpy1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#11 156.1 Unpacking libboost-numpy1.74.0 (1.74.0-14ubuntu3) ...
#11 156.2 Selecting previously unselected package libboost-numpy1.74-dev.
#11 156.2 Preparing to unpack .../199-libboost-numpy1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 156.2 Unpacking libboost-numpy1.74-dev (1.74.0-14ubuntu3) ...
#11 156.3 Selecting previously unselected package libboost-numpy-dev.
#11 156.3 Preparing to unpack .../200-libboost-numpy-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 156.3 Unpacking libboost-numpy-dev (1.74.0.3ubuntu7) ...
#11 156.4 Selecting previously unselected package libboost-program-options1.74.0:amd64.
#11 156.4 Preparing to unpack .../201-libboost-program-options1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#11 156.4 Unpacking libboost-program-options1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 156.5 Selecting previously unselected package libboost-program-options1.74-dev:amd64.
#11 156.5 Preparing to unpack .../202-libboost-program-options1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 156.5 Unpacking libboost-program-options1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 156.6 Selecting previously unselected package libboost-program-options-dev:amd64.
#11 156.6 Preparing to unpack .../203-libboost-program-options-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 156.6 Unpacking libboost-program-options-dev:amd64 (1.74.0.3ubuntu7) ...
#11 156.7 Selecting previously unselected package libpython3.10:amd64.
#11 156.7 Preparing to unpack .../204-libpython3.10_3.10.12-1~22.04.11_amd64.deb ...
#11 156.7 Unpacking libpython3.10:amd64 (3.10.12-1~22.04.11) ...
#11 156.8 Selecting previously unselected package libexpat1-dev:amd64.
#11 156.8 Preparing to unpack .../205-libexpat1-dev_2.4.7-1ubuntu0.6_amd64.deb ...
#11 156.8 Unpacking libexpat1-dev:amd64 (2.4.7-1ubuntu0.6) ...
#11 156.9 Selecting previously unselected package libpython3.10-dev:amd64.
#11 156.9 Preparing to unpack .../206-libpython3.10-dev_3.10.12-1~22.04.11_amd64.deb ...
#11 156.9 Unpacking libpython3.10-dev:amd64 (3.10.12-1~22.04.11) ...
#11 157.1 Selecting previously unselected package libpython3-dev:amd64.
#11 157.1 Preparing to unpack .../207-libpython3-dev_3.10.6-1~22.04.1_amd64.deb ...
#11 157.2 Unpacking libpython3-dev:amd64 (3.10.6-1~22.04.1) ...
#11 157.2 Selecting previously unselected package python3.10-dev.
#11 157.2 Preparing to unpack .../208-python3.10-dev_3.10.12-1~22.04.11_amd64.deb ...
#11 157.2 Unpacking python3.10-dev (3.10.12-1~22.04.11) ...
#11 157.3 Selecting previously unselected package python3-lib2to3.
#11 157.3 Preparing to unpack .../209-python3-lib2to3_3.10.8-1~22.04_all.deb ...
#11 157.4 Unpacking python3-lib2to3 (3.10.8-1~22.04) ...
#11 157.5 Selecting previously unselected package python3-distutils.
#11 157.5 Preparing to unpack .../210-python3-distutils_3.10.8-1~22.04_all.deb ...
#11 157.5 Unpacking python3-distutils (3.10.8-1~22.04) ...
#11 157.5 Selecting previously unselected package libjs-underscore.
#11 157.6 Preparing to unpack .../211-libjs-underscore_1.13.2~dfsg-2_all.deb ...
#11 157.6 Unpacking libjs-underscore (1.13.2~dfsg-2) ...
#11 157.6 Selecting previously unselected package libjs-sphinxdoc.
#11 157.7 Preparing to unpack .../212-libjs-sphinxdoc_4.3.2-1_all.deb ...
#11 157.7 Unpacking libjs-sphinxdoc (4.3.2-1) ...
#11 157.7 Selecting previously unselected package python3-dev.
#11 157.7 Preparing to unpack .../213-python3-dev_3.10.6-1~22.04.1_amd64.deb ...
#11 157.7 Unpacking python3-dev (3.10.6-1~22.04.1) ...
#11 157.8 Selecting previously unselected package libboost-python1.74-dev.
#11 157.8 Preparing to unpack .../214-libboost-python1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 157.8 Unpacking libboost-python1.74-dev (1.74.0-14ubuntu3) ...
#11 157.9 Selecting previously unselected package libboost-python-dev.
#11 158.0 Preparing to unpack .../215-libboost-python-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 158.0 Unpacking libboost-python-dev (1.74.0.3ubuntu7) ...
#11 158.0 Selecting previously unselected package libboost-random1.74.0:amd64.
#11 158.0 Preparing to unpack .../216-libboost-random1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#11 158.0 Unpacking libboost-random1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 158.1 Selecting previously unselected package libboost-random1.74-dev:amd64.
#11 158.1 Preparing to unpack .../217-libboost-random1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 158.1 Unpacking libboost-random1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 158.2 Selecting previously unselected package libboost-random-dev:amd64.
#11 158.3 Preparing to unpack .../218-libboost-random-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 158.3 Unpacking libboost-random-dev:amd64 (1.74.0.3ubuntu7) ...
#11 158.4 Selecting previously unselected package libboost-regex-dev:amd64.
#11 158.4 Preparing to unpack .../219-libboost-regex-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 158.4 Unpacking libboost-regex-dev:amd64 (1.74.0.3ubuntu7) ...
#11 158.4 Selecting previously unselected package libboost-serialization-dev:amd64.
#11 158.5 Preparing to unpack .../220-libboost-serialization-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 158.5 Unpacking libboost-serialization-dev:amd64 (1.74.0.3ubuntu7) ...
#11 158.5 Selecting previously unselected package libboost-stacktrace1.74.0:amd64.
#11 158.5 Preparing to unpack .../221-libboost-stacktrace1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#11 158.5 Unpacking libboost-stacktrace1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 158.6 Selecting previously unselected package libboost-stacktrace1.74-dev:amd64.
#11 158.6 Preparing to unpack .../222-libboost-stacktrace1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 158.7 Unpacking libboost-stacktrace1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 158.8 Selecting previously unselected package libboost-stacktrace-dev:amd64.
#11 158.8 Preparing to unpack .../223-libboost-stacktrace-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 158.8 Unpacking libboost-stacktrace-dev:amd64 (1.74.0.3ubuntu7) ...
#11 158.9 Selecting previously unselected package libboost-system-dev:amd64.
#11 158.9 Preparing to unpack .../224-libboost-system-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 158.9 Unpacking libboost-system-dev:amd64 (1.74.0.3ubuntu7) ...
#11 158.9 Selecting previously unselected package libboost-test-dev:amd64.
#11 159.0 Preparing to unpack .../225-libboost-test-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 159.0 Unpacking libboost-test-dev:amd64 (1.74.0.3ubuntu7) ...
#11 159.0 Selecting previously unselected package libboost-thread-dev:amd64.
#11 159.0 Preparing to unpack .../226-libboost-thread-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 159.0 Unpacking libboost-thread-dev:amd64 (1.74.0.3ubuntu7) ...
#11 159.1 Selecting previously unselected package libboost-timer1.74.0:amd64.
#11 159.1 Preparing to unpack .../227-libboost-timer1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#11 159.1 Unpacking libboost-timer1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 159.2 Selecting previously unselected package libboost-timer1.74-dev:amd64.
#11 159.2 Preparing to unpack .../228-libboost-timer1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 159.3 Unpacking libboost-timer1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 159.4 Selecting previously unselected package libboost-timer-dev:amd64.
#11 159.4 Preparing to unpack .../229-libboost-timer-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 159.4 Unpacking libboost-timer-dev:amd64 (1.74.0.3ubuntu7) ...
#11 159.5 Selecting previously unselected package libboost-type-erasure1.74.0:amd64.
#11 159.5 Preparing to unpack .../230-libboost-type-erasure1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#11 159.5 Unpacking libboost-type-erasure1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 159.6 Selecting previously unselected package libboost-type-erasure1.74-dev:amd64.
#11 159.6 Preparing to unpack .../231-libboost-type-erasure1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 159.6 Unpacking libboost-type-erasure1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 159.7 Selecting previously unselected package libboost-type-erasure-dev:amd64.
#11 159.7 Preparing to unpack .../232-libboost-type-erasure-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 159.7 Unpacking libboost-type-erasure-dev:amd64 (1.74.0.3ubuntu7) ...
#11 159.8 Selecting previously unselected package libboost-wave1.74.0:amd64.
#11 159.8 Preparing to unpack .../233-libboost-wave1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#11 159.8 Unpacking libboost-wave1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 159.9 Selecting previously unselected package libboost-wave1.74-dev:amd64.
#11 159.9 Preparing to unpack .../234-libboost-wave1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 159.9 Unpacking libboost-wave1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 160.1 Selecting previously unselected package libboost-wave-dev:amd64.
#11 160.1 Preparing to unpack .../235-libboost-wave-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 160.1 Unpacking libboost-wave-dev:amd64 (1.74.0.3ubuntu7) ...
#11 160.2 Selecting previously unselected package libboost-nowide1.74.0.
#11 160.2 Preparing to unpack .../236-libboost-nowide1.74.0_1.74.0-14ubuntu3_amd64.deb ...
#11 160.2 Unpacking libboost-nowide1.74.0 (1.74.0-14ubuntu3) ...
#11 160.3 Selecting previously unselected package libboost-nowide1.74-dev.
#11 160.3 Preparing to unpack .../237-libboost-nowide1.74-dev_1.74.0-14ubuntu3_amd64.deb ...
#11 160.3 Unpacking libboost-nowide1.74-dev (1.74.0-14ubuntu3) ...
#11 160.5 Selecting previously unselected package libboost-nowide-dev.
#11 160.5 Preparing to unpack .../238-libboost-nowide-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 160.5 Unpacking libboost-nowide-dev (1.74.0.3ubuntu7) ...
#11 160.6 Selecting previously unselected package libboost-all-dev.
#11 160.6 Preparing to unpack .../239-libboost-all-dev_1.74.0.3ubuntu7_amd64.deb ...
#11 160.6 Unpacking libboost-all-dev (1.74.0.3ubuntu7) ...
#11 160.7 Selecting previously unselected package libminiupnpc17:amd64.
#11 160.7 Preparing to unpack .../240-libminiupnpc17_2.2.3-1build1_amd64.deb ...
#11 160.7 Unpacking libminiupnpc17:amd64 (2.2.3-1build1) ...
#11 160.8 Selecting previously unselected package libminiupnpc-dev:amd64.
#11 160.8 Preparing to unpack .../241-libminiupnpc-dev_2.2.3-1build1_amd64.deb ...
#11 160.8 Unpacking libminiupnpc-dev:amd64 (2.2.3-1build1) ...
#11 160.9 Selecting previously unselected package libpthread-stubs0-dev:amd64.
#11 160.9 Preparing to unpack .../242-libpthread-stubs0-dev_0.4-1build2_amd64.deb ...
#11 160.9 Unpacking libpthread-stubs0-dev:amd64 (0.4-1build2) ...
#11 161.0 Selecting previously unselected package libssl-dev:amd64.
#11 161.0 Preparing to unpack .../243-libssl-dev_3.0.2-0ubuntu1.19_amd64.deb ...
#11 161.0 Unpacking libssl-dev:amd64 (3.0.2-0ubuntu1.19) ...
#11 161.2 Selecting previously unselected package pkg-config.
#11 161.2 Preparing to unpack .../244-pkg-config_0.29.2-1ubuntu3_amd64.deb ...
#11 161.2 Unpacking pkg-config (0.29.2-1ubuntu3) ...
#11 161.3 Setting up libboost-chrono1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 161.3 Setting up media-types (7.0.0) ...
#11 161.3 Setting up libboost-system1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 161.3 Setting up gcc-11-base:amd64 (11.4.0-1ubuntu1~22.04.2) ...
#11 161.3 Setting up libpciaccess0:amd64 (0.16-3) ...
#11 161.3 Setting up libxau6:amd64 (1:1.0.9-1build5) ...
#11 161.3 Setting up lto-disabled-list (24) ...
#11 161.3 Setting up libpsl5:amd64 (0.21.0-1.2build2) ...
#11 161.3 Setting up libboost-atomic1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 161.3 Setting up libglib2.0-0:amd64 (2.72.4-0ubuntu2.6) ...
#11 161.4 No schema files found: doing nothing.
#11 161.5 Setting up libboost-iostreams1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 161.5 Setting up libboost-program-options1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 161.5 Setting up libcbor0.8:amd64 (0.8.0-2ubuntu1) ...
#11 161.5 Setting up libbrotli1:amd64 (1.0.9-2build6) ...
#11 161.5 Setting up libsqlite3-0:amd64 (3.37.2-2ubuntu0.5) ...
#11 161.5 Setting up binutils-common:amd64 (2.38-4ubuntu2.8) ...
#11 161.5 Setting up libboost-stacktrace1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 161.5 Setting up libnghttp2-14:amd64 (1.43.0-1ubuntu0.2) ...
#11 161.5 Setting up linux-libc-dev:amd64 (5.15.0-153.163) ...
#11 161.5 Setting up libctf-nobfd0:amd64 (2.38-4ubuntu2.8) ...
#11 161.6 Setting up libboost-nowide1.74.0 (1.74.0-14ubuntu3) ...
#11 161.6 Setting up libboost-filesystem1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 161.6 Setting up libgomp1:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#11 161.6 Setting up perl-modules-5.34 (5.34.0-3ubuntu1.5) ...
#11 161.6 Setting up bzip2 (1.0.8-5build1) ...
#11 161.6 Setting up libminiupnpc17:amd64 (2.2.3-1build1) ...
#11 161.6 Setting up libpthread-stubs0-dev:amd64 (0.4-1build2) ...
#11 161.6 Setting up libasan6:amd64 (11.4.0-1ubuntu1~22.04.2) ...
#11 161.6 Setting up libsasl2-modules-db:amd64 (2.1.27+dfsg2-3ubuntu1.2) ...
#11 161.6 Setting up autotools-dev (20220109.1) ...
#11 161.6 Setting up libtirpc-dev:amd64 (1.3.2-2ubuntu0.1) ...
#11 161.6 Setting up libuv1:amd64 (1.43.0-1ubuntu0.1) ...
#11 161.6 Setting up rpcsvc-proto (1.4.2-0ubuntu6) ...
#11 161.6 Setting up libboost-test1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 161.6 Setting up emacsen-common (3.0.4) ...
#11 161.9 Setting up libx11-data (2:1.7.5-1ubuntu0.3) ...
#11 161.9 Setting up make (4.3-4.1build1) ...
#11 161.9 Setting up libmpfr6:amd64 (4.1.0-3build3) ...
#11 161.9 Setting up librtmp1:amd64 (2.4+20151223.gitfa8646d.1-2build4) ...
#11 162.0 Setting up dh-elpa-helper (2.0.9ubuntu1) ...
#11 162.0 Setting up libsigsegv2:amd64 (2.13-1ubuntu3) ...
#11 162.0 Setting up xz-utils (5.2.5-2ubuntu1) ...
#11 162.0 update-alternatives: using /usr/bin/xz to provide /usr/bin/lzma (lzma) in auto mode
#11 162.0 update-alternatives: warning: skip creation of /usr/share/man/man1/lzma.1.gz because associated file /usr/share/man/man1/xz.1.gz (of link group lzma) doesn't exist
#11 162.0 update-alternatives: warning: skip creation of /usr/share/man/man1/unlzma.1.gz because associated file /usr/share/man/man1/unxz.1.gz (of link group lzma) doesn't exist
#11 162.0 update-alternatives: warning: skip creation of /usr/share/man/man1/lzcat.1.gz because associated file /usr/share/man/man1/xzcat.1.gz (of link group lzma) doesn't exist
#11 162.0 update-alternatives: warning: skip creation of /usr/share/man/man1/lzmore.1.gz because associated file /usr/share/man/man1/xzmore.1.gz (of link group lzma) doesn't exist
#11 162.0 update-alternatives: warning: skip creation of /usr/share/man/man1/lzless.1.gz because associated file /usr/share/man/man1/xzless.1.gz (of link group lzma) doesn't exist
#11 162.0 update-alternatives: warning: skip creation of /usr/share/man/man1/lzdiff.1.gz because associated file /usr/share/man/man1/xzdiff.1.gz (of link group lzma) doesn't exist
#11 162.0 update-alternatives: warning: skip creation of /usr/share/man/man1/lzcmp.1.gz because associated file /usr/share/man/man1/xzcmp.1.gz (of link group lzma) doesn't exist
#11 162.0 update-alternatives: warning: skip creation of /usr/share/man/man1/lzgrep.1.gz because associated file /usr/share/man/man1/xzgrep.1.gz (of link group lzma) doesn't exist
#11 162.0 update-alternatives: warning: skip creation of /usr/share/man/man1/lzegrep.1.gz because associated file /usr/share/man/man1/xzegrep.1.gz (of link group lzma) doesn't exist
#11 162.0 update-alternatives: warning: skip creation of /usr/share/man/man1/lzfgrep.1.gz because associated file /usr/share/man/man1/xzfgrep.1.gz (of link group lzma) doesn't exist
#11 162.0 Setting up libboost-nowide1.74-dev (1.74.0-14ubuntu3) ...
#11 162.0 Setting up libquadmath0:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#11 162.0 Setting up libssl-dev:amd64 (3.0.2-0ubuntu1.19) ...
#11 162.0 Setting up libhwloc15:amd64 (2.7.0-2ubuntu1) ...
#11 162.0 Setting up libmpc3:amd64 (1.2.1-2build1) ...
#11 162.0 Setting up libevent-core-2.1-7:amd64 (2.1.12-stable-1build3) ...
#11 162.0 Setting up libatomic1:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#11 162.0 Setting up libboost-context1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 162.0 Setting up libevent-2.1-7:amd64 (2.1.12-stable-1build3) ...
#11 162.0 Setting up patch (2.7.6-7build2) ...
#11 162.0 Setting up libboost-random1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 162.0 Setting up libjsoncpp25:amd64 (1.9.5-3) ...
#11 162.0 Setting up libboost1.74-tools-dev (1.74.0-14ubuntu3) ...
#11 162.0 Setting up libltdl7:amd64 (2.4.6-15build2) ...
#11 162.1 Setting up libsasl2-2:amd64 (2.1.27+dfsg2-3ubuntu1.2) ...
#11 162.1 Setting up libssh-4:amd64 (0.9.6-2ubuntu0.22.04.4) ...
#11 162.1 Setting up libgfortran5:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#11 162.1 Setting up libboost-math1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 162.1 Setting up libubsan1:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#11 162.1 Setting up libboost-serialization1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 162.1 Setting up libnuma1:amd64 (2.0.14-3ubuntu2) ...
#11 162.1 Setting up libmd0:amd64 (1.0.4-1build1) ...
#11 162.1 Setting up libboost-container1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 162.1 Setting up libnsl-dev:amd64 (1.3.0-2build2) ...
#11 162.1 Setting up ocl-icd-libopencl1:amd64 (2.2.14-3) ...
#11 162.1 Setting up librhash0:amd64 (1.4.2-1ubuntu1) ...
#11 162.1 Setting up libcrypt-dev:amd64 (1:4.4.27-1) ...
#11 162.1 Setting up libnl-3-200:amd64 (3.5.0-0.1) ...
#11 162.1 Setting up libmpdec3:amd64 (2.5.1-2build2) ...
#11 162.1 Setting up libpsm2-2 (11.2.185-1) ...
#11 162.1 Setting up openmpi-common (4.1.2-2ubuntu1) ...
#11 162.1 Setting up git-man (1:2.34.1-1ubuntu1.15) ...
#11 162.1 Setting up cmake-data (3.22.1-1ubuntu1.22.04.2) ...
#11 162.4 Setting up libpsm-infinipath1 (3.3+20.604758e7-6.1) ...
#11 162.4 update-alternatives: using /usr/lib/libpsm1/libpsm_infinipath.so.1.16 to provide /usr/lib/x86_64-linux-gnu/libpsm_infinipath.so.1 (libpsm_infinipath.so.1) in auto mode
#11 162.4 Setting up libjs-jquery (3.6.0+dfsg+~3.5.13-1) ...
#11 162.5 Setting up libboost-date-time1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 162.5 Setting up libbinutils:amd64 (2.38-4ubuntu2.8) ...
#11 162.5 Setting up libfido2-1:amd64 (1.10.0-1) ...
#11 162.5 Setting up libboost-python1.74.0 (1.74.0-14ubuntu3) ...
#11 162.5 Setting up libisl23:amd64 (0.24-2build1) ...
#11 162.5 Setting up libminiupnpc-dev:amd64 (2.2.3-1build1) ...
#11 162.5 Setting up libboost-fiber1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 162.5 Setting up libc-dev-bin (2.35-0ubuntu3.10) ...
#11 162.5 Setting up libbsd0:amd64 (0.11.5-1) ...
#11 162.5 Setting up readline-common (8.1.2-1) ...
#11 162.6 Setting up libboost-timer1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 162.6 Setting up libcc1-0:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#11 162.6 Setting up liblsan0:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#11 162.6 Setting up libitm1:amd64 (12.3.0-1ubuntu1~22.04.2) ...
#11 162.6 Setting up libgdbm6:amd64 (1.23-1) ...
#11 162.6 Setting up libjs-underscore (1.13.2~dfsg-2) ...
#11 162.6 Setting up libboost-thread1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 162.6 Setting up libicu70:amd64 (70.1-2) ...
#11 162.6 Setting up libboost-numpy1.74.0 (1.74.0-14ubuntu3) ...
#11 162.6 Setting up libevent-pthreads-2.1-7:amd64 (2.1.12-stable-1build3) ...
#11 162.6 Setting up libtsan0:amd64 (11.4.0-1ubuntu1~22.04.2) ...
#11 162.6 Setting up libctf0:amd64 (2.38-4ubuntu2.8) ...
#11 162.6 Setting up cpp-11 (11.4.0-1ubuntu1~22.04.2) ...
#11 162.6 Setting up libxdmcp6:amd64 (1:1.1.3-0ubuntu5) ...
#11 162.6 Setting up libevent-extra-2.1-7:amd64 (2.1.12-stable-1build3) ...
#11 162.6 Setting up libxcb1:amd64 (1.14-3ubuntu3) ...
#11 162.6 Setting up libboost-coroutine1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 162.6 Setting up libedit2:amd64 (3.1-20210910-1build1) ...
#11 162.6 Setting up libreadline8:amd64 (8.1.2-1) ...
#11 162.6 Setting up libevent-openssl-2.1-7:amd64 (2.1.12-stable-1build3) ...
#11 162.6 Setting up m4 (1.4.18-5ubuntu2) ...
#11 162.6 Setting up libboost-tools-dev (1.74.0.3ubuntu7) ...
#11 162.6 Setting up libboost-nowide-dev (1.74.0.3ubuntu7) ...
#11 162.7 Setting up libldap-2.5-0:amd64 (2.5.19+dfsg-0ubuntu0.22.04.1) ...
#11 162.7 Setting up libnl-route-3-200:amd64 (3.5.0-0.1) ...
#11 162.7 Setting up libpython3.10-stdlib:amd64 (3.10.12-1~22.04.11) ...
#11 162.7 Setting up libjs-jquery-ui (1.13.1+dfsg-1) ...
#11 162.7 Setting up libboost-regex1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 162.7 Setting up libevent-dev (2.1.12-stable-1build3) ...
#11 162.7 Setting up libboost-numpy1.74-dev (1.74.0-14ubuntu3) ...
#11 162.7 Setting up libboost-graph1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 162.7 Setting up icu-devtools (70.1-2) ...
#11 162.7 Setting up libgdbm-compat4:amd64 (1.23-1) ...
#11 162.7 Setting up libjs-sphinxdoc (4.3.2-1) ...
#11 162.7 Setting up libboost-wave1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 162.7 Setting up libgcc-11-dev:amd64 (11.4.0-1ubuntu1~22.04.2) ...
#11 162.7 Setting up libnl-3-dev:amd64 (3.5.0-0.1) ...
#11 162.7 Setting up cpp (4:11.2.0-1ubuntu1) ...
#11 162.7 Setting up libcurl4:amd64 (7.81.0-1ubuntu1.20) ...
#11 162.7 Setting up libc6-dev:amd64 (2.35-0ubuntu3.10) ...
#11 162.7 Setting up libx11-6:amd64 (2:1.7.5-1ubuntu0.3) ...
#11 162.7 Setting up libboost-locale1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 162.7 Setting up libicu-dev:amd64 (70.1-2) ...
#11 162.7 Setting up libxml2:amd64 (2.9.13+dfsg-1ubuntu0.9) ...
#11 162.7 Setting up libboost-type-erasure1.74.0:amd64 (1.74.0-14ubuntu3) ...
#11 162.8 Setting up libpython3-stdlib:amd64 (3.10.6-1~22.04.1) ...
#11 162.8 Setting up binutils-x86-64-linux-gnu (2.38-4ubuntu2.8) ...
#11 162.8 Setting up libboost-log1.74.0 (1.74.0-14ubuntu3) ...
#11 162.8 Setting up libpython3.10:amd64 (3.10.12-1~22.04.11) ...
#11 162.8 Setting up libibverbs1:amd64 (39.0-1) ...
#11 163.0 Setting up libperl5.34:amd64 (5.34.0-3ubuntu1.5) ...
#11 163.0 Setting up python3.10 (3.10.12-1~22.04.11) ...
#11 163.7 Setting up ibverbs-providers:amd64 (39.0-1) ...
#11 164.0 Setting up libarchive13:amd64 (3.6.0-1ubuntu1.5) ...
#11 164.0 Setting up libgfortran-11-dev:amd64 (11.4.0-1ubuntu1~22.04.2) ...
#11 164.0 Setting up openssh-client (1:8.9p1-3ubuntu0.13) ...
#11 164.2 update-alternatives: using /usr/bin/ssh to provide /usr/bin/rsh (rsh) in auto mode
#11 164.2 update-alternatives: warning: skip creation of /usr/share/man/man1/rsh.1.gz because associated file /usr/share/man/man1/ssh.1.gz (of link group rsh) doesn't exist
#11 164.3 update-alternatives: using /usr/bin/slogin to provide /usr/bin/rlogin (rlogin) in auto mode
#11 164.3 update-alternatives: warning: skip creation of /usr/share/man/man1/rlogin.1.gz because associated file /usr/share/man/man1/slogin.1.gz (of link group rlogin) doesn't exist
#11 164.3 update-alternatives: using /usr/bin/scp to provide /usr/bin/rcp (rcp) in auto mode
#11 164.3 update-alternatives: warning: skip creation of /usr/share/man/man1/rcp.1.gz because associated file /usr/share/man/man1/scp.1.gz (of link group rcp) doesn't exist
#11 164.3 Setting up libxext6:amd64 (2:1.3.4-1build1) ...
#11 164.3 Setting up libcurl3-gnutls:amd64 (7.81.0-1ubuntu1.20) ...
#11 164.3 Setting up python3 (3.10.6-1~22.04.1) ...
#11 164.8 Setting up binutils (2.38-4ubuntu2.8) ...
#11 164.8 Setting up libnuma-dev:amd64 (2.0.14-3ubuntu2) ...
#11 164.8 Setting up libxnvctrl0:amd64 (510.47.03-0ubuntu1) ...
#11 164.8 Setting up libnl-route-3-dev:amd64 (3.5.0-0.1) ...
#11 164.8 Setting up perl (5.34.0-3ubuntu1.5) ...
#11 164.9 Setting up libexpat1-dev:amd64 (2.4.7-1ubuntu0.6) ...
#11 164.9 Setting up libboost-numpy-dev (1.74.0.3ubuntu7) ...
#11 164.9 Setting up libdpkg-perl (1.21.1ubuntu2.3) ...
#11 164.9 Setting up autoconf (2.71-2) ...
#11 164.9 Setting up libstdc++-11-dev:amd64 (11.4.0-1ubuntu1~22.04.2) ...
#11 164.9 Setting up zlib1g-dev:amd64 (1:1.2.11.dfsg-2ubuntu9.2) ...
#11 164.9 Setting up gcc-11 (11.4.0-1ubuntu1~22.04.2) ...
#11 164.9 Setting up cmake (3.22.1-1ubuntu1.22.04.2) ...
#11 164.9 Setting up python3-lib2to3 (3.10.8-1~22.04) ...
#11 165.2 Setting up automake (1:1.16.5-1.3) ...
#11 165.2 update-alternatives: using /usr/bin/automake-1.16 to provide /usr/bin/automake (automake) in auto mode
#11 165.2 update-alternatives: warning: skip creation of /usr/share/man/man1/automake.1.gz because associated file /usr/share/man/man1/automake-1.16.1.gz (of link group automake) doesn't exist
#11 165.2 update-alternatives: warning: skip creation of /usr/share/man/man1/aclocal.1.gz because associated file /usr/share/man/man1/aclocal-1.16.1.gz (of link group automake) doesn't exist
#11 165.2 Setting up python3-distutils (3.10.8-1~22.04) ...
#11 165.5 Setting up librdmacm1:amd64 (39.0-1) ...
#11 165.5 Setting up libucx0:amd64 (1.12.1~rc2-1) ...
#11 165.5 Setting up libboost1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 165.5 Setting up libboost-container1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 165.5 Setting up g++-11 (11.4.0-1ubuntu1~22.04.2) ...
#11 165.5 Setting up libboost-chrono1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 165.5 Setting up libboost-exception1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 165.5 Setting up libboost-exception-dev:amd64 (1.74.0.3ubuntu7) ...
#11 165.5 Setting up libibverbs-dev:amd64 (39.0-1) ...
#11 165.5 Setting up libhwloc-plugins:amd64 (2.7.0-2ubuntu1) ...
#11 165.5 Setting up libboost-container-dev:amd64 (1.74.0.3ubuntu7) ...
#11 165.5 Setting up gcc (4:11.2.0-1ubuntu1) ...
#11 165.6 Setting up dpkg-dev (1.21.1ubuntu2.3) ...
#11 165.6 Setting up libboost-program-options1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 165.6 Setting up liberror-perl (0.17029-1) ...
#11 165.6 Setting up libltdl-dev:amd64 (2.4.6-15build2) ...
#11 165.6 Setting up libboost-program-options-dev:amd64 (1.74.0.3ubuntu7) ...
#11 165.6 Setting up libboost-system1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 165.6 Setting up libboost-random1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 165.6 Setting up libboost-timer1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 165.6 Setting up pkg-config (0.29.2-1ubuntu3) ...
#11 165.8 Setting up libpython3.10-dev:amd64 (3.10.12-1~22.04.11) ...
#11 165.8 Setting up git (1:2.34.1-1ubuntu1.15) ...
#11 166.0 Setting up gfortran-11 (11.4.0-1ubuntu1~22.04.2) ...
#11 166.0 Setting up libboost-serialization1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 166.0 Setting up libboost-atomic1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 166.0 Setting up libboost-atomic-dev:amd64 (1.74.0.3ubuntu7) ...
#11 166.0 Setting up python3.10-dev (3.10.12-1~22.04.11) ...
#11 166.0 Setting up g++ (4:11.2.0-1ubuntu1) ...
#11 166.1 update-alternatives: using /usr/bin/g++ to provide /usr/bin/c++ (c++) in auto mode
#11 166.1 update-alternatives: warning: skip creation of /usr/share/man/man1/c++.1.gz because associated file /usr/share/man/man1/g++.1.gz (of link group c++) doesn't exist
#11 166.1 Setting up libboost-regex1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 166.2 Setting up build-essential (12.9ubuntu3) ...
#11 166.2 Setting up libhwloc-dev:amd64 (2.7.0-2ubuntu1) ...
#11 166.2 Setting up libboost-dev:amd64 (1.74.0.3ubuntu7) ...
#11 166.2 Setting up libboost-math1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 166.2 Setting up libboost-filesystem1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 166.2 Setting up libboost-stacktrace1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 166.2 Setting up libboost-test1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 166.2 Setting up libboost-regex-dev:amd64 (1.74.0.3ubuntu7) ...
#11 166.2 Setting up libboost-timer-dev:amd64 (1.74.0.3ubuntu7) ...
#11 166.2 Setting up libboost-filesystem-dev:amd64 (1.74.0.3ubuntu7) ...
#11 166.2 Setting up libfabric1:amd64 (1.11.0-3) ...
#11 166.2 Setting up libpython3-dev:amd64 (3.10.6-1~22.04.1) ...
#11 166.2 Setting up libboost-wave1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 166.2 Setting up libpmix2:amd64 (4.1.2-2ubuntu1) ...
#11 166.2 Setting up libboost-chrono-dev:amd64 (1.74.0.3ubuntu7) ...
#11 166.2 Setting up libboost-math-dev:amd64 (1.74.0.3ubuntu7) ...
#11 166.2 Setting up libopenmpi3:amd64 (4.1.2-2ubuntu1) ...
#11 166.2 Setting up libboost-system-dev:amd64 (1.74.0.3ubuntu7) ...
#11 166.2 Setting up libboost-mpi1.74.0 (1.74.0-14ubuntu3) ...
#11 166.2 Setting up libboost-random-dev:amd64 (1.74.0.3ubuntu7) ...
#11 166.2 Setting up libboost-wave-dev:amd64 (1.74.0.3ubuntu7) ...
#11 166.2 Setting up libboost-test-dev:amd64 (1.74.0.3ubuntu7) ...
#11 166.2 Setting up libboost-iostreams1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 166.2 Setting up libboost-date-time1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 166.2 Setting up libboost-graph1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 166.2 Setting up python3-dev (3.10.6-1~22.04.1) ...
#11 166.2 Setting up libboost-serialization-dev:amd64 (1.74.0.3ubuntu7) ...
#11 166.2 Setting up libboost-date-time-dev:amd64 (1.74.0.3ubuntu7) ...
#11 166.2 Setting up libboost-stacktrace-dev:amd64 (1.74.0.3ubuntu7) ...
#11 166.2 Setting up libboost-thread1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 166.2 Setting up libboost-graph-parallel1.74.0 (1.74.0-14ubuntu3) ...
#11 166.2 Setting up libpmix-dev:amd64 (4.1.2-2ubuntu1) ...
#11 166.2 Setting up openmpi-bin (4.1.2-2ubuntu1) ...
#11 166.3 update-alternatives: using /usr/bin/mpirun.openmpi to provide /usr/bin/mpirun (mpirun) in auto mode
#11 166.3 update-alternatives: warning: skip creation of /usr/share/man/man1/mpirun.1.gz because associated file /usr/share/man/man1/mpirun.openmpi.1.gz (of link group mpirun) doesn't exist
#11 166.3 update-alternatives: warning: skip creation of /usr/share/man/man1/mpiexec.1.gz because associated file /usr/share/man/man1/mpiexec.openmpi.1.gz (of link group mpirun) doesn't exist
#11 166.3 update-alternatives: using /usr/bin/mpicc.openmpi to provide /usr/bin/mpicc (mpi) in auto mode
#11 166.3 update-alternatives: warning: skip creation of /usr/share/man/man1/mpicc.1.gz because associated file /usr/share/man/man1/mpicc.openmpi.1.gz (of link group mpi) doesn't exist
#11 166.3 update-alternatives: warning: skip creation of /usr/share/man/man1/mpic++.1.gz because associated file /usr/share/man/man1/mpic++.openmpi.1.gz (of link group mpi) doesn't exist
#11 166.3 update-alternatives: warning: skip creation of /usr/share/man/man1/mpicxx.1.gz because associated file /usr/share/man/man1/mpicxx.openmpi.1.gz (of link group mpi) doesn't exist
#11 166.3 update-alternatives: warning: skip creation of /usr/share/man/man1/mpiCC.1.gz because associated file /usr/share/man/man1/mpiCC.openmpi.1.gz (of link group mpi) doesn't exist
#11 166.3 update-alternatives: warning: skip creation of /usr/share/man/man1/mpif77.1.gz because associated file /usr/share/man/man1/mpif77.openmpi.1.gz (of link group mpi) doesn't exist
#11 166.3 update-alternatives: warning: skip creation of /usr/share/man/man1/mpif90.1.gz because associated file /usr/share/man/man1/mpif90.openmpi.1.gz (of link group mpi) doesn't exist
#11 166.3 update-alternatives: warning: skip creation of /usr/share/man/man1/mpifort.1.gz because associated file /usr/share/man/man1/mpifort.openmpi.1.gz (of link group mpi) doesn't exist
#11 166.3 Setting up libboost-thread-dev:amd64 (1.74.0.3ubuntu7) ...
#11 166.3 Setting up libboost-graph-dev:amd64 (1.74.0.3ubuntu7) ...
#11 166.3 Setting up libboost-log1.74-dev (1.74.0-14ubuntu3) ...
#11 166.3 Setting up mpi-default-bin (1.14) ...
#11 166.3 Setting up libboost-iostreams-dev:amd64 (1.74.0.3ubuntu7) ...
#11 166.3 Setting up libboost-context1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 166.3 Setting up libboost-python1.74-dev (1.74.0-14ubuntu3) ...
#11 166.3 Setting up libboost-python-dev (1.74.0.3ubuntu7) ...
#11 166.3 Setting up libboost-fiber1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 166.3 Setting up libboost-type-erasure1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 166.3 Setting up libboost-locale1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 166.3 Setting up libboost-graph-parallel1.74-dev (1.74.0-14ubuntu3) ...
#11 166.3 Setting up libboost-coroutine1.74-dev:amd64 (1.74.0-14ubuntu3) ...
#11 166.4 Setting up libboost-coroutine-dev:amd64 (1.74.0.3ubuntu7) ...
#11 166.4 Setting up libopenmpi-dev:amd64 (4.1.2-2ubuntu1) ...
#11 166.4 update-alternatives: using /usr/lib/x86_64-linux-gnu/openmpi/include to provide /usr/include/x86_64-linux-gnu/mpi (mpi-x86_64-linux-gnu) in auto mode
#11 166.4 Setting up libboost-log-dev (1.74.0.3ubuntu7) ...
#11 166.4 Setting up libboost-fiber-dev:amd64 (1.74.0.3ubuntu7) ...
#11 166.4 Setting up libboost-mpi-python1.74.0 (1.74.0-14ubuntu3) ...
#11 167.0 Setting up libboost-locale-dev:amd64 (1.74.0.3ubuntu7) ...
#11 167.0 Setting up libboost-context-dev:amd64 (1.74.0.3ubuntu7) ...
#11 167.0 Setting up libboost-type-erasure-dev:amd64 (1.74.0.3ubuntu7) ...
#11 167.1 Setting up libboost-graph-parallel-dev (1.74.0.3ubuntu7) ...
#11 167.1 Setting up mpi-default-dev (1.14) ...
#11 167.1 Setting up libboost-mpi1.74-dev (1.74.0-14ubuntu3) ...
#11 167.1 Setting up libboost-mpi-python1.74-dev (1.74.0-14ubuntu3) ...
#11 167.1 Setting up libboost-mpi-python-dev (1.74.0.3ubuntu7) ...
#11 167.1 Setting up libboost-mpi-dev (1.74.0.3ubuntu7) ...
#11 167.1 Setting up libboost-all-dev (1.74.0.3ubuntu7) ...
#11 167.1 Processing triggers for libc-bin (2.35-0ubuntu3.10) ...
#11 DONE 167.4s

#12 [build 3/6] WORKDIR /src
#12 DONE 0.2s

#13 [build 4/6] COPY zion-cryptonote/ /src/zion-cryptonote/
#13 DONE 0.2s

#14 [build 5/6] WORKDIR /src/zion-cryptonote
#14 DONE 0.0s

#15 [build 6/6] RUN cmake -S . -B build -DCMAKE_BUILD_TYPE=Release     && cmake --build build -j "$(nproc)"
#15 0.735 -- The C compiler identification is GNU 11.4.0
#15 1.116 -- The CXX compiler identification is GNU 11.4.0
#15 1.146 -- Detecting C compiler ABI info
#15 1.786 -- Detecting C compiler ABI info - done
#15 1.802 -- Check for working C compiler: /usr/bin/cc - skipped
#15 1.802 -- Detecting C compile features
#15 1.804 -- Detecting C compile features - done
#15 1.807 -- Detecting CXX compiler ABI info
#15 2.414 -- Detecting CXX compiler ABI info - done
#15 2.432 -- Check for working CXX compiler: /usr/bin/c++ - skipped
#15 2.433 -- Detecting CXX compile features
#15 2.435 -- Detecting CXX compile features - done
#15 2.440 -- Looking for pthread.h
#15 2.937 -- Looking for pthread.h - found
#15 2.937 -- Performing Test CMAKE_HAVE_LIBC_PTHREAD
#15 3.467 -- Performing Test CMAKE_HAVE_LIBC_PTHREAD - Success
#15 3.469 -- Found Threads: TRUE  
#15 3.514 -- Found Boost: /usr/include (found suitable version "1.74.0", minimum required is "1.55") found components: system filesystem date_time chrono regex serialization program_options 
#15 3.541 -- Found Git: /usr/bin/git
#15 3.545 -- External dependencies: minimal setup
#15 3.556 -- Configuring done
#15 3.627 -- Generating done
#15 3.629 -- Build files have been written to: /src/zion-cryptonote/build
#15 4.057 [  0%] Building CXX object src/CMakeFiles/BlockchainExplorer.dir/BlockchainExplorer/BlockchainExplorer.cpp.o
#15 4.068 [  0%] Building C object src/CMakeFiles/Crypto.dir/crypto/blake256.c.o
#15 4.076 [  0%] Building CXX object src/CMakeFiles/Common.dir/Common/Base58.cpp.o
#15 4.076 fatal: not a git repository (or any of the parent directories): .git
#15 4.082 CMake Warning at src/version.cmake:3 (message):
#15 4.082   Cannot determine current revision.  Make sure that you are building either
#15 4.082   from a Git working tree or from a source archive.
#15 4.082 
#15 4.082 
#15 4.176 [  0%] Built target version
#15 4.260 [  1%] Building C object src/CMakeFiles/Crypto.dir/crypto/chacha8.c.o
#15 4.970 /src/zion-cryptonote/src/Common/Base58.cpp: In function 'uint64_t Tools::Base58::{anonymous}::uint_8be_to_64(const uint8_t*, size_t)':
#15 4.970 /src/zion-cryptonote/src/Common/Base58.cpp:87:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 4.970    87 |         case 1:            res |= *data++;
#15 4.970       |                            ~~~~^~~~~~~~~~
#15 4.972 /src/zion-cryptonote/src/Common/Base58.cpp:88:9: note: here
#15 4.972    88 |         case 2: res <<= 8; res |= *data++;
#15 4.972       |         ^~~~
#15 4.972 /src/zion-cryptonote/src/Common/Base58.cpp:88:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 4.972    88 |         case 2: res <<= 8; res |= *data++;
#15 4.972       |                            ~~~~^~~~~~~~~~
#15 4.972 /src/zion-cryptonote/src/Common/Base58.cpp:89:9: note: here
#15 4.972    89 |         case 3: res <<= 8; res |= *data++;
#15 4.972       |         ^~~~
#15 4.972 /src/zion-cryptonote/src/Common/Base58.cpp:89:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 4.972    89 |         case 3: res <<= 8; res |= *data++;
#15 4.972       |                            ~~~~^~~~~~~~~~
#15 4.972 /src/zion-cryptonote/src/Common/Base58.cpp:90:9: note: here
#15 4.972    90 |         case 4: res <<= 8; res |= *data++;
#15 4.972       |         ^~~~
#15 4.972 /src/zion-cryptonote/src/Common/Base58.cpp:90:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 4.972    90 |         case 4: res <<= 8; res |= *data++;
#15 4.972       |                            ~~~~^~~~~~~~~~
#15 4.973 /src/zion-cryptonote/src/Common/Base58.cpp:91:9: note: here
#15 4.973    91 |         case 5: res <<= 8; res |= *data++;
#15 4.973       |         ^~~~
#15 4.973 /src/zion-cryptonote/src/Common/Base58.cpp:91:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 4.973    91 |         case 5: res <<= 8; res |= *data++;
#15 4.973       |                            ~~~~^~~~~~~~~~
#15 4.973 /src/zion-cryptonote/src/Common/Base58.cpp:92:9: note: here
#15 4.973    92 |         case 6: res <<= 8; res |= *data++;
#15 4.973       |         ^~~~
#15 4.973 /src/zion-cryptonote/src/Common/Base58.cpp:92:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 4.973    92 |         case 6: res <<= 8; res |= *data++;
#15 4.973       |                            ~~~~^~~~~~~~~~
#15 4.973 /src/zion-cryptonote/src/Common/Base58.cpp:93:9: note: here
#15 4.973    93 |         case 7: res <<= 8; res |= *data++;
#15 4.973       |         ^~~~
#15 4.973 /src/zion-cryptonote/src/Common/Base58.cpp:93:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 4.973    93 |         case 7: res <<= 8; res |= *data++;
#15 4.973       |                            ~~~~^~~~~~~~~~
#15 4.973 /src/zion-cryptonote/src/Common/Base58.cpp:94:9: note: here
#15 4.973    94 |         case 8: res <<= 8; res |= *data; break;
#15 4.973       |         ^~~~
#15 5.077 [  1%] Building C object src/CMakeFiles/Crypto.dir/crypto/crypto-ops-data.c.o
#15 5.087 [  2%] Building C object src/CMakeFiles/Crypto.dir/crypto/crypto-ops.c.o
#15 5.400 [  2%] Building CXX object src/CMakeFiles/Crypto.dir/crypto/crypto.cpp.o
#15 5.839 [  3%] Building CXX object src/CMakeFiles/Common.dir/Common/BlockingQueue.cpp.o
#15 6.487 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 6.487                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 6.487                  from /src/zion-cryptonote/include/INode.h:15,
#15 6.487                  from /src/zion-cryptonote/src/BlockchainExplorer/BlockchainExplorer.h:12,
#15 6.487                  from /src/zion-cryptonote/src/BlockchainExplorer/BlockchainExplorer.cpp:5:
#15 6.487 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 6.487 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 6.487    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 6.487       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 6.487 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 6.487    23 |   struct chacha8_key {
#15 6.487       |          ^~~~~~~~~~~
#15 7.076 /src/zion-cryptonote/src/Common/BlockingQueue.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#15 7.076     8 | char suppressMSVCWarningLNK4221;
#15 7.076       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#15 7.194 [  4%] Building C object src/CMakeFiles/Crypto.dir/crypto/groestl.c.o
#15 7.288 [  4%] Building CXX object src/CMakeFiles/Common.dir/Common/CommandLine.cpp.o
#15 7.579 [  5%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Account.cpp.o
#15 8.229 [  5%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash-extra-blake.c.o
#15 8.924 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 8.924                  from /src/zion-cryptonote/src/CryptoNoteCore/Account.cpp:6:
#15 8.924 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 8.924 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 8.924    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 8.924       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 8.925 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 8.925    23 |   struct chacha8_key {
#15 8.925       |          ^~~~~~~~~~~
#15 8.931 [  6%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash-extra-groestl.c.o
#15 9.780 [  6%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash-extra-jh.c.o
#15 9.780 [  6%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/BlockIndex.cpp.o
#15 10.01 /src/zion-cryptonote/src/crypto/hash-extra-jh.c: In function 'hash_extra_jh':
#15 10.02 /src/zion-cryptonote/src/crypto/hash-extra-jh.c:14:7: warning: unused variable 'r' [-Wunused-variable]
#15 10.02    14 |   int r = jh_hash(HASH_SIZE * 8, data, 8 * length, (uint8_t*)hash);
#15 10.02       |       ^
#15 10.40 [  7%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash-extra-skein.c.o
#15 10.43 [  8%] Building CXX object src/CMakeFiles/Common.dir/Common/ConsoleHandler.cpp.o
#15 10.60 /src/zion-cryptonote/src/crypto/hash-extra-skein.c: In function 'hash_extra_skein':
#15 10.60 /src/zion-cryptonote/src/crypto/hash-extra-skein.c:12:7: warning: unused variable 'r' [-Wunused-variable]
#15 10.60    12 |   int r = skein_hash(8 * HASH_SIZE, data, 8 * length, (uint8_t*)hash);
#15 10.60       |       ^
#15 11.06 [  8%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash.c.o
#15 11.70 [  9%] Building C object src/CMakeFiles/Crypto.dir/crypto/jh.c.o
#15 12.09 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 12.09                  from /src/zion-cryptonote/src/CryptoNoteCore/BlockIndex.cpp:9:
#15 12.09 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 12.09 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 12.09    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 12.09       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 12.09 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 12.09    23 |   struct chacha8_key {
#15 12.09       |          ^~~~~~~~~~~
#15 13.01 [  9%] Building C object src/CMakeFiles/Crypto.dir/crypto/keccak.c.o
#15 13.34 /src/zion-cryptonote/src/CryptoNoteCore/BlockIndex.cpp: In member function 'std::vector<Crypto::Hash> CryptoNote::BlockIndex::buildSparseChain(const Crypto::Hash&) const':
#15 13.34 /src/zion-cryptonote/src/CryptoNoteCore/BlockIndex.cpp:51:66: warning: 'startBlockHeight' may be used uninitialized in this function [-Wmaybe-uninitialized]
#15 13.34    51 |     size_t sparseChainEnd = static_cast<size_t>(startBlockHeight + 1);
#15 13.34       |                                                 ~~~~~~~~~~~~~~~~~^~~
#15 13.53 [ 10%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Blockchain.cpp.o
#15 13.62 [ 11%] Building CXX object src/CMakeFiles/BlockchainExplorer.dir/BlockchainExplorer/BlockchainExplorerDataBuilder.cpp.o
#15 13.96 [ 12%] Building C object src/CMakeFiles/Crypto.dir/crypto/oaes_lib.c.o
#15 14.21 /src/zion-cryptonote/src/crypto/oaes_lib.c: In function 'oaes_get_seed':
#15 14.22 /src/zion-cryptonote/src/crypto/oaes_lib.c:490:9: warning: 'ftime' is deprecated: Use gettimeofday or clock_gettime instead [-Wdeprecated-declarations]
#15 14.22   490 |         ftime (&timer);
#15 14.22       |         ^~~~~
#15 14.22 In file included from /src/zion-cryptonote/src/crypto/oaes_lib.c:36:
#15 14.22 /usr/include/x86_64-linux-gnu/sys/timeb.h:29:12: note: declared here
#15 14.22    29 | extern int ftime (struct timeb *__timebuf)
#15 14.22       |            ^~~~~
#15 14.25 At top level:
#15 14.25 /src/zion-cryptonote/src/crypto/oaes_lib.c:30:19: warning: '_NR' defined but not used [-Wunused-const-variable=]
#15 14.25    30 | static const char _NR[] = {
#15 14.25       |                   ^~~
#15 14.71 [ 12%] Building CXX object src/CMakeFiles/Common.dir/Common/ConsoleTools.cpp.o
#15 14.98 [ 12%] Building C object src/CMakeFiles/Crypto.dir/crypto/random.c.o
#15 15.53 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 15.53                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 15.53                  from /src/zion-cryptonote/src/BlockchainExplorer/BlockchainExplorerDataBuilder.cpp:11:
#15 15.53 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 15.53 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 15.53    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 15.53       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 15.53 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 15.53    23 |   struct chacha8_key {
#15 15.53       |          ^~~~~~~~~~~
#15 15.73 [ 13%] Building C object src/CMakeFiles/Crypto.dir/crypto/skein.c.o
#15 15.74 [ 14%] Building CXX object src/CMakeFiles/Common.dir/Common/IInputStream.cpp.o
#15 16.07 [ 14%] Building CXX object src/CMakeFiles/Common.dir/Common/IOutputStream.cpp.o
#15 16.61 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 16.61                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 16.61                  from /src/zion-cryptonote/src/CryptoNoteCore/Blockchain.h:21,
#15 16.61                  from /src/zion-cryptonote/src/CryptoNoteCore/Blockchain.cpp:5:
#15 16.61 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 16.61 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 16.61    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 16.61       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 16.61 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 16.61    23 |   struct chacha8_key {
#15 16.61       |          ^~~~~~~~~~~
#15 16.62 [ 15%] Building CXX object src/CMakeFiles/Common.dir/Common/JsonValue.cpp.o
#15 17.12 [ 15%] Building C object src/CMakeFiles/Crypto.dir/crypto/slow-hash.c.o
#15 17.60 In file included from /src/zion-cryptonote/src/crypto/slow-hash.c:183:
#15 17.60 /src/zion-cryptonote/src/crypto/slow-hash.inl: In function 'cn_slow_hash_noaesni':
#15 17.60 /src/zion-cryptonote/src/crypto/slow-hash.inl:16:44: warning: unused variable 'b_x' [-Wunused-variable]
#15 17.60    16 |   __m128i *longoutput, *expkey, *xmminput, b_x;
#15 17.60       |                                            ^~~
#15 17.60 /src/zion-cryptonote/src/crypto/slow-hash.inl:16:12: warning: variable 'longoutput' set but not used [-Wunused-but-set-variable]
#15 17.60    16 |   __m128i *longoutput, *expkey, *xmminput, b_x;
#15 17.60       |            ^~~~~~~~~~
#15 18.92 [ 16%] Building CXX object src/CMakeFiles/Crypto.dir/crypto/slow-hash.cpp.o
#15 19.39 [ 16%] Building CXX object src/CMakeFiles/BlockchainExplorer.dir/BlockchainExplorer/BlockchainExplorerErrors.cpp.o
#15 19.61 /src/zion-cryptonote/src/crypto/slow-hash.cpp: In destructor 'Crypto::cn_context::~cn_context()':
#15 19.61 /src/zion-cryptonote/src/crypto/slow-hash.cpp:54:7: warning: 'throw' will always call 'terminate' [-Wterminate]
#15 19.61    54 |       throw bad_alloc();
#15 19.61       |       ^~~~~~~~~~~~~~~~~
#15 19.61 /src/zion-cryptonote/src/crypto/slow-hash.cpp:54:7: note: in C++11 destructors default to 'noexcept'
#15 20.04 [ 16%] Building CXX object src/CMakeFiles/Common.dir/Common/Math.cpp.o
#15 20.10 [ 17%] Building C object src/CMakeFiles/Crypto.dir/crypto/tree-hash.c.o
#15 20.47 [ 18%] Linking CXX static library libBlockchainExplorer.a
#15 20.47 /src/zion-cryptonote/src/Common/Math.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#15 20.47     8 | char suppressMSVCWarningLNK4221;
#15 20.47       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#15 20.59 [ 19%] Building CXX object src/CMakeFiles/Common.dir/Common/MemoryInputStream.cpp.o
#15 20.80 [ 19%] Built target BlockchainExplorer
#15 20.89 [ 19%] Linking CXX static library libCrypto.a
#15 20.90 [ 19%] Building CXX object src/CMakeFiles/Common.dir/Common/PathTools.cpp.o
#15 21.27 [ 19%] Built target Crypto
#15 21.37 [ 19%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/BlockchainIndices.cpp.o
#15 21.56 [ 19%] Building CXX object src/CMakeFiles/Http.dir/HTTP/HttpParser.cpp.o
#15 22.11 [ 20%] Building CXX object src/CMakeFiles/Common.dir/Common/ScopeExit.cpp.o
#15 22.85 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 22.85                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#15 22.85                  from /src/zion-cryptonote/src/CryptoNoteCore/BlockchainIndices.cpp:8:
#15 22.85 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 22.85 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 22.85    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 22.85       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 22.85 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 22.85    23 |   struct chacha8_key {
#15 22.85       |          ^~~~~~~~~~~
#15 22.90 [ 20%] Building CXX object src/CMakeFiles/Common.dir/Common/SignalHandler.cpp.o
#15 23.29 [ 21%] Building CXX object src/CMakeFiles/Http.dir/HTTP/HttpParserErrorCodes.cpp.o
#15 24.58 [ 22%] Building CXX object src/CMakeFiles/Http.dir/HTTP/HttpRequest.cpp.o
#15 24.58 [ 22%] Building CXX object src/CMakeFiles/Common.dir/Common/StdInputStream.cpp.o
#15 24.84 [ 22%] Building CXX object src/CMakeFiles/Common.dir/Common/StdOutputStream.cpp.o
#15 25.64 [ 23%] Building CXX object src/CMakeFiles/Common.dir/Common/StreamTools.cpp.o
#15 25.92 [ 23%] Building CXX object src/CMakeFiles/Common.dir/Common/StringInputStream.cpp.o
#15 26.36 [ 24%] Building CXX object src/CMakeFiles/Http.dir/HTTP/HttpResponse.cpp.o
#15 27.05 [ 25%] Building CXX object src/CMakeFiles/Common.dir/Common/StringOutputStream.cpp.o
#15 27.17 [ 26%] Building CXX object src/CMakeFiles/InProcessNode.dir/InProcessNode/InProcessNode.cpp.o
#15 27.58 [ 27%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/BlockchainMessages.cpp.o
#15 27.85 [ 27%] Linking CXX static library libHttp.a
#15 27.91 [ 27%] Building CXX object src/CMakeFiles/Common.dir/Common/StringTools.cpp.o
#15 28.17 [ 27%] Built target Http
#15 28.24 [ 28%] Building CXX object src/CMakeFiles/Common.dir/Common/StringView.cpp.o
#15 29.11 [ 28%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Checkpoints.cpp.o
#15 29.41 [ 29%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Core.cpp.o
#15 29.49 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 29.49                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 29.49                  from /src/zion-cryptonote/include/INode.h:15,
#15 29.49                  from /src/zion-cryptonote/src/InProcessNode/InProcessNode.h:7,
#15 29.49                  from /src/zion-cryptonote/src/InProcessNode/InProcessNode.cpp:5:
#15 29.49 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 29.49 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 29.49    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 29.49       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 29.49 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 29.49    23 |   struct chacha8_key {
#15 29.49       |          ^~~~~~~~~~~
#15 29.68 [ 30%] Building CXX object src/CMakeFiles/Common.dir/Common/Util.cpp.o
#15 33.92 [ 30%] Building CXX object src/CMakeFiles/Common.dir/Common/VectorOutputStream.cpp.o
#15 34.28 [ 30%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CoreConfig.cpp.o
#15 34.78 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 34.78                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 34.78                  from /src/zion-cryptonote/src/CryptoNoteCore/Blockchain.h:21,
#15 34.78                  from /src/zion-cryptonote/src/CryptoNoteCore/Core.h:14,
#15 34.78                  from /src/zion-cryptonote/src/CryptoNoteCore/Core.cpp:5:
#15 34.78 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 34.78 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 34.78    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 34.78       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 34.78 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 34.78    23 |   struct chacha8_key {
#15 34.78       |          ^~~~~~~~~~~
#15 34.90 [ 31%] Linking CXX static library libCommon.a
#15 35.13 /src/zion-cryptonote/src/CryptoNoteCore/Core.cpp: In member function 'virtual std::unique_ptr<CryptoNote::IBlock> CryptoNote::core::getBlock(const Crypto::Hash&)':
#15 35.13 /src/zion-cryptonote/src/CryptoNoteCore/Core.cpp:981:19: warning: redundant move in return statement [-Wredundant-move]
#15 35.13   981 |   return std::move(blockPtr);
#15 35.13       |          ~~~~~~~~~^~~~~~~~~~
#15 35.13 /src/zion-cryptonote/src/CryptoNoteCore/Core.cpp:981:19: note: remove 'std::move' call
#15 35.31 [ 31%] Built target Common
#15 35.40 [ 32%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteBasic.cpp.o
#15 38.34 [ 32%] Building CXX object src/CMakeFiles/Logging.dir/Logging/CommonLogger.cpp.o
#15 38.35 [ 33%] Building CXX object src/CMakeFiles/NodeRpcProxy.dir/NodeRpcProxy/NodeErrors.cpp.o
#15 39.50 [ 33%] Building CXX object src/CMakeFiles/NodeRpcProxy.dir/NodeRpcProxy/NodeRpcProxy.cpp.o
#15 42.06 [ 33%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteBasicImpl.cpp.o
#15 42.15 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 42.15                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 42.15                  from /src/zion-cryptonote/include/INode.h:15,
#15 42.15                  from /src/zion-cryptonote/src/NodeRpcProxy/NodeRpcProxy.h:15,
#15 42.15                  from /src/zion-cryptonote/src/NodeRpcProxy/NodeRpcProxy.cpp:5:
#15 42.15 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 42.15 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 42.15    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 42.15       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 42.15 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 42.15    23 |   struct chacha8_key {
#15 42.15       |          ^~~~~~~~~~~
#15 43.73 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 43.73                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 43.73                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteBasicImpl.cpp:6:
#15 43.73 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 43.73 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 43.73    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 43.73       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 43.74 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 43.74    23 |   struct chacha8_key {
#15 43.74       |          ^~~~~~~~~~~
#15 43.91 /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteBasicImpl.cpp: In function 'std::string CryptoNote::getAccountAddressAsStr(uint64_t, const CryptoNote::AccountPublicAddress&)':
#15 43.91 /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteBasicImpl.cpp:53:10: warning: unused variable 'r' [-Wunused-variable]
#15 43.91    53 |     bool r = toBinaryArray(adr, ba);
#15 43.91       |          ^
#15 45.24 [ 34%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteFormatUtils.cpp.o
#15 45.88 [ 35%] Building CXX object src/CMakeFiles/Logging.dir/Logging/ConsoleLogger.cpp.o
#15 47.91 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 47.91                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 47.91                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.cpp:5:
#15 47.91 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 47.91 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 47.91    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 47.91       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 47.91 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 47.91    23 |   struct chacha8_key {
#15 47.91       |          ^~~~~~~~~~~
#15 49.48 [ 36%] Linking CXX static library libNodeRpcProxy.a
#15 50.01 [ 36%] Built target NodeRpcProxy
#15 50.16 [ 36%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteSerialization.cpp.o
#15 50.22 [ 36%] Building CXX object src/CMakeFiles/Logging.dir/Logging/FileLogger.cpp.o
#15 51.55 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 51.55                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.cpp:5:
#15 51.55 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 51.55 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 51.55    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 51.55       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 51.55 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 51.55    23 |   struct chacha8_key {
#15 51.55       |          ^~~~~~~~~~~
#15 52.12 [ 37%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteTools.cpp.o
#15 53.58 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 53.58                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#15 53.58                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.cpp:5:
#15 53.58 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 53.58 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 53.58    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 53.58       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 53.58 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 53.58    23 |   struct chacha8_key {
#15 53.58       |          ^~~~~~~~~~~
#15 53.61 [ 38%] Building CXX object src/CMakeFiles/Logging.dir/Logging/ILogger.cpp.o
#15 53.92 [ 38%] Building CXX object src/CMakeFiles/Logging.dir/Logging/LoggerGroup.cpp.o
#15 54.77 [ 38%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Currency.cpp.o
#15 57.30 [ 39%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/HttpClient.cpp.o
#15 57.53 [ 40%] Building CXX object src/CMakeFiles/Logging.dir/Logging/LoggerManager.cpp.o
#15 57.54 [ 40%] Building CXX object src/CMakeFiles/InProcessNode.dir/InProcessNode/InProcessNodeErrors.cpp.o
#15 57.84 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 57.84                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 57.84                  from /src/zion-cryptonote/src/CryptoNoteCore/Currency.cpp:15:
#15 57.84 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 57.84 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 57.84    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 57.84       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 57.84 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 57.84    23 |   struct chacha8_key {
#15 57.84       |          ^~~~~~~~~~~
#15 58.60 [ 41%] Linking CXX static library libInProcessNode.a
#15 58.97 [ 41%] Built target InProcessNode
#15 59.07 [ 41%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/HttpServer.cpp.o
#15 59.19 [ 42%] Building CXX object src/CMakeFiles/Logging.dir/Logging/LoggerMessage.cpp.o
#15 60.46 [ 43%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Difficulty.cpp.o
#15 61.39 /src/zion-cryptonote/src/Logging/LoggerMessage.cpp: In constructor 'Logging::LoggerMessage::LoggerMessage(Logging::LoggerMessage&&)':
#15 61.39 /src/zion-cryptonote/src/Logging/LoggerMessage.cpp:65:11: warning: unused variable '_Pnext' [-Wunused-variable]
#15 61.39    65 |     char *_Pnext = pptr();
#15 61.39       |           ^~~~~~
#15 61.41 [ 44%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/JsonRpc.cpp.o
#15 61.86 [ 44%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/IBlock.cpp.o
#15 63.00 [ 44%] Building CXX object src/CMakeFiles/Logging.dir/Logging/LoggerRef.cpp.o
#15 63.21 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 63.21                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 63.21                  from /src/zion-cryptonote/src/Rpc/CoreRpcServerCommandsDefinitions.h:7,
#15 63.21                  from /src/zion-cryptonote/src/Rpc/JsonRpc.h:11,
#15 63.21                  from /src/zion-cryptonote/src/Rpc/JsonRpc.cpp:5:
#15 63.21 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 63.21 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 63.21    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 63.21       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 63.21 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 63.21    23 |   struct chacha8_key {
#15 63.21       |          ^~~~~~~~~~~
#15 63.29 [ 45%] Building CXX object src/CMakeFiles/Logging.dir/Logging/StreamLogger.cpp.o
#15 63.35 [ 46%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/ITimeProvider.cpp.o
#15 63.63 [ 46%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Miner.cpp.o
#15 64.42 [ 46%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/RpcServer.cpp.o
#15 65.69 [ 47%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/MinerConfig.cpp.o
#15 66.10 [ 47%] Linking CXX static library libLogging.a
#15 66.56 [ 47%] Built target Logging
#15 66.64 [ 48%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/RpcServerConfig.cpp.o
#15 66.96 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 66.96                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 66.96                  from /src/zion-cryptonote/src/CryptoNoteCore/Miner.cpp:24:
#15 66.96 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 66.96 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 66.96    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 66.96       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 66.96 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 66.96    23 |   struct chacha8_key {
#15 66.96       |          ^~~~~~~~~~~
#15 67.73 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 67.73                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 67.73                  from /src/zion-cryptonote/src/Rpc/CoreRpcServerCommandsDefinitions.h:7,
#15 67.73                  from /src/zion-cryptonote/src/Rpc/RpcServer.h:11,
#15 67.73                  from /src/zion-cryptonote/src/Rpc/RpcServer.cpp:5:
#15 67.73 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 67.73 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 67.73    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 67.73       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 67.73 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 67.73    23 |   struct chacha8_key {
#15 67.73       |          ^~~~~~~~~~~
#15 71.53 [ 48%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/SwappedMap.cpp.o
#15 73.13 [ 48%] Building CXX object src/CMakeFiles/P2P.dir/CryptoNoteProtocol/CryptoNoteProtocolHandler.cpp.o
#15 73.73 /src/zion-cryptonote/src/CryptoNoteCore/SwappedMap.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#15 73.73     8 | char suppressMSVCWarningLNK4221;
#15 73.73       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#15 73.81 [ 49%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/BinaryInputStreamSerializer.cpp.o
#15 74.05 [ 50%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/SwappedVector.cpp.o
#15 74.97 /src/zion-cryptonote/src/CryptoNoteCore/SwappedVector.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#15 74.97     8 | char suppressMSVCWarningLNK4221;
#15 74.97       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#15 75.17 [ 50%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/BinaryOutputStreamSerializer.cpp.o
#15 75.34 [ 50%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Transaction.cpp.o
#15 75.51 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 75.51                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 75.51                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolHandler.h:13,
#15 75.51                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolHandler.cpp:5:
#15 75.51 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 75.51 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 75.51    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 75.51       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 75.51 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 75.51    23 |   struct chacha8_key {
#15 75.51       |          ^~~~~~~~~~~
#15 76.66 [ 51%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/JsonInputStreamSerializer.cpp.o
#15 76.92 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 76.92                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 76.92                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionApiExtra.h:7,
#15 76.92                  from /src/zion-cryptonote/src/CryptoNoteCore/Transaction.cpp:6:
#15 76.92 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 76.92 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 76.92    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 76.92       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 76.92 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 76.92    23 |   struct chacha8_key {
#15 76.92       |          ^~~~~~~~~~~
#15 78.19 [ 52%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/JsonInputValueSerializer.cpp.o
#15 80.35 [ 52%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/JsonOutputStreamSerializer.cpp.o
#15 80.54 [ 53%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/TransactionExtra.cpp.o
#15 80.83 [ 53%] Linking CXX static library libRpc.a
#15 81.21 [ 53%] Built target Rpc
#15 81.33 [ 54%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/TransactionPool.cpp.o
#15 81.59 [ 55%] Building CXX object src/CMakeFiles/P2P.dir/P2p/IP2pNodeInternal.cpp.o
#15 82.17 [ 56%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/KVBinaryInputStreamSerializer.cpp.o
#15 82.71 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 82.71                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#15 82.71                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionExtra.cpp:10:
#15 82.71 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 82.71 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 82.71    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 82.71       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 82.71 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 82.71    23 |   struct chacha8_key {
#15 82.71       |          ^~~~~~~~~~~
#15 83.33 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 83.33                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#15 83.33                  from /src/zion-cryptonote/src/P2p/IP2pNodeInternal.h:8,
#15 83.33                  from /src/zion-cryptonote/src/P2p/IP2pNodeInternal.cpp:5:
#15 83.33 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 83.33 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 83.33    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 83.33       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 83.33 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 83.33    23 |   struct chacha8_key {
#15 83.33       |          ^~~~~~~~~~~
#15 83.59 [ 56%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/KVBinaryOutputStreamSerializer.cpp.o
#15 83.72 [ 56%] Building CXX object src/CMakeFiles/P2P.dir/P2p/LevinProtocol.cpp.o
#15 84.00 [ 57%] Building CXX object src/CMakeFiles/P2P.dir/P2p/NetNode.cpp.o
#15 85.32 [ 58%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/MemoryStream.cpp.o
#15 85.39 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 85.39                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 85.39                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionPool.cpp:21:
#15 85.39 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 85.39 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 85.39    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 85.39       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 85.39 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 85.39    23 |   struct chacha8_key {
#15 85.39       |          ^~~~~~~~~~~
#15 85.43 [ 58%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/TransactionPrefixImpl.cpp.o
#15 85.90 [ 58%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/SerializationOverloads.cpp.o
#15 86.90 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 86.90                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 86.90                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionApiExtra.h:7,
#15 86.90                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionPrefixImpl.cpp:12:
#15 86.90 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 86.90 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 86.90    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 86.90       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 86.90 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 86.90    23 |   struct chacha8_key {
#15 86.90       |          ^~~~~~~~~~~
#15 87.07 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 87.07                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 87.07                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolHandler.h:13,
#15 87.07                  from /src/zion-cryptonote/src/P2p/NetNode.h:21,
#15 87.07                  from /src/zion-cryptonote/src/P2p/NetNode.cpp:5:
#15 87.07 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 87.07 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 87.07    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 87.07       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 87.07 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 87.07    23 |   struct chacha8_key {
#15 87.07       |          ^~~~~~~~~~~
#15 87.29 [ 59%] Linking CXX static library libSerialization.a
#15 87.79 [ 59%] Built target Serialization
#15 87.86 [ 60%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/TransactionUtils.cpp.o
#15 89.35 [ 61%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/Dispatcher.cpp.o
#15 89.48 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 89.48                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 89.48                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionUtils.cpp:11:
#15 89.48 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 89.48 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 89.48    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 89.48       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 89.48 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 89.48    23 |   struct chacha8_key {
#15 89.48       |          ^~~~~~~~~~~
#15 90.30 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp: In constructor 'System::Dispatcher::Dispatcher()':
#15 90.30 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp:92:14: warning: unused variable 'result' [-Wunused-variable]
#15 90.30    92 |         auto result = close(remoteSpawnEvent);
#15 90.30       |              ^~~~~~
#15 90.30 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp:97:10: warning: unused variable 'result' [-Wunused-variable]
#15 90.30    97 |     auto result = close(epoll);
#15 90.30       |          ^~~~~~
#15 90.30 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp: In destructor 'System::Dispatcher::~Dispatcher()':
#15 90.30 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp:123:9: warning: unused variable 'result' [-Wunused-variable]
#15 90.30   123 |     int result = ::close(timers.top());
#15 90.30       |         ^~~~~~
#15 90.30 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp:128:8: warning: variable 'result' set but not used [-Wunused-but-set-variable]
#15 90.30   128 |   auto result = close(epoll);
#15 90.30       |        ^~~~~~
#15 90.92 [ 61%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/ErrorMessage.cpp.o
#15 92.13 [ 61%] Building CXX object src/CMakeFiles/P2P.dir/P2p/NetNodeConfig.cpp.o
#15 92.88 [ 61%] Linking CXX static library libCryptoNoteCore.a
#15 93.04 [ 62%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/Ipv4Resolver.cpp.o
#15 93.46 [ 62%] Built target CryptoNoteCore
#15 93.54 [ 62%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/TcpConnection.cpp.o
#15 94.19 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp: In destructor 'System::TcpConnection::~TcpConnection()':
#15 94.19 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:35:9: warning: unused variable 'result' [-Wunused-variable]
#15 94.19    35 |     int result = close(connection);
#15 94.19       |         ^~~~~~
#15 94.19 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp: In member function 'System::TcpConnection& System::TcpConnection::operator=(System::TcpConnection&&)':
#15 94.19 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:45:18: error: 'runtime_error' is not a member of 'std'
#15 94.19    45 |       throw std::runtime_error("TcpConnection::operator=, close failed, " + lastErrorMessage());
#15 94.19       |                  ^~~~~~~~~~~~~
#15 94.20 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp: In member function 'size_t System::TcpConnection::read(uint8_t*, size_t)':
#15 94.20 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:71:26: warning: logical 'and' of equal expressions [-Wlogical-op]
#15 94.20    71 |     if (errno != EAGAIN  && errno != EWOULDBLOCK) {
#15 94.20       |                          ^
#15 94.20 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp: In lambda function:
#15 94.20 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:98:26: error: 'runtime_error' is not a member of 'std'
#15 94.20    98 |               throw std::runtime_error("TcpConnection::stop, epoll_ctl failed, " + lastErrorMessage());
#15 94.20       |                          ^~~~~~~~~~~~~
#15 94.20 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp: In member function 'size_t System::TcpConnection::read(uint8_t*, size_t)':
#15 94.20 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:124:24: error: 'runtime_error' is not a member of 'std'
#15 94.20   124 |             throw std::runtime_error("TcpConnection::read");
#15 94.20       |                        ^~~~~~~~~~~~~
#15 94.20 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:129:22: error: 'runtime_error' is not a member of 'std'
#15 94.20   129 |           throw std::runtime_error("TcpConnection::read");
#15 94.20       |                      ^~~~~~~~~~~~~
#15 94.21 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:142:16: error: 'runtime_error' is not a member of 'std'
#15 94.21   142 |     throw std::runtime_error("TcpConnection::read, "+ message);
#15 94.21       |                ^~~~~~~~~~~~~
#15 94.21 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp: In member function 'std::size_t System::TcpConnection::write(const uint8_t*, size_t)':
#15 94.21 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:159:18: error: 'runtime_error' is not a member of 'std'
#15 94.21   159 |       throw std::runtime_error("TcpConnection::write, shutdown failed, " + lastErrorMessage());
#15 94.21       |                  ^~~~~~~~~~~~~
#15 94.21 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:167:26: warning: logical 'and' of equal expressions [-Wlogical-op]
#15 94.21   167 |     if (errno != EAGAIN  && errno != EWOULDBLOCK) {
#15 94.21       |                          ^
#15 94.21 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp: In lambda function:
#15 94.21 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:194:26: error: 'runtime_error' is not a member of 'std'
#15 94.21   194 |               throw std::runtime_error("TcpConnection::stop, epoll_ctl failed, " + lastErrorMessage());
#15 94.21       |                          ^~~~~~~~~~~~~
#15 94.21 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp: In member function 'std::size_t System::TcpConnection::write(const uint8_t*, size_t)':
#15 94.21 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:220:24: error: 'runtime_error' is not a member of 'std'
#15 94.21   220 |             throw std::runtime_error("TcpConnection::write, " + message);
#15 94.21       |                        ^~~~~~~~~~~~~
#15 94.21 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:225:22: error: 'runtime_error' is not a member of 'std'
#15 94.21   225 |           throw std::runtime_error("TcpConnection::write, events & (EPOLLERR | EPOLLHUP) != 0");
#15 94.21       |                      ^~~~~~~~~~~~~
#15 94.22 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:238:16: error: 'runtime_error' is not a member of 'std'
#15 94.22   238 |     throw std::runtime_error("TcpConnection::write, " + message);
#15 94.22       |                ^~~~~~~~~~~~~
#15 94.22 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp: In member function 'std::pair<System::Ipv4Address, short unsigned int> System::TcpConnection::getPeerAddressAndPort() const':
#15 94.22 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:249:16: error: 'runtime_error' is not a member of 'std'
#15 94.22   249 |     throw std::runtime_error("TcpConnection::getPeerAddress, getpeername failed, " + lastErrorMessage());
#15 94.22       |                ^~~~~~~~~~~~~
#15 94.22 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp: In constructor 'System::TcpConnection::TcpConnection(System::Dispatcher&, int)':
#15 94.22 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:264:16: error: 'runtime_error' is not a member of 'std'
#15 94.22   264 |     throw std::runtime_error("TcpConnection::TcpConnection, epoll_ctl failed, " + lastErrorMessage());
#15 94.22       |                ^~~~~~~~~~~~~
#15 94.32 gmake[2]: *** [src/CMakeFiles/System.dir/build.make:118: src/CMakeFiles/System.dir/Platform/Linux/System/TcpConnection.cpp.o] Error 1
#15 94.32 gmake[2]: *** Waiting for unfinished jobs....
#15 94.47 [ 63%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pConnectionProxy.cpp.o
#15 94.67 gmake[1]: *** [CMakeFiles/Makefile2:470: src/CMakeFiles/System.dir/all] Error 2
#15 94.67 gmake[1]: *** Waiting for unfinished jobs....
#15 94.74 [ 63%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pContext.cpp.o
#15 96.98 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 96.98                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#15 96.98                  from /src/zion-cryptonote/src/P2p/P2pContext.h:19,
#15 96.98                  from /src/zion-cryptonote/src/P2p/P2pContext.cpp:5:
#15 96.98 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 96.98 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 96.98    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 96.98       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 96.98 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 96.98    23 |   struct chacha8_key {
#15 96.98       |          ^~~~~~~~~~~
#15 97.38 [ 64%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pContextOwner.cpp.o
#15 98.38 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 98.38                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#15 98.38                  from /src/zion-cryptonote/src/P2p/IP2pNodeInternal.h:8,
#15 98.38                  from /src/zion-cryptonote/src/P2p/P2pConnectionProxy.h:9,
#15 98.38                  from /src/zion-cryptonote/src/P2p/P2pConnectionProxy.cpp:5:
#15 98.38 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 98.38 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 98.38    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 98.38       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 98.38 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 98.38    23 |   struct chacha8_key {
#15 98.38       |          ^~~~~~~~~~~
#15 98.92 [ 64%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pInterfaces.cpp.o
#15 99.17 [ 65%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pNode.cpp.o
#15 101.6 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 101.6                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#15 101.6                  from /src/zion-cryptonote/src/P2p/P2pContext.h:19,
#15 101.6                  from /src/zion-cryptonote/src/P2p/P2pContextOwner.cpp:7:
#15 101.6 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 101.6 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 101.6    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 101.6       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 101.6 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 101.6    23 |   struct chacha8_key {
#15 101.6       |          ^~~~~~~~~~~
#15 101.9 [ 65%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pNodeConfig.cpp.o
#15 102.3 [ 66%] Building CXX object src/CMakeFiles/P2P.dir/P2p/PeerListManager.cpp.o
#15 103.8 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 103.8                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#15 103.8                  from /src/zion-cryptonote/src/P2p/IP2pNodeInternal.h:8,
#15 103.8                  from /src/zion-cryptonote/src/P2p/P2pNode.h:17,
#15 103.8                  from /src/zion-cryptonote/src/P2p/P2pNode.cpp:5:
#15 103.8 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 103.8 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 103.8    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 103.8       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 103.8 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 103.8    23 |   struct chacha8_key {
#15 103.8       |          ^~~~~~~~~~~
#15 106.4 [ 67%] Linking CXX static library libP2P.a
#15 106.8 [ 67%] Built target P2P
#15 106.8 gmake: *** [Makefile:101: all] Error 2
#15 ERROR: process "/bin/sh -c cmake -S . -B build -DCMAKE_BUILD_TYPE=Release     && cmake --build build -j \"$(nproc)\"" did not complete successfully: exit code: 2
------
 > [build 6/6] RUN cmake -S . -B build -DCMAKE_BUILD_TYPE=Release     && cmake --build build -j "$(nproc)":
103.8 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
103.8 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
103.8    48 |     memcpy(&key, &pwd_hash, sizeof(key));
103.8       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
103.8 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
103.8    23 |   struct chacha8_key {
103.8       |          ^~~~~~~~~~~
106.4 [ 67%] Linking CXX static library libP2P.a
106.8 [ 67%] Built target P2P
106.8 gmake: *** [Makefile:101: all] Error 2
------

 [33m2 warnings found (use docker --debug to expand):
[0m - FromPlatformFlagConstDisallowed: FROM --platform flag should not use constant value "linux/amd64" (line 3)
 - FromPlatformFlagConstDisallowed: FROM --platform flag should not use constant value "linux/amd64" (line 20)
Dockerfile.zion-cryptonote:17
--------------------
  16 |     WORKDIR /src/zion-cryptonote
  17 | >>> RUN cmake -S . -B build -DCMAKE_BUILD_TYPE=Release \
  18 | >>>     && cmake --build build -j "$(nproc)"
  19 |     
--------------------
ERROR: failed to build: failed to solve: process "/bin/sh -c cmake -S . -B build -DCMAKE_BUILD_TYPE=Release     && cmake --build build -j \"$(nproc)\"" did not complete successfully: exit code: 2
\n## Build pá 19. září 2025 10:22:14 UTC
#0 building with "desktop-linux" instance using docker driver

#1 [internal] load build definition from Dockerfile.zion-cryptonote
#1 transferring dockerfile: 1.43kB 0.0s done
#1 DONE 0.0s

#2 resolve image config for docker-image://docker.io/docker/dockerfile:1
#2 ...

#3 [auth] docker/dockerfile:pull token for registry-1.docker.io
#3 DONE 0.0s

#2 resolve image config for docker-image://docker.io/docker/dockerfile:1
#2 DONE 1.3s

#4 docker-image://docker.io/docker/dockerfile:1@sha256:dabfc0969b935b2080555ace70ee69a5261af8a8f1b4df97b9e7fbcf6722eddf
#4 resolve docker.io/docker/dockerfile:1@sha256:dabfc0969b935b2080555ace70ee69a5261af8a8f1b4df97b9e7fbcf6722eddf 0.0s done
#4 CACHED

#5 [auth] library/ubuntu:pull token for registry-1.docker.io
#5 DONE 0.0s

#6 [internal] load metadata for docker.io/library/ubuntu:22.04
#6 DONE 0.7s

#7 [internal] load .dockerignore
#7 transferring context: 333B done
#7 DONE 0.0s

#8 [build 1/6] FROM docker.io/library/ubuntu:22.04@sha256:4e0171b9275e12d375863f2b3ae9ce00a4c53ddda176bd55868df97ac6f21a6e
#8 resolve docker.io/library/ubuntu:22.04@sha256:4e0171b9275e12d375863f2b3ae9ce00a4c53ddda176bd55868df97ac6f21a6e done
#8 DONE 0.0s

#9 [stage-1 2/4] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&             apt-get install -y --no-install-recommends                 libboost-all-dev libc6 procps miniupnpc &&         rm -rf /var/lib/apt/lists/*
#9 CACHED

#10 [internal] load build context
#10 transferring context: 80.72kB 0.0s done
#10 DONE 0.1s

#11 [build 2/6] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&         apt-get install -y --no-install-recommends             build-essential cmake git pkg-config             libboost-all-dev libssl-dev libpthread-stubs0-dev libc6-dev libminiupnpc-dev &&         rm -rf /var/lib/apt/lists/*
#11 CACHED

#12 [build 3/6] WORKDIR /src
#12 CACHED

#13 [build 4/6] COPY zion-cryptonote/ /src/zion-cryptonote/
#13 DONE 0.3s

#14 [build 5/6] WORKDIR /src/zion-cryptonote
#14 DONE 0.0s

#15 [build 6/6] RUN cmake -S . -B build -DCMAKE_BUILD_TYPE=Release     && cmake --build build -j "$(nproc)"
#15 0.751 -- The C compiler identification is GNU 11.4.0
#15 1.090 -- The CXX compiler identification is GNU 11.4.0
#15 1.120 -- Detecting C compiler ABI info
#15 1.697 -- Detecting C compiler ABI info - done
#15 1.713 -- Check for working C compiler: /usr/bin/cc - skipped
#15 1.714 -- Detecting C compile features
#15 1.715 -- Detecting C compile features - done
#15 1.718 -- Detecting CXX compiler ABI info
#15 2.348 -- Detecting CXX compiler ABI info - done
#15 2.364 -- Check for working CXX compiler: /usr/bin/c++ - skipped
#15 2.364 -- Detecting CXX compile features
#15 2.365 -- Detecting CXX compile features - done
#15 2.371 -- Looking for pthread.h
#15 2.912 -- Looking for pthread.h - found
#15 2.912 -- Performing Test CMAKE_HAVE_LIBC_PTHREAD
#15 3.435 -- Performing Test CMAKE_HAVE_LIBC_PTHREAD - Success
#15 3.438 -- Found Threads: TRUE  
#15 3.473 -- Found Boost: /usr/include (found suitable version "1.74.0", minimum required is "1.55") found components: system filesystem date_time chrono regex serialization program_options 
#15 3.501 -- Found Git: /usr/bin/git
#15 3.505 -- External dependencies: minimal setup
#15 3.515 -- Configuring done
#15 3.577 -- Generating done
#15 3.579 -- Build files have been written to: /src/zion-cryptonote/build
#15 3.998 [  0%] Building CXX object src/CMakeFiles/BlockchainExplorer.dir/BlockchainExplorer/BlockchainExplorer.cpp.o
#15 4.021 [  0%] Building C object src/CMakeFiles/Crypto.dir/crypto/blake256.c.o
#15 4.022 [  0%] Building CXX object src/CMakeFiles/Common.dir/Common/Base58.cpp.o
#15 4.041 fatal: not a git repository (or any of the parent directories): .git
#15 4.046 CMake Warning at src/version.cmake:3 (message):
#15 4.046   Cannot determine current revision.  Make sure that you are building either
#15 4.046   from a Git working tree or from a source archive.
#15 4.046 
#15 4.046 
#15 4.133 [  0%] Built target version
#15 4.210 [  1%] Building CXX object src/CMakeFiles/Common.dir/Common/BlockingQueue.cpp.o
#15 4.870 /src/zion-cryptonote/src/Common/Base58.cpp: In function 'uint64_t Tools::Base58::{anonymous}::uint_8be_to_64(const uint8_t*, size_t)':
#15 4.870 /src/zion-cryptonote/src/Common/Base58.cpp:87:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 4.870    87 |         case 1:            res |= *data++;
#15 4.870       |                            ~~~~^~~~~~~~~~
#15 4.870 /src/zion-cryptonote/src/Common/Base58.cpp:88:9: note: here
#15 4.870    88 |         case 2: res <<= 8; res |= *data++;
#15 4.870       |         ^~~~
#15 4.871 /src/zion-cryptonote/src/Common/Base58.cpp:88:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 4.871    88 |         case 2: res <<= 8; res |= *data++;
#15 4.871       |                            ~~~~^~~~~~~~~~
#15 4.871 /src/zion-cryptonote/src/Common/Base58.cpp:89:9: note: here
#15 4.871    89 |         case 3: res <<= 8; res |= *data++;
#15 4.871       |         ^~~~
#15 4.872 /src/zion-cryptonote/src/Common/Base58.cpp:89:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 4.872    89 |         case 3: res <<= 8; res |= *data++;
#15 4.872       |                            ~~~~^~~~~~~~~~
#15 4.872 /src/zion-cryptonote/src/Common/Base58.cpp:90:9: note: here
#15 4.872    90 |         case 4: res <<= 8; res |= *data++;
#15 4.872       |         ^~~~
#15 4.872 /src/zion-cryptonote/src/Common/Base58.cpp:90:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 4.872    90 |         case 4: res <<= 8; res |= *data++;
#15 4.872       |                            ~~~~^~~~~~~~~~
#15 4.872 /src/zion-cryptonote/src/Common/Base58.cpp:91:9: note: here
#15 4.872    91 |         case 5: res <<= 8; res |= *data++;
#15 4.872       |         ^~~~
#15 4.872 /src/zion-cryptonote/src/Common/Base58.cpp:91:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 4.872    91 |         case 5: res <<= 8; res |= *data++;
#15 4.872       |                            ~~~~^~~~~~~~~~
#15 4.872 /src/zion-cryptonote/src/Common/Base58.cpp:92:9: note: here
#15 4.872    92 |         case 6: res <<= 8; res |= *data++;
#15 4.872       |         ^~~~
#15 4.872 /src/zion-cryptonote/src/Common/Base58.cpp:92:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 4.872    92 |         case 6: res <<= 8; res |= *data++;
#15 4.872       |                            ~~~~^~~~~~~~~~
#15 4.872 /src/zion-cryptonote/src/Common/Base58.cpp:93:9: note: here
#15 4.872    93 |         case 7: res <<= 8; res |= *data++;
#15 4.872       |         ^~~~
#15 4.872 /src/zion-cryptonote/src/Common/Base58.cpp:93:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 4.872    93 |         case 7: res <<= 8; res |= *data++;
#15 4.872       |                            ~~~~^~~~~~~~~~
#15 4.872 /src/zion-cryptonote/src/Common/Base58.cpp:94:9: note: here
#15 4.872    94 |         case 8: res <<= 8; res |= *data; break;
#15 4.872       |         ^~~~
#15 5.025 /src/zion-cryptonote/src/Common/BlockingQueue.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#15 5.025     8 | char suppressMSVCWarningLNK4221;
#15 5.025       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#15 5.155 [  2%] Building C object src/CMakeFiles/Crypto.dir/crypto/chacha8.c.o
#15 5.184 [  2%] Building CXX object src/CMakeFiles/Common.dir/Common/CommandLine.cpp.o
#15 5.929 [  3%] Building CXX object src/CMakeFiles/BlockchainExplorer.dir/BlockchainExplorer/BlockchainExplorerDataBuilder.cpp.o
#15 6.090 [  3%] Building C object src/CMakeFiles/Crypto.dir/crypto/crypto-ops-data.c.o
#15 6.166 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 6.166                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 6.166                  from /src/zion-cryptonote/include/INode.h:15,
#15 6.166                  from /src/zion-cryptonote/src/BlockchainExplorer/BlockchainExplorer.h:12,
#15 6.166                  from /src/zion-cryptonote/src/BlockchainExplorer/BlockchainExplorer.cpp:5:
#15 6.166 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 6.166 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 6.166    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 6.166       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 6.167 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 6.167    23 |   struct chacha8_key {
#15 6.167       |          ^~~~~~~~~~~
#15 6.402 [  4%] Building C object src/CMakeFiles/Crypto.dir/crypto/crypto-ops.c.o
#15 9.116 [  4%] Building CXX object src/CMakeFiles/Crypto.dir/crypto/crypto.cpp.o
#15 9.116 [  5%] Building CXX object src/CMakeFiles/Common.dir/Common/ConsoleHandler.cpp.o
#15 9.226 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 9.226                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 9.226                  from /src/zion-cryptonote/src/BlockchainExplorer/BlockchainExplorerDataBuilder.cpp:11:
#15 9.226 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 9.226 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 9.226    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 9.226       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 9.227 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 9.227    23 |   struct chacha8_key {
#15 9.227       |          ^~~~~~~~~~~
#15 12.72 [  6%] Building C object src/CMakeFiles/Crypto.dir/crypto/groestl.c.o
#15 13.70 [  6%] Building CXX object src/CMakeFiles/Common.dir/Common/ConsoleTools.cpp.o
#15 14.30 [  6%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash-extra-blake.c.o
#15 14.75 [  7%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash-extra-groestl.c.o
#15 14.93 [  7%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash-extra-jh.c.o
#15 15.16 /src/zion-cryptonote/src/crypto/hash-extra-jh.c: In function 'hash_extra_jh':
#15 15.16 /src/zion-cryptonote/src/crypto/hash-extra-jh.c:14:7: warning: unused variable 'r' [-Wunused-variable]
#15 15.16    14 |   int r = jh_hash(HASH_SIZE * 8, data, 8 * length, (uint8_t*)hash);
#15 15.16       |       ^
#15 15.19 [  8%] Building CXX object src/CMakeFiles/Common.dir/Common/IInputStream.cpp.o
#15 15.51 [  9%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash-extra-skein.c.o
#15 15.53 [  9%] Building CXX object src/CMakeFiles/Common.dir/Common/IOutputStream.cpp.o
#15 15.61 [ 10%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Account.cpp.o
#15 15.63 [ 10%] Building CXX object src/CMakeFiles/BlockchainExplorer.dir/BlockchainExplorer/BlockchainExplorerErrors.cpp.o
#15 15.75 /src/zion-cryptonote/src/crypto/hash-extra-skein.c: In function 'hash_extra_skein':
#15 15.75 /src/zion-cryptonote/src/crypto/hash-extra-skein.c:12:7: warning: unused variable 'r' [-Wunused-variable]
#15 15.75    12 |   int r = skein_hash(8 * HASH_SIZE, data, 8 * length, (uint8_t*)hash);
#15 15.75       |       ^
#15 15.89 [ 11%] Building CXX object src/CMakeFiles/Common.dir/Common/JsonValue.cpp.o
#15 16.12 [ 11%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash.c.o
#15 16.81 [ 12%] Building C object src/CMakeFiles/Crypto.dir/crypto/jh.c.o
#15 16.84 [ 13%] Linking CXX static library libBlockchainExplorer.a
#15 17.02 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 17.02                  from /src/zion-cryptonote/src/CryptoNoteCore/Account.cpp:6:
#15 17.02 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 17.02 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 17.02    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 17.02       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 17.02 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 17.02    23 |   struct chacha8_key {
#15 17.02       |          ^~~~~~~~~~~
#15 17.29 [ 13%] Built target BlockchainExplorer
#15 17.39 [ 13%] Building CXX object src/CMakeFiles/Common.dir/Common/Math.cpp.o
#15 17.72 [ 13%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/BlockIndex.cpp.o
#15 17.85 /src/zion-cryptonote/src/Common/Math.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#15 17.85     8 | char suppressMSVCWarningLNK4221;
#15 17.85       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#15 17.88 [ 13%] Building C object src/CMakeFiles/Crypto.dir/crypto/keccak.c.o
#15 17.96 [ 14%] Building C object src/CMakeFiles/Crypto.dir/crypto/oaes_lib.c.o
#15 18.23 /src/zion-cryptonote/src/crypto/oaes_lib.c: In function 'oaes_get_seed':
#15 18.23 /src/zion-cryptonote/src/crypto/oaes_lib.c:490:9: warning: 'ftime' is deprecated: Use gettimeofday or clock_gettime instead [-Wdeprecated-declarations]
#15 18.23   490 |         ftime (&timer);
#15 18.23       |         ^~~~~
#15 18.23 In file included from /src/zion-cryptonote/src/crypto/oaes_lib.c:36:
#15 18.23 /usr/include/x86_64-linux-gnu/sys/timeb.h:29:12: note: declared here
#15 18.23    29 | extern int ftime (struct timeb *__timebuf)
#15 18.23       |            ^~~~~
#15 18.29 At top level:
#15 18.29 /src/zion-cryptonote/src/crypto/oaes_lib.c:30:19: warning: '_NR' defined but not used [-Wunused-const-variable=]
#15 18.29    30 | static const char _NR[] = {
#15 18.29       |                   ^~~
#15 18.71 [ 15%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Blockchain.cpp.o
#15 18.87 [ 16%] Building CXX object src/CMakeFiles/Common.dir/Common/MemoryInputStream.cpp.o
#15 19.08 [ 16%] Building C object src/CMakeFiles/Crypto.dir/crypto/random.c.o
#15 19.46 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 19.46                  from /src/zion-cryptonote/src/CryptoNoteCore/BlockIndex.cpp:9:
#15 19.46 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 19.46 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 19.46    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 19.46       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 19.46 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 19.46    23 |   struct chacha8_key {
#15 19.46       |          ^~~~~~~~~~~
#15 19.64 [ 16%] Building CXX object src/CMakeFiles/Common.dir/Common/PathTools.cpp.o
#15 19.78 [ 17%] Building C object src/CMakeFiles/Crypto.dir/crypto/skein.c.o
#15 20.35 /src/zion-cryptonote/src/CryptoNoteCore/BlockIndex.cpp: In member function 'std::vector<Crypto::Hash> CryptoNote::BlockIndex::buildSparseChain(const Crypto::Hash&) const':
#15 20.35 /src/zion-cryptonote/src/CryptoNoteCore/BlockIndex.cpp:51:66: warning: 'startBlockHeight' may be used uninitialized in this function [-Wmaybe-uninitialized]
#15 20.35    51 |     size_t sparseChainEnd = static_cast<size_t>(startBlockHeight + 1);
#15 20.35       |                                                 ~~~~~~~~~~~~~~~~~^~~
#15 20.60 [ 17%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/BlockchainIndices.cpp.o
#15 20.82 [ 18%] Building CXX object src/CMakeFiles/Common.dir/Common/ScopeExit.cpp.o
#15 21.02 [ 18%] Building C object src/CMakeFiles/Crypto.dir/crypto/slow-hash.c.o
#15 21.29 In file included from /src/zion-cryptonote/src/crypto/slow-hash.c:183:
#15 21.29 /src/zion-cryptonote/src/crypto/slow-hash.inl: In function 'cn_slow_hash_noaesni':
#15 21.29 /src/zion-cryptonote/src/crypto/slow-hash.inl:16:44: warning: unused variable 'b_x' [-Wunused-variable]
#15 21.29    16 |   __m128i *longoutput, *expkey, *xmminput, b_x;
#15 21.29       |                                            ^~~
#15 21.29 /src/zion-cryptonote/src/crypto/slow-hash.inl:16:12: warning: variable 'longoutput' set but not used [-Wunused-but-set-variable]
#15 21.29    16 |   __m128i *longoutput, *expkey, *xmminput, b_x;
#15 21.29       |            ^~~~~~~~~~
#15 21.74 [ 18%] Building CXX object src/CMakeFiles/Common.dir/Common/SignalHandler.cpp.o
#15 21.74 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 21.74                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 21.74                  from /src/zion-cryptonote/src/CryptoNoteCore/Blockchain.h:21,
#15 21.74                  from /src/zion-cryptonote/src/CryptoNoteCore/Blockchain.cpp:5:
#15 21.74 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 21.74 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 21.74    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 21.74       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 21.75 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 21.75    23 |   struct chacha8_key {
#15 21.75       |          ^~~~~~~~~~~
#15 22.23 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 22.23                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#15 22.23                  from /src/zion-cryptonote/src/CryptoNoteCore/BlockchainIndices.cpp:8:
#15 22.23 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 22.23 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 22.23    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 22.23       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 22.23 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 22.23    23 |   struct chacha8_key {
#15 22.23       |          ^~~~~~~~~~~
#15 22.29 [ 19%] Building CXX object src/CMakeFiles/Crypto.dir/crypto/slow-hash.cpp.o
#15 22.76 /src/zion-cryptonote/src/crypto/slow-hash.cpp: In destructor 'Crypto::cn_context::~cn_context()':
#15 22.76 /src/zion-cryptonote/src/crypto/slow-hash.cpp:54:7: warning: 'throw' will always call 'terminate' [-Wterminate]
#15 22.76    54 |       throw bad_alloc();
#15 22.76       |       ^~~~~~~~~~~~~~~~~
#15 22.76 /src/zion-cryptonote/src/crypto/slow-hash.cpp:54:7: note: in C++11 destructors default to 'noexcept'
#15 23.13 [ 20%] Building CXX object src/CMakeFiles/Common.dir/Common/StdInputStream.cpp.o
#15 23.13 [ 21%] Building C object src/CMakeFiles/Crypto.dir/crypto/tree-hash.c.o
#15 24.36 [ 21%] Linking CXX static library libCrypto.a
#15 24.72 [ 21%] Building CXX object src/CMakeFiles/Common.dir/Common/StdOutputStream.cpp.o
#15 24.85 [ 21%] Building CXX object src/CMakeFiles/Http.dir/HTTP/HttpParser.cpp.o
#15 24.91 [ 21%] Built target Crypto
#15 25.04 [ 22%] Building CXX object src/CMakeFiles/Http.dir/HTTP/HttpParserErrorCodes.cpp.o
#15 26.03 [ 23%] Building CXX object src/CMakeFiles/Common.dir/Common/StreamTools.cpp.o
#15 26.49 [ 24%] Building CXX object src/CMakeFiles/InProcessNode.dir/InProcessNode/InProcessNode.cpp.o
#15 26.93 [ 24%] Building CXX object src/CMakeFiles/Http.dir/HTTP/HttpRequest.cpp.o
#15 27.79 [ 24%] Building CXX object src/CMakeFiles/Common.dir/Common/StringInputStream.cpp.o
#15 29.17 [ 26%] Building CXX object src/CMakeFiles/Http.dir/HTTP/HttpResponse.cpp.o
#15 29.17 [ 26%] Building CXX object src/CMakeFiles/Common.dir/Common/StringOutputStream.cpp.o
#15 29.75 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 29.75                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 29.75                  from /src/zion-cryptonote/include/INode.h:15,
#15 29.75                  from /src/zion-cryptonote/src/InProcessNode/InProcessNode.h:7,
#15 29.75                  from /src/zion-cryptonote/src/InProcessNode/InProcessNode.cpp:5:
#15 29.75 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 29.75 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 29.75    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 29.75       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 29.75 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 29.75    23 |   struct chacha8_key {
#15 29.75       |          ^~~~~~~~~~~
#15 30.35 [ 26%] Building CXX object src/CMakeFiles/Common.dir/Common/StringTools.cpp.o
#15 31.07 [ 26%] Linking CXX static library libHttp.a
#15 31.50 [ 26%] Built target Http
#15 31.60 [ 26%] Building CXX object src/CMakeFiles/InProcessNode.dir/InProcessNode/InProcessNodeErrors.cpp.o
#15 32.98 [ 27%] Building CXX object src/CMakeFiles/Common.dir/Common/StringView.cpp.o
#15 33.32 [ 27%] Building CXX object src/CMakeFiles/Logging.dir/Logging/CommonLogger.cpp.o
#15 34.78 [ 28%] Building CXX object src/CMakeFiles/Common.dir/Common/Util.cpp.o
#15 35.93 [ 29%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/BlockchainMessages.cpp.o
#15 37.76 [ 29%] Building CXX object src/CMakeFiles/Common.dir/Common/VectorOutputStream.cpp.o
#15 38.05 [ 29%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Checkpoints.cpp.o
#15 38.95 [ 30%] Linking CXX static library libCommon.a
#15 39.48 [ 30%] Built target Common
#15 39.57 [ 31%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Core.cpp.o
#15 40.69 [ 32%] Building CXX object src/CMakeFiles/Logging.dir/Logging/ConsoleLogger.cpp.o
#15 41.73 [ 33%] Linking CXX static library libInProcessNode.a
#15 42.16 [ 33%] Built target InProcessNode
#15 42.24 [ 33%] Building CXX object src/CMakeFiles/Logging.dir/Logging/FileLogger.cpp.o
#15 42.73 [ 33%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CoreConfig.cpp.o
#15 45.14 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 45.14                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 45.14                  from /src/zion-cryptonote/src/CryptoNoteCore/Blockchain.h:21,
#15 45.14                  from /src/zion-cryptonote/src/CryptoNoteCore/Core.h:14,
#15 45.14                  from /src/zion-cryptonote/src/CryptoNoteCore/Core.cpp:5:
#15 45.14 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 45.14 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 45.14    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 45.14       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 45.16 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 45.16    23 |   struct chacha8_key {
#15 45.16       |          ^~~~~~~~~~~
#15 46.79 [ 34%] Building CXX object src/CMakeFiles/Logging.dir/Logging/ILogger.cpp.o
#15 47.16 /src/zion-cryptonote/src/CryptoNoteCore/Core.cpp: In member function 'virtual std::unique_ptr<CryptoNote::IBlock> CryptoNote::core::getBlock(const Crypto::Hash&)':
#15 47.16 /src/zion-cryptonote/src/CryptoNoteCore/Core.cpp:981:19: warning: redundant move in return statement [-Wredundant-move]
#15 47.16   981 |   return std::move(blockPtr);
#15 47.16       |          ~~~~~~~~~^~~~~~~~~~
#15 47.16 /src/zion-cryptonote/src/CryptoNoteCore/Core.cpp:981:19: note: remove 'std::move' call
#15 48.99 [ 34%] Building CXX object src/CMakeFiles/Logging.dir/Logging/LoggerGroup.cpp.o
#15 49.71 [ 35%] Building CXX object src/CMakeFiles/NodeRpcProxy.dir/NodeRpcProxy/NodeErrors.cpp.o
#15 51.22 [ 35%] Building CXX object src/CMakeFiles/NodeRpcProxy.dir/NodeRpcProxy/NodeRpcProxy.cpp.o
#15 52.12 [ 36%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/HttpClient.cpp.o
#15 52.84 [ 37%] Building CXX object src/CMakeFiles/Logging.dir/Logging/LoggerManager.cpp.o
#15 53.57 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 53.57                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 53.57                  from /src/zion-cryptonote/include/INode.h:15,
#15 53.57                  from /src/zion-cryptonote/src/NodeRpcProxy/NodeRpcProxy.h:15,
#15 53.57                  from /src/zion-cryptonote/src/NodeRpcProxy/NodeRpcProxy.cpp:5:
#15 53.57 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 53.57 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 53.57    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 53.57       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 53.57 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 53.57    23 |   struct chacha8_key {
#15 53.57       |          ^~~~~~~~~~~
#15 54.04 [ 37%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/HttpServer.cpp.o
#15 56.54 [ 38%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteBasic.cpp.o
#15 59.74 [ 38%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteBasicImpl.cpp.o
#15 60.01 [ 39%] Building CXX object src/CMakeFiles/Logging.dir/Logging/LoggerMessage.cpp.o
#15 61.30 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 61.30                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 61.30                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteBasicImpl.cpp:6:
#15 61.30 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 61.30 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 61.30    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 61.30       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 61.30 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 61.30    23 |   struct chacha8_key {
#15 61.30       |          ^~~~~~~~~~~
#15 61.44 [ 40%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/JsonRpc.cpp.o
#15 61.47 /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteBasicImpl.cpp: In function 'std::string CryptoNote::getAccountAddressAsStr(uint64_t, const CryptoNote::AccountPublicAddress&)':
#15 61.47 /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteBasicImpl.cpp:53:10: warning: unused variable 'r' [-Wunused-variable]
#15 61.47    53 |     bool r = toBinaryArray(adr, ba);
#15 61.47       |          ^
#15 62.48 [ 41%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteFormatUtils.cpp.o
#15 62.63 /src/zion-cryptonote/src/Logging/LoggerMessage.cpp: In constructor 'Logging::LoggerMessage::LoggerMessage(Logging::LoggerMessage&&)':
#15 62.63 /src/zion-cryptonote/src/Logging/LoggerMessage.cpp:65:11: warning: unused variable '_Pnext' [-Wunused-variable]
#15 62.63    65 |     char *_Pnext = pptr();
#15 62.63       |           ^~~~~~
#15 63.27 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 63.27                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 63.27                  from /src/zion-cryptonote/src/Rpc/CoreRpcServerCommandsDefinitions.h:7,
#15 63.27                  from /src/zion-cryptonote/src/Rpc/JsonRpc.h:11,
#15 63.27                  from /src/zion-cryptonote/src/Rpc/JsonRpc.cpp:5:
#15 63.27 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 63.27 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 63.27    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 63.27       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 63.27 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 63.27    23 |   struct chacha8_key {
#15 63.27       |          ^~~~~~~~~~~
#15 64.27 [ 42%] Linking CXX static library libNodeRpcProxy.a
#15 64.74 [ 42%] Building CXX object src/CMakeFiles/Logging.dir/Logging/LoggerRef.cpp.o
#15 64.76 [ 42%] Built target NodeRpcProxy
#15 65.14 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 65.14                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 65.14                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.cpp:5:
#15 65.14 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 65.14 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 65.14    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 65.14       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 65.14 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 65.14    23 |   struct chacha8_key {
#15 65.14       |          ^~~~~~~~~~~
#15 65.16 [ 42%] Building CXX object src/CMakeFiles/P2P.dir/CryptoNoteProtocol/CryptoNoteProtocolHandler.cpp.o
#15 65.77 [ 42%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/RpcServer.cpp.o
#15 68.31 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 68.31                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 68.31                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolHandler.h:13,
#15 68.31                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolHandler.cpp:5:
#15 68.31 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 68.31 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 68.31    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 68.31       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 68.31 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 68.31    23 |   struct chacha8_key {
#15 68.31       |          ^~~~~~~~~~~
#15 69.04 [ 43%] Building CXX object src/CMakeFiles/Logging.dir/Logging/StreamLogger.cpp.o
#15 72.77 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 72.77                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 72.77                  from /src/zion-cryptonote/src/Rpc/CoreRpcServerCommandsDefinitions.h:7,
#15 72.77                  from /src/zion-cryptonote/src/Rpc/RpcServer.h:11,
#15 72.77                  from /src/zion-cryptonote/src/Rpc/RpcServer.cpp:5:
#15 72.77 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 72.77 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 72.77    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 72.77       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 72.78 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 72.78    23 |   struct chacha8_key {
#15 72.78       |          ^~~~~~~~~~~
#15 73.91 [ 43%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteSerialization.cpp.o
#15 75.94 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 75.94                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.cpp:5:
#15 75.94 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 75.94 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 75.94    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 75.94       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 75.94 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 75.94    23 |   struct chacha8_key {
#15 75.94       |          ^~~~~~~~~~~
#15 78.16 [ 43%] Linking CXX static library libLogging.a
#15 78.93 [ 43%] Built target Logging
#15 79.31 [ 44%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/BinaryInputStreamSerializer.cpp.o
#15 80.69 [ 45%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteTools.cpp.o
#15 81.47 [ 46%] Building CXX object src/CMakeFiles/P2P.dir/P2p/IP2pNodeInternal.cpp.o
#15 81.83 [ 46%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/BinaryOutputStreamSerializer.cpp.o
#15 82.71 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 82.71                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#15 82.71                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.cpp:5:
#15 82.71 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 82.71 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 82.71    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 82.71       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 82.71 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 82.71    23 |   struct chacha8_key {
#15 82.71       |          ^~~~~~~~~~~
#15 83.22 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 83.22                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#15 83.22                  from /src/zion-cryptonote/src/P2p/IP2pNodeInternal.h:8,
#15 83.22                  from /src/zion-cryptonote/src/P2p/IP2pNodeInternal.cpp:5:
#15 83.22 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 83.22 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 83.22    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 83.22       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 83.22 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 83.22    23 |   struct chacha8_key {
#15 83.22       |          ^~~~~~~~~~~
#15 83.32 [ 47%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/JsonInputStreamSerializer.cpp.o
#15 83.81 [ 47%] Building CXX object src/CMakeFiles/P2P.dir/P2p/LevinProtocol.cpp.o
#15 84.00 [ 47%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Currency.cpp.o
#15 84.68 [ 48%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/JsonInputValueSerializer.cpp.o
#15 85.93 [ 49%] Building CXX object src/CMakeFiles/P2P.dir/P2p/NetNode.cpp.o
#15 86.45 [ 49%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/JsonOutputStreamSerializer.cpp.o
#15 86.95 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 86.95                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 86.95                  from /src/zion-cryptonote/src/CryptoNoteCore/Currency.cpp:15:
#15 86.95 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 86.95 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 86.95    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 86.95       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 86.95 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 86.95    23 |   struct chacha8_key {
#15 86.95       |          ^~~~~~~~~~~
#15 88.96 [ 50%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/KVBinaryInputStreamSerializer.cpp.o
#15 89.28 [ 51%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/RpcServerConfig.cpp.o
#15 90.30 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 90.30                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 90.30                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolHandler.h:13,
#15 90.30                  from /src/zion-cryptonote/src/P2p/NetNode.h:21,
#15 90.30                  from /src/zion-cryptonote/src/P2p/NetNode.cpp:5:
#15 90.30 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 90.30 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 90.30    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 90.30       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 90.30 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 90.30    23 |   struct chacha8_key {
#15 90.30       |          ^~~~~~~~~~~
#15 91.00 [ 51%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/KVBinaryOutputStreamSerializer.cpp.o
#15 91.09 [ 52%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Difficulty.cpp.o
#15 92.24 [ 52%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/IBlock.cpp.o
#15 92.93 [ 53%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/MemoryStream.cpp.o
#15 93.57 [ 53%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/SerializationOverloads.cpp.o
#15 93.81 [ 54%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/ITimeProvider.cpp.o
#15 94.09 [ 54%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Miner.cpp.o
#15 94.30 [ 54%] Linking CXX static library libRpc.a
#15 94.65 [ 54%] Built target Rpc
#15 94.71 [ 55%] Linking CXX static library libSerialization.a
#15 94.89 [ 56%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/Dispatcher.cpp.o
#15 95.10 [ 56%] Built target Serialization
#15 95.19 [ 56%] Building CXX object src/CMakeFiles/P2P.dir/P2p/NetNodeConfig.cpp.o
#15 95.63 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp: In constructor 'System::Dispatcher::Dispatcher()':
#15 95.63 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp:92:14: warning: unused variable 'result' [-Wunused-variable]
#15 95.63    92 |         auto result = close(remoteSpawnEvent);
#15 95.63       |              ^~~~~~
#15 95.63 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp:97:10: warning: unused variable 'result' [-Wunused-variable]
#15 95.63    97 |     auto result = close(epoll);
#15 95.63       |          ^~~~~~
#15 95.64 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp: In destructor 'System::Dispatcher::~Dispatcher()':
#15 95.64 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp:123:9: warning: unused variable 'result' [-Wunused-variable]
#15 95.64   123 |     int result = ::close(timers.top());
#15 95.64       |         ^~~~~~
#15 95.64 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp:128:8: warning: variable 'result' set but not used [-Wunused-but-set-variable]
#15 95.64   128 |   auto result = close(epoll);
#15 95.64       |        ^~~~~~
#15 97.43 [ 56%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/ErrorMessage.cpp.o
#15 98.83 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 98.83                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 98.83                  from /src/zion-cryptonote/src/CryptoNoteCore/Miner.cpp:24:
#15 98.83 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 98.83 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 98.83    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 98.83       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 98.83 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 98.83    23 |   struct chacha8_key {
#15 98.83       |          ^~~~~~~~~~~
#15 99.80 [ 57%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/Ipv4Resolver.cpp.o
#15 101.8 [ 57%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/TcpConnection.cpp.o
#15 102.1 [ 58%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/TcpConnector.cpp.o
#15 102.6 [ 59%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pConnectionProxy.cpp.o
#15 102.6 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp: In destructor 'System::TcpConnection::~TcpConnection()':
#15 102.6 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:37:9: warning: unused variable 'result' [-Wunused-variable]
#15 102.6    37 |     int result = close(connection);
#15 102.6       |         ^~~~~~
#15 102.6 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp: In member function 'size_t System::TcpConnection::read(uint8_t*, size_t)':
#15 102.6 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:73:26: warning: logical 'and' of equal expressions [-Wlogical-op]
#15 102.6    73 |     if (errno != EAGAIN  && errno != EWOULDBLOCK) {
#15 102.6       |                          ^
#15 102.7 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp: In member function 'std::size_t System::TcpConnection::write(const uint8_t*, size_t)':
#15 102.7 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:169:26: warning: logical 'and' of equal expressions [-Wlogical-op]
#15 102.7   169 |     if (errno != EAGAIN  && errno != EWOULDBLOCK) {
#15 102.7       |                          ^
#15 103.2 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnector.cpp: In member function 'System::TcpConnection System::TcpConnector::connect(const System::Ipv4Address&, uint16_t)':
#15 103.2 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnector.cpp:133:23: warning: unused variable 'result' [-Wunused-variable]
#15 103.2   133 |                   int result = close(connection);
#15 103.2       |                       ^~~~~~
#15 103.2 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnector.cpp:160:9: warning: unused variable 'result' [-Wunused-variable]
#15 103.2   160 |     int result = close(connection);
#15 103.2       |         ^~~~~~
#15 104.1 [ 60%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/MinerConfig.cpp.o
#15 104.3 [ 60%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/TcpListener.cpp.o
#15 104.6 [ 60%] Building CXX object src/CMakeFiles/Transfers.dir/Transfers/BlockchainSynchronizer.cpp.o
#15 105.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp: In constructor 'System::TcpListener::TcpListener(System::Dispatcher&, const System::Ipv4Address&, uint16_t)':
#15 105.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp:63:9: warning: unused variable 'result' [-Wunused-variable]
#15 105.0    63 |     int result = close(listener);
#15 105.0       |         ^~~~~~
#15 105.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp: In destructor 'System::TcpListener::~TcpListener()':
#15 105.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp:82:9: warning: unused variable 'result' [-Wunused-variable]
#15 105.0    82 |     int result = close(listener);
#15 105.0       |         ^~~~~~
#15 105.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp: In member function 'System::TcpConnection System::TcpListener::accept()':
#15 105.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp:176:11: warning: unused variable 'result' [-Wunused-variable]
#15 105.0   176 |       int result = close(connection);
#15 105.0       |           ^~~~~~
#15 105.7 [ 61%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/Timer.cpp.o
#15 106.1 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 106.1                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#15 106.1                  from /src/zion-cryptonote/src/P2p/IP2pNodeInternal.h:8,
#15 106.1                  from /src/zion-cryptonote/src/P2p/P2pConnectionProxy.h:9,
#15 106.1                  from /src/zion-cryptonote/src/P2p/P2pConnectionProxy.cpp:5:
#15 106.1 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 106.1 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 106.1    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 106.1       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 106.1 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 106.1    23 |   struct chacha8_key {
#15 106.1       |          ^~~~~~~~~~~
#15 106.1 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 106.1                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 106.1                  from /src/zion-cryptonote/include/INode.h:15,
#15 106.1                  from /src/zion-cryptonote/src/Transfers/BlockchainSynchronizer.h:7,
#15 106.1                  from /src/zion-cryptonote/src/Transfers/BlockchainSynchronizer.cpp:5:
#15 106.1 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 106.1 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 106.1    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 106.1       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 106.1 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 106.1    23 |   struct chacha8_key {
#15 106.1       |          ^~~~~~~~~~~
#15 106.5 /src/zion-cryptonote/src/Platform/Linux/System/Timer.cpp: In lambda function:
#15 106.5 /src/zion-cryptonote/src/Platform/Linux/System/Timer.cpp:92:32: warning: logical 'or' of equal expressions [-Wlogical-op]
#15 106.5    92 |             if(errno == EAGAIN || errno == EWOULDBLOCK) {
#15 106.5       |                                ^
#15 106.6 /src/zion-cryptonote/src/Transfers/BlockchainSynchronizer.cpp: In member function 'void CryptoNote::BlockchainSynchronizer::processBlocks(CryptoNote::BlockchainSynchronizer::GetBlocksResponse&)':
#15 106.6 /src/zion-cryptonote/src/Transfers/BlockchainSynchronizer.cpp:415:27: error: 'sleep_for' is not a member of 'std::this_thread'
#15 106.6   415 |         std::this_thread::sleep_for(std::chrono::milliseconds(100));
#15 106.6       |                           ^~~~~~~~~
#15 107.4 [ 61%] Building CXX object src/CMakeFiles/System.dir/System/ContextGroup.cpp.o
#15 107.7 gmake[2]: *** [src/CMakeFiles/Transfers.dir/build.make:76: src/CMakeFiles/Transfers.dir/Transfers/BlockchainSynchronizer.cpp.o] Error 1
#15 107.7 gmake[1]: *** [CMakeFiles/Makefile2:496: src/CMakeFiles/Transfers.dir/all] Error 2
#15 107.7 gmake[1]: *** Waiting for unfinished jobs....
#15 107.8 [ 61%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/SwappedMap.cpp.o
#15 108.6 [ 61%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pContext.cpp.o
#15 108.7 [ 62%] Building CXX object src/CMakeFiles/System.dir/System/ContextGroupTimeout.cpp.o
#15 109.4 [ 63%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pContextOwner.cpp.o
#15 109.6 /src/zion-cryptonote/src/CryptoNoteCore/SwappedMap.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#15 109.6     8 | char suppressMSVCWarningLNK4221;
#15 109.6       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#15 109.8 [ 63%] Building CXX object src/CMakeFiles/System.dir/System/Event.cpp.o
#15 109.9 [ 64%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/SwappedVector.cpp.o
#15 110.2 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 110.2                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#15 110.2                  from /src/zion-cryptonote/src/P2p/P2pContext.h:19,
#15 110.2                  from /src/zion-cryptonote/src/P2p/P2pContext.cpp:5:
#15 110.2 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 110.2 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 110.2    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 110.2       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 110.2 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 110.2    23 |   struct chacha8_key {
#15 110.2       |          ^~~~~~~~~~~
#15 110.7 [ 65%] Building CXX object src/CMakeFiles/System.dir/System/EventLock.cpp.o
#15 110.8 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 110.8                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#15 110.8                  from /src/zion-cryptonote/src/P2p/P2pContext.h:19,
#15 110.8                  from /src/zion-cryptonote/src/P2p/P2pContextOwner.cpp:7:
#15 110.8 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 110.8 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 110.8    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 110.8       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 110.8 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 110.8    23 |   struct chacha8_key {
#15 110.8       |          ^~~~~~~~~~~
#15 110.8 /src/zion-cryptonote/src/CryptoNoteCore/SwappedVector.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#15 110.8     8 | char suppressMSVCWarningLNK4221;
#15 110.8       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#15 111.1 [ 65%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Transaction.cpp.o
#15 111.2 [ 65%] Building CXX object src/CMakeFiles/System.dir/System/InterruptedException.cpp.o
#15 111.3 [ 66%] Building CXX object src/CMakeFiles/System.dir/System/Ipv4Address.cpp.o
#15 111.3 [ 66%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pInterfaces.cpp.o
#15 111.5 /src/zion-cryptonote/src/System/InterruptedException.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#15 111.5     8 | char suppressMSVCWarningLNK4221;
#15 111.5       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#15 111.6 [ 67%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pNode.cpp.o
#15 111.8 /src/zion-cryptonote/src/System/Ipv4Address.cpp: In member function 'bool System::Ipv4Address::isPrivate() const':
#15 111.8 /src/zion-cryptonote/src/System/Ipv4Address.cpp:107:26: warning: comparison of integer expressions of different signedness: 'unsigned int' and 'int' [-Wsign-compare]
#15 111.8   107 |     (value & 0xfff00000) == ((172 << 24) | (16 << 16)) ||
#15 111.8       |     ~~~~~~~~~~~~~~~~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 111.8 /src/zion-cryptonote/src/System/Ipv4Address.cpp:109:26: warning: comparison of integer expressions of different signedness: 'unsigned int' and 'int' [-Wsign-compare]
#15 111.8   109 |     (value & 0xffff0000) == ((192 << 24) | (168 << 16));
#15 111.8       |     ~~~~~~~~~~~~~~~~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 112.3 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 112.3                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 112.3                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionApiExtra.h:7,
#15 112.3                  from /src/zion-cryptonote/src/CryptoNoteCore/Transaction.cpp:6:
#15 112.3 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 112.3 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 112.3    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 112.3       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 112.3 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 112.3    23 |   struct chacha8_key {
#15 112.3       |          ^~~~~~~~~~~
#15 112.4 [ 67%] Building CXX object src/CMakeFiles/System.dir/System/RemoteEventLock.cpp.o
#15 112.6 [ 68%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/TransactionExtra.cpp.o
#15 113.7 [ 69%] Building CXX object src/CMakeFiles/System.dir/System/TcpStream.cpp.o
#15 113.9 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 113.9                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#15 113.9                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionExtra.cpp:10:
#15 113.9 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 113.9 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 113.9    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 113.9       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 113.9 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 113.9    23 |   struct chacha8_key {
#15 113.9       |          ^~~~~~~~~~~
#15 114.3 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 114.3                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#15 114.3                  from /src/zion-cryptonote/src/P2p/IP2pNodeInternal.h:8,
#15 114.3                  from /src/zion-cryptonote/src/P2p/P2pNode.h:17,
#15 114.3                  from /src/zion-cryptonote/src/P2p/P2pNode.cpp:5:
#15 114.3 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 114.3 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 114.3    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 114.3       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 114.3 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 114.3    23 |   struct chacha8_key {
#15 114.3       |          ^~~~~~~~~~~
#15 115.3 [ 70%] Linking CXX static library libSystem.a
#15 115.5 [ 71%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/TransactionPool.cpp.o
#15 115.7 [ 71%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pNodeConfig.cpp.o
#15 115.7 [ 71%] Built target System
#15 115.8 [ 71%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/TransactionPrefixImpl.cpp.o
#15 117.1 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 117.1                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 117.1                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionApiExtra.h:7,
#15 117.1                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionPrefixImpl.cpp:12:
#15 117.1 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 117.1 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 117.1    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 117.1       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 117.1 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 117.1    23 |   struct chacha8_key {
#15 117.1       |          ^~~~~~~~~~~
#15 118.5 [ 72%] Building CXX object src/CMakeFiles/P2P.dir/P2p/PeerListManager.cpp.o
#15 119.2 [ 73%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/TransactionUtils.cpp.o
#15 119.6 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 119.6                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 119.6                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionPool.cpp:21:
#15 119.6 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 119.6 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 119.6    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 119.6       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 119.6 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 119.6    23 |   struct chacha8_key {
#15 119.6       |          ^~~~~~~~~~~
#15 120.3 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 120.3                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 120.3                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionUtils.cpp:11:
#15 120.3 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 120.3 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 120.3    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 120.3       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 120.3 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 120.3    23 |   struct chacha8_key {
#15 120.3       |          ^~~~~~~~~~~
#15 121.7 [ 74%] Linking CXX static library libP2P.a
#15 122.1 [ 74%] Built target P2P
#15 123.7 [ 74%] Linking CXX static library libCryptoNoteCore.a
#15 124.0 [ 74%] Built target CryptoNoteCore
#15 124.0 gmake: *** [Makefile:101: all] Error 2
#15 ERROR: process "/bin/sh -c cmake -S . -B build -DCMAKE_BUILD_TYPE=Release     && cmake --build build -j \"$(nproc)\"" did not complete successfully: exit code: 2
------
 > [build 6/6] RUN cmake -S . -B build -DCMAKE_BUILD_TYPE=Release     && cmake --build build -j "$(nproc)":
120.3    48 |     memcpy(&key, &pwd_hash, sizeof(key));
120.3       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
120.3 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
120.3    23 |   struct chacha8_key {
120.3       |          ^~~~~~~~~~~
121.7 [ 74%] Linking CXX static library libP2P.a
122.1 [ 74%] Built target P2P
123.7 [ 74%] Linking CXX static library libCryptoNoteCore.a
124.0 [ 74%] Built target CryptoNoteCore
124.0 gmake: *** [Makefile:101: all] Error 2
------

 [33m2 warnings found (use docker --debug to expand):
[0m - FromPlatformFlagConstDisallowed: FROM --platform flag should not use constant value "linux/amd64" (line 3)
 - FromPlatformFlagConstDisallowed: FROM --platform flag should not use constant value "linux/amd64" (line 20)
Dockerfile.zion-cryptonote:17
--------------------
  16 |     WORKDIR /src/zion-cryptonote
  17 | >>> RUN cmake -S . -B build -DCMAKE_BUILD_TYPE=Release \
  18 | >>>     && cmake --build build -j "$(nproc)"
  19 |     
--------------------
ERROR: failed to build: failed to solve: process "/bin/sh -c cmake -S . -B build -DCMAKE_BUILD_TYPE=Release     && cmake --build build -j \"$(nproc)\"" did not complete successfully: exit code: 2
\n## Build pá 19. září 2025 10:26:15 UTC
#0 building with "desktop-linux" instance using docker driver

#1 [internal] load build definition from Dockerfile.zion-cryptonote
#1 transferring dockerfile: 1.43kB done
#1 DONE 0.0s

#2 resolve image config for docker-image://docker.io/docker/dockerfile:1
#2 DONE 0.8s

#3 docker-image://docker.io/docker/dockerfile:1@sha256:dabfc0969b935b2080555ace70ee69a5261af8a8f1b4df97b9e7fbcf6722eddf
#3 resolve docker.io/docker/dockerfile:1@sha256:dabfc0969b935b2080555ace70ee69a5261af8a8f1b4df97b9e7fbcf6722eddf 0.0s done
#3 CACHED

#4 [internal] load metadata for docker.io/library/ubuntu:22.04
#4 DONE 0.5s

#5 [internal] load .dockerignore
#5 transferring context: 333B done
#5 DONE 0.0s

#6 [build 1/6] FROM docker.io/library/ubuntu:22.04@sha256:4e0171b9275e12d375863f2b3ae9ce00a4c53ddda176bd55868df97ac6f21a6e
#6 resolve docker.io/library/ubuntu:22.04@sha256:4e0171b9275e12d375863f2b3ae9ce00a4c53ddda176bd55868df97ac6f21a6e done
#6 DONE 0.0s

#7 [stage-1 2/4] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&             apt-get install -y --no-install-recommends                 libboost-all-dev libc6 procps miniupnpc &&         rm -rf /var/lib/apt/lists/*
#7 CACHED

#8 [internal] load build context
#8 transferring context: 90.45kB 0.1s done
#8 DONE 0.1s

#9 [build 2/6] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&         apt-get install -y --no-install-recommends             build-essential cmake git pkg-config             libboost-all-dev libssl-dev libpthread-stubs0-dev libc6-dev libminiupnpc-dev &&         rm -rf /var/lib/apt/lists/*
#9 CACHED

#10 [build 3/6] WORKDIR /src
#10 CACHED

#11 [build 4/6] COPY zion-cryptonote/ /src/zion-cryptonote/
#11 DONE 0.3s

#12 [build 5/6] WORKDIR /src/zion-cryptonote
#12 DONE 0.0s

#13 [build 6/6] RUN cmake -S . -B build -DCMAKE_BUILD_TYPE=Release     && cmake --build build -j "$(nproc)"
#13 0.789 -- The C compiler identification is GNU 11.4.0
#13 1.125 -- The CXX compiler identification is GNU 11.4.0
#13 1.162 -- Detecting C compiler ABI info
#13 1.740 -- Detecting C compiler ABI info - done
#13 1.757 -- Check for working C compiler: /usr/bin/cc - skipped
#13 1.758 -- Detecting C compile features
#13 1.759 -- Detecting C compile features - done
#13 1.764 -- Detecting CXX compiler ABI info
#13 2.401 -- Detecting CXX compiler ABI info - done
#13 2.416 -- Check for working CXX compiler: /usr/bin/c++ - skipped
#13 2.417 -- Detecting CXX compile features
#13 2.417 -- Detecting CXX compile features - done
#13 2.423 -- Looking for pthread.h
#13 2.929 -- Looking for pthread.h - found
#13 2.929 -- Performing Test CMAKE_HAVE_LIBC_PTHREAD
#13 3.455 -- Performing Test CMAKE_HAVE_LIBC_PTHREAD - Success
#13 3.458 -- Found Threads: TRUE  
#13 3.491 -- Found Boost: /usr/include (found suitable version "1.74.0", minimum required is "1.55") found components: system filesystem date_time chrono regex serialization program_options 
#13 3.521 -- Found Git: /usr/bin/git
#13 3.525 -- External dependencies: minimal setup
#13 3.534 -- Configuring done
#13 3.599 -- Generating done
#13 3.603 -- Build files have been written to: /src/zion-cryptonote/build
#13 4.059 [  0%] Building C object src/CMakeFiles/Crypto.dir/crypto/blake256.c.o
#13 4.062 [  0%] Building CXX object src/CMakeFiles/BlockchainExplorer.dir/BlockchainExplorer/BlockchainExplorer.cpp.o
#13 4.070 [  0%] Building CXX object src/CMakeFiles/Common.dir/Common/Base58.cpp.o
#13 4.083 fatal: not a git repository (or any of the parent directories): .git
#13 4.089 CMake Warning at src/version.cmake:3 (message):
#13 4.089   Cannot determine current revision.  Make sure that you are building either
#13 4.089   from a Git working tree or from a source archive.
#13 4.089 
#13 4.089 
#13 4.178 [  0%] Built target version
#13 4.238 [  1%] Building CXX object src/CMakeFiles/Common.dir/Common/BlockingQueue.cpp.o
#13 4.868 /src/zion-cryptonote/src/Common/Base58.cpp: In function 'uint64_t Tools::Base58::{anonymous}::uint_8be_to_64(const uint8_t*, size_t)':
#13 4.868 /src/zion-cryptonote/src/Common/Base58.cpp:87:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#13 4.868    87 |         case 1:            res |= *data++;
#13 4.868       |                            ~~~~^~~~~~~~~~
#13 4.868 /src/zion-cryptonote/src/Common/Base58.cpp:88:9: note: here
#13 4.868    88 |         case 2: res <<= 8; res |= *data++;
#13 4.868       |         ^~~~
#13 4.868 /src/zion-cryptonote/src/Common/Base58.cpp:88:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#13 4.868    88 |         case 2: res <<= 8; res |= *data++;
#13 4.868       |                            ~~~~^~~~~~~~~~
#13 4.868 /src/zion-cryptonote/src/Common/Base58.cpp:89:9: note: here
#13 4.868    89 |         case 3: res <<= 8; res |= *data++;
#13 4.868       |         ^~~~
#13 4.868 /src/zion-cryptonote/src/Common/Base58.cpp:89:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#13 4.868    89 |         case 3: res <<= 8; res |= *data++;
#13 4.868       |                            ~~~~^~~~~~~~~~
#13 4.868 /src/zion-cryptonote/src/Common/Base58.cpp:90:9: note: here
#13 4.868    90 |         case 4: res <<= 8; res |= *data++;
#13 4.868       |         ^~~~
#13 4.869 /src/zion-cryptonote/src/Common/Base58.cpp:90:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#13 4.869    90 |         case 4: res <<= 8; res |= *data++;
#13 4.869       |                            ~~~~^~~~~~~~~~
#13 4.869 /src/zion-cryptonote/src/Common/Base58.cpp:91:9: note: here
#13 4.869    91 |         case 5: res <<= 8; res |= *data++;
#13 4.869       |         ^~~~
#13 4.869 /src/zion-cryptonote/src/Common/Base58.cpp:91:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#13 4.869    91 |         case 5: res <<= 8; res |= *data++;
#13 4.869       |                            ~~~~^~~~~~~~~~
#13 4.869 /src/zion-cryptonote/src/Common/Base58.cpp:92:9: note: here
#13 4.869    92 |         case 6: res <<= 8; res |= *data++;
#13 4.869       |         ^~~~
#13 4.869 /src/zion-cryptonote/src/Common/Base58.cpp:92:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#13 4.869    92 |         case 6: res <<= 8; res |= *data++;
#13 4.869       |                            ~~~~^~~~~~~~~~
#13 4.869 /src/zion-cryptonote/src/Common/Base58.cpp:93:9: note: here
#13 4.869    93 |         case 7: res <<= 8; res |= *data++;
#13 4.869       |         ^~~~
#13 4.869 /src/zion-cryptonote/src/Common/Base58.cpp:93:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#13 4.869    93 |         case 7: res <<= 8; res |= *data++;
#13 4.869       |                            ~~~~^~~~~~~~~~
#13 4.869 /src/zion-cryptonote/src/Common/Base58.cpp:94:9: note: here
#13 4.869    94 |         case 8: res <<= 8; res |= *data; break;
#13 4.869       |         ^~~~
#13 4.917 /src/zion-cryptonote/src/Common/BlockingQueue.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#13 4.917     8 | char suppressMSVCWarningLNK4221;
#13 4.917       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#13 5.036 [  2%] Building C object src/CMakeFiles/Crypto.dir/crypto/chacha8.c.o
#13 5.090 [  2%] Building CXX object src/CMakeFiles/Common.dir/Common/CommandLine.cpp.o
#13 5.664 [  3%] Building CXX object src/CMakeFiles/BlockchainExplorer.dir/BlockchainExplorer/BlockchainExplorerDataBuilder.cpp.o
#13 5.717 [  3%] Building C object src/CMakeFiles/Crypto.dir/crypto/crypto-ops-data.c.o
#13 5.881 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 5.881                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#13 5.881                  from /src/zion-cryptonote/include/INode.h:15,
#13 5.881                  from /src/zion-cryptonote/src/BlockchainExplorer/BlockchainExplorer.h:12,
#13 5.881                  from /src/zion-cryptonote/src/BlockchainExplorer/BlockchainExplorer.cpp:5:
#13 5.881 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 5.881 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 5.881    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 5.881       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 5.882 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 5.882    23 |   struct chacha8_key {
#13 5.882       |          ^~~~~~~~~~~
#13 5.950 [  4%] Building C object src/CMakeFiles/Crypto.dir/crypto/crypto-ops.c.o
#13 9.112 [  5%] Building CXX object src/CMakeFiles/Common.dir/Common/ConsoleHandler.cpp.o
#13 9.112 [  5%] Building CXX object src/CMakeFiles/Crypto.dir/crypto/crypto.cpp.o
#13 9.128 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 9.128                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#13 9.128                  from /src/zion-cryptonote/src/BlockchainExplorer/BlockchainExplorerDataBuilder.cpp:11:
#13 9.128 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 9.128 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 9.128    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 9.128       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 9.128 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 9.128    23 |   struct chacha8_key {
#13 9.128       |          ^~~~~~~~~~~
#13 13.62 [  6%] Building C object src/CMakeFiles/Crypto.dir/crypto/groestl.c.o
#13 15.50 [  6%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash-extra-blake.c.o
#13 16.10 [  7%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash-extra-groestl.c.o
#13 16.11 [  7%] Building CXX object src/CMakeFiles/Common.dir/Common/ConsoleTools.cpp.o
#13 16.62 [  7%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash-extra-jh.c.o
#13 16.94 /src/zion-cryptonote/src/crypto/hash-extra-jh.c: In function 'hash_extra_jh':
#13 16.94 /src/zion-cryptonote/src/crypto/hash-extra-jh.c:14:7: warning: unused variable 'r' [-Wunused-variable]
#13 16.94    14 |   int r = jh_hash(HASH_SIZE * 8, data, 8 * length, (uint8_t*)hash);
#13 16.94       |       ^
#13 17.30 [  8%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash-extra-skein.c.o
#13 17.41 [  8%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash.c.o
#13 17.57 [  9%] Building CXX object src/CMakeFiles/Common.dir/Common/IInputStream.cpp.o
#13 17.67 /src/zion-cryptonote/src/crypto/hash-extra-skein.c: In function 'hash_extra_skein':
#13 17.67 /src/zion-cryptonote/src/crypto/hash-extra-skein.c:12:7: warning: unused variable 'r' [-Wunused-variable]
#13 17.67    12 |   int r = skein_hash(8 * HASH_SIZE, data, 8 * length, (uint8_t*)hash);
#13 17.67       |       ^
#13 18.20 [  9%] Building CXX object src/CMakeFiles/BlockchainExplorer.dir/BlockchainExplorer/BlockchainExplorerErrors.cpp.o
#13 18.25 [  9%] Building CXX object src/CMakeFiles/Common.dir/Common/IOutputStream.cpp.o
#13 18.32 [ 10%] Building C object src/CMakeFiles/Crypto.dir/crypto/jh.c.o
#13 18.46 [ 11%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Account.cpp.o
#13 18.55 [ 12%] Building CXX object src/CMakeFiles/Common.dir/Common/JsonValue.cpp.o
#13 19.30 [ 13%] Linking CXX static library libBlockchainExplorer.a
#13 19.33 [ 13%] Building C object src/CMakeFiles/Crypto.dir/crypto/keccak.c.o
#13 19.58 [ 13%] Built target BlockchainExplorer
#13 19.59 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 19.59                  from /src/zion-cryptonote/src/CryptoNoteCore/Account.cpp:6:
#13 19.59 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 19.59 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 19.59    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 19.59       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 19.59 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 19.59    23 |   struct chacha8_key {
#13 19.59       |          ^~~~~~~~~~~
#13 19.65 [ 13%] Building CXX object src/CMakeFiles/Common.dir/Common/Math.cpp.o
#13 20.06 /src/zion-cryptonote/src/Common/Math.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#13 20.06     8 | char suppressMSVCWarningLNK4221;
#13 20.06       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#13 20.06 [ 14%] Building C object src/CMakeFiles/Crypto.dir/crypto/oaes_lib.c.o
#13 20.09 [ 14%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/BlockIndex.cpp.o
#13 20.18 [ 15%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Blockchain.cpp.o
#13 20.28 /src/zion-cryptonote/src/crypto/oaes_lib.c: In function 'oaes_get_seed':
#13 20.28 /src/zion-cryptonote/src/crypto/oaes_lib.c:490:9: warning: 'ftime' is deprecated: Use gettimeofday or clock_gettime instead [-Wdeprecated-declarations]
#13 20.28   490 |         ftime (&timer);
#13 20.28       |         ^~~~~
#13 20.28 In file included from /src/zion-cryptonote/src/crypto/oaes_lib.c:36:
#13 20.28 /usr/include/x86_64-linux-gnu/sys/timeb.h:29:12: note: declared here
#13 20.28    29 | extern int ftime (struct timeb *__timebuf)
#13 20.28       |            ^~~~~
#13 20.33 At top level:
#13 20.33 /src/zion-cryptonote/src/crypto/oaes_lib.c:30:19: warning: '_NR' defined but not used [-Wunused-const-variable=]
#13 20.33    30 | static const char _NR[] = {
#13 20.33       |                   ^~~
#13 21.04 [ 16%] Building CXX object src/CMakeFiles/Common.dir/Common/MemoryInputStream.cpp.o
#13 21.12 [ 16%] Building C object src/CMakeFiles/Crypto.dir/crypto/random.c.o
#13 21.80 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 21.80                  from /src/zion-cryptonote/src/CryptoNoteCore/BlockIndex.cpp:9:
#13 21.80 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 21.80 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 21.80    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 21.80       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 21.80 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 21.80    23 |   struct chacha8_key {
#13 21.80       |          ^~~~~~~~~~~
#13 21.86 [ 16%] Building CXX object src/CMakeFiles/Common.dir/Common/PathTools.cpp.o
#13 21.87 [ 17%] Building C object src/CMakeFiles/Crypto.dir/crypto/skein.c.o
#13 22.79 /src/zion-cryptonote/src/CryptoNoteCore/BlockIndex.cpp: In member function 'std::vector<Crypto::Hash> CryptoNote::BlockIndex::buildSparseChain(const Crypto::Hash&) const':
#13 22.79 /src/zion-cryptonote/src/CryptoNoteCore/BlockIndex.cpp:51:66: warning: 'startBlockHeight' may be used uninitialized in this function [-Wmaybe-uninitialized]
#13 22.79    51 |     size_t sparseChainEnd = static_cast<size_t>(startBlockHeight + 1);
#13 22.79       |                                                 ~~~~~~~~~~~~~~~~~^~~
#13 22.96 [ 17%] Building C object src/CMakeFiles/Crypto.dir/crypto/slow-hash.c.o
#13 23.02 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 23.02                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#13 23.02                  from /src/zion-cryptonote/src/CryptoNoteCore/Blockchain.h:21,
#13 23.02                  from /src/zion-cryptonote/src/CryptoNoteCore/Blockchain.cpp:5:
#13 23.02 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 23.02 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 23.02    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 23.02       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 23.02 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 23.02    23 |   struct chacha8_key {
#13 23.02       |          ^~~~~~~~~~~
#13 23.03 [ 18%] Building CXX object src/CMakeFiles/Common.dir/Common/ScopeExit.cpp.o
#13 23.15 [ 19%] Building CXX object src/CMakeFiles/Crypto.dir/crypto/slow-hash.cpp.o
#13 23.26 In file included from /src/zion-cryptonote/src/crypto/slow-hash.c:183:
#13 23.26 /src/zion-cryptonote/src/crypto/slow-hash.inl: In function 'cn_slow_hash_noaesni':
#13 23.27 /src/zion-cryptonote/src/crypto/slow-hash.inl:16:44: warning: unused variable 'b_x' [-Wunused-variable]
#13 23.27    16 |   __m128i *longoutput, *expkey, *xmminput, b_x;
#13 23.27       |                                            ^~~
#13 23.27 /src/zion-cryptonote/src/crypto/slow-hash.inl:16:12: warning: variable 'longoutput' set but not used [-Wunused-but-set-variable]
#13 23.27    16 |   __m128i *longoutput, *expkey, *xmminput, b_x;
#13 23.27       |            ^~~~~~~~~~
#13 23.61 /src/zion-cryptonote/src/crypto/slow-hash.cpp: In destructor 'Crypto::cn_context::~cn_context()':
#13 23.61 /src/zion-cryptonote/src/crypto/slow-hash.cpp:54:7: warning: 'throw' will always call 'terminate' [-Wterminate]
#13 23.61    54 |       throw bad_alloc();
#13 23.61       |       ^~~~~~~~~~~~~~~~~
#13 23.61 /src/zion-cryptonote/src/crypto/slow-hash.cpp:54:7: note: in C++11 destructors default to 'noexcept'
#13 23.83 [ 19%] Building CXX object src/CMakeFiles/Common.dir/Common/SignalHandler.cpp.o
#13 23.99 [ 20%] Building CXX object src/CMakeFiles/Common.dir/Common/StdInputStream.cpp.o
#13 24.02 [ 21%] Building C object src/CMakeFiles/Crypto.dir/crypto/tree-hash.c.o
#13 25.22 [ 21%] Linking CXX static library libCrypto.a
#13 25.32 [ 21%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/BlockchainIndices.cpp.o
#13 25.35 [ 21%] Building CXX object src/CMakeFiles/Common.dir/Common/StdOutputStream.cpp.o
#13 25.67 [ 21%] Built target Crypto
#13 25.73 [ 22%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/BlockchainMessages.cpp.o
#13 26.64 [ 23%] Building CXX object src/CMakeFiles/Common.dir/Common/StreamTools.cpp.o
#13 27.13 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 27.13                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#13 27.13                  from /src/zion-cryptonote/src/CryptoNoteCore/BlockchainIndices.cpp:8:
#13 27.13 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 27.13 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 27.13    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 27.13       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 27.13 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 27.13    23 |   struct chacha8_key {
#13 27.13       |          ^~~~~~~~~~~
#13 28.89 [ 23%] Building CXX object src/CMakeFiles/Http.dir/HTTP/HttpParser.cpp.o
#13 28.89 [ 23%] Building CXX object src/CMakeFiles/Common.dir/Common/StringInputStream.cpp.o
#13 30.01 [ 24%] Building CXX object src/CMakeFiles/Common.dir/Common/StringOutputStream.cpp.o
#13 30.18 [ 25%] Building CXX object src/CMakeFiles/InProcessNode.dir/InProcessNode/InProcessNode.cpp.o
#13 31.13 [ 26%] Building CXX object src/CMakeFiles/Http.dir/HTTP/HttpParserErrorCodes.cpp.o
#13 31.22 [ 26%] Building CXX object src/CMakeFiles/Common.dir/Common/StringTools.cpp.o
#13 32.25 [ 26%] Building CXX object src/CMakeFiles/Http.dir/HTTP/HttpRequest.cpp.o
#13 33.04 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 33.04                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#13 33.04                  from /src/zion-cryptonote/include/INode.h:15,
#13 33.04                  from /src/zion-cryptonote/src/InProcessNode/InProcessNode.h:7,
#13 33.04                  from /src/zion-cryptonote/src/InProcessNode/InProcessNode.cpp:5:
#13 33.04 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 33.04 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 33.04    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 33.04       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 33.04 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 33.04    23 |   struct chacha8_key {
#13 33.04       |          ^~~~~~~~~~~
#13 33.11 [ 27%] Building CXX object src/CMakeFiles/Common.dir/Common/StringView.cpp.o
#13 34.30 [ 28%] Building CXX object src/CMakeFiles/Http.dir/HTTP/HttpResponse.cpp.o
#13 34.85 [ 29%] Building CXX object src/CMakeFiles/Common.dir/Common/Util.cpp.o
#13 35.88 [ 29%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Checkpoints.cpp.o
#13 36.24 [ 29%] Linking CXX static library libHttp.a
#13 36.60 [ 29%] Built target Http
#13 36.78 [ 29%] Building CXX object src/CMakeFiles/Common.dir/Common/VectorOutputStream.cpp.o
#13 37.88 [ 30%] Linking CXX static library libCommon.a
#13 38.21 [ 30%] Building CXX object src/CMakeFiles/Logging.dir/Logging/CommonLogger.cpp.o
#13 38.60 [ 30%] Built target Common
#13 38.67 [ 30%] Building CXX object src/CMakeFiles/InProcessNode.dir/InProcessNode/InProcessNodeErrors.cpp.o
#13 40.29 [ 31%] Building CXX object src/CMakeFiles/NodeRpcProxy.dir/NodeRpcProxy/NodeErrors.cpp.o
#13 40.31 [ 32%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Core.cpp.o
#13 41.63 [ 32%] Building CXX object src/CMakeFiles/NodeRpcProxy.dir/NodeRpcProxy/NodeRpcProxy.cpp.o
#13 44.31 [ 33%] Linking CXX static library libInProcessNode.a
#13 44.78 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 44.78                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#13 44.78                  from /src/zion-cryptonote/include/INode.h:15,
#13 44.78                  from /src/zion-cryptonote/src/NodeRpcProxy/NodeRpcProxy.h:15,
#13 44.78                  from /src/zion-cryptonote/src/NodeRpcProxy/NodeRpcProxy.cpp:5:
#13 44.78 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 44.78 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 44.78    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 44.78       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 44.78 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 44.78    23 |   struct chacha8_key {
#13 44.78       |          ^~~~~~~~~~~
#13 44.99 [ 33%] Built target InProcessNode
#13 45.07 [ 34%] Building CXX object src/CMakeFiles/Logging.dir/Logging/ConsoleLogger.cpp.o
#13 45.35 [ 34%] Building CXX object src/CMakeFiles/Logging.dir/Logging/FileLogger.cpp.o
#13 46.16 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 46.16                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#13 46.16                  from /src/zion-cryptonote/src/CryptoNoteCore/Blockchain.h:21,
#13 46.16                  from /src/zion-cryptonote/src/CryptoNoteCore/Core.h:14,
#13 46.16                  from /src/zion-cryptonote/src/CryptoNoteCore/Core.cpp:5:
#13 46.16 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 46.16 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 46.16    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 46.16       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 46.16 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 46.16    23 |   struct chacha8_key {
#13 46.16       |          ^~~~~~~~~~~
#13 46.57 /src/zion-cryptonote/src/CryptoNoteCore/Core.cpp: In member function 'virtual std::unique_ptr<CryptoNote::IBlock> CryptoNote::core::getBlock(const Crypto::Hash&)':
#13 46.57 /src/zion-cryptonote/src/CryptoNoteCore/Core.cpp:981:19: warning: redundant move in return statement [-Wredundant-move]
#13 46.57   981 |   return std::move(blockPtr);
#13 46.57       |          ~~~~~~~~~^~~~~~~~~~
#13 46.57 /src/zion-cryptonote/src/CryptoNoteCore/Core.cpp:981:19: note: remove 'std::move' call
#13 50.90 [ 35%] Building CXX object src/CMakeFiles/Logging.dir/Logging/ILogger.cpp.o
#13 51.22 [ 36%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/HttpClient.cpp.o
#13 53.45 [ 36%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/HttpServer.cpp.o
#13 56.23 [ 36%] Building CXX object src/CMakeFiles/Logging.dir/Logging/LoggerGroup.cpp.o
#13 57.03 [ 36%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CoreConfig.cpp.o
#13 57.13 [ 37%] Linking CXX static library libNodeRpcProxy.a
#13 57.70 [ 37%] Built target NodeRpcProxy
#13 58.05 [ 37%] Building CXX object src/CMakeFiles/P2P.dir/CryptoNoteProtocol/CryptoNoteProtocolHandler.cpp.o
#13 59.54 [ 38%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/JsonRpc.cpp.o
#13 60.12 [ 39%] Building CXX object src/CMakeFiles/Logging.dir/Logging/LoggerManager.cpp.o
#13 60.68 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 60.68                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#13 60.68                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolHandler.h:13,
#13 60.68                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolHandler.cpp:5:
#13 60.68 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 60.68 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 60.68    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 60.68       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 60.68 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 60.68    23 |   struct chacha8_key {
#13 60.68       |          ^~~~~~~~~~~
#13 60.73 [ 40%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteBasic.cpp.o
#13 61.15 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 61.15                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#13 61.15                  from /src/zion-cryptonote/src/Rpc/CoreRpcServerCommandsDefinitions.h:7,
#13 61.15                  from /src/zion-cryptonote/src/Rpc/JsonRpc.h:11,
#13 61.15                  from /src/zion-cryptonote/src/Rpc/JsonRpc.cpp:5:
#13 61.15 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 61.15 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 61.15    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 61.15       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 61.15 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 61.15    23 |   struct chacha8_key {
#13 61.15       |          ^~~~~~~~~~~
#13 62.35 [ 40%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteBasicImpl.cpp.o
#13 62.58 [ 40%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/RpcServer.cpp.o
#13 63.81 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 63.81                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#13 63.81                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteBasicImpl.cpp:6:
#13 63.81 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 63.81 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 63.81    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 63.81       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 63.81 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 63.81    23 |   struct chacha8_key {
#13 63.81       |          ^~~~~~~~~~~
#13 63.94 /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteBasicImpl.cpp: In function 'std::string CryptoNote::getAccountAddressAsStr(uint64_t, const CryptoNote::AccountPublicAddress&)':
#13 63.94 /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteBasicImpl.cpp:53:10: warning: unused variable 'r' [-Wunused-variable]
#13 63.94    53 |     bool r = toBinaryArray(adr, ba);
#13 63.94       |          ^
#13 63.96 [ 41%] Building CXX object src/CMakeFiles/Logging.dir/Logging/LoggerMessage.cpp.o
#13 64.65 [ 42%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteFormatUtils.cpp.o
#13 66.23 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 66.23                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#13 66.23                  from /src/zion-cryptonote/src/Rpc/CoreRpcServerCommandsDefinitions.h:7,
#13 66.23                  from /src/zion-cryptonote/src/Rpc/RpcServer.h:11,
#13 66.23                  from /src/zion-cryptonote/src/Rpc/RpcServer.cpp:5:
#13 66.23 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 66.23 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 66.23    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 66.23       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 66.23 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 66.23    23 |   struct chacha8_key {
#13 66.23       |          ^~~~~~~~~~~
#13 66.59 /src/zion-cryptonote/src/Logging/LoggerMessage.cpp: In constructor 'Logging::LoggerMessage::LoggerMessage(Logging::LoggerMessage&&)':
#13 66.59 /src/zion-cryptonote/src/Logging/LoggerMessage.cpp:65:11: warning: unused variable '_Pnext' [-Wunused-variable]
#13 66.59    65 |     char *_Pnext = pptr();
#13 66.59       |           ^~~~~~
#13 66.65 [ 43%] Building CXX object src/CMakeFiles/P2P.dir/P2p/IP2pNodeInternal.cpp.o
#13 67.48 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 67.48                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#13 67.48                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.cpp:5:
#13 67.48 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 67.48 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 67.48    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 67.48       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 67.48 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 67.48    23 |   struct chacha8_key {
#13 67.48       |          ^~~~~~~~~~~
#13 68.99 [ 43%] Building CXX object src/CMakeFiles/Logging.dir/Logging/LoggerRef.cpp.o
#13 69.56 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 69.56                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#13 69.56                  from /src/zion-cryptonote/src/P2p/IP2pNodeInternal.h:8,
#13 69.56                  from /src/zion-cryptonote/src/P2p/IP2pNodeInternal.cpp:5:
#13 69.56 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 69.56 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 69.56    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 69.56       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 69.56 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 69.56    23 |   struct chacha8_key {
#13 69.56       |          ^~~~~~~~~~~
#13 70.34 [ 43%] Building CXX object src/CMakeFiles/P2P.dir/P2p/LevinProtocol.cpp.o
#13 74.10 [ 44%] Building CXX object src/CMakeFiles/P2P.dir/P2p/NetNode.cpp.o
#13 74.58 [ 45%] Building CXX object src/CMakeFiles/Logging.dir/Logging/StreamLogger.cpp.o
#13 74.86 [ 45%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteSerialization.cpp.o
#13 76.37 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 76.37                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.cpp:5:
#13 76.37 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 76.37 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 76.37    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 76.37       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 76.37 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 76.37    23 |   struct chacha8_key {
#13 76.37       |          ^~~~~~~~~~~
#13 78.85 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 78.85                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#13 78.85                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolHandler.h:13,
#13 78.85                  from /src/zion-cryptonote/src/P2p/NetNode.h:21,
#13 78.85                  from /src/zion-cryptonote/src/P2p/NetNode.cpp:5:
#13 78.85 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 78.85 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 78.85    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 78.85       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 78.85 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 78.85    23 |   struct chacha8_key {
#13 78.85       |          ^~~~~~~~~~~
#13 79.52 [ 45%] Linking CXX static library libLogging.a
#13 79.86 [ 45%] Built target Logging
#13 79.91 [ 46%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteTools.cpp.o
#13 80.09 [ 47%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/BinaryInputStreamSerializer.cpp.o
#13 81.38 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 81.38                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#13 81.38                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.cpp:5:
#13 81.38 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 81.38 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 81.38    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 81.38       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 81.38 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 81.38    23 |   struct chacha8_key {
#13 81.38       |          ^~~~~~~~~~~
#13 81.42 [ 47%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/BinaryOutputStreamSerializer.cpp.o
#13 82.39 [ 47%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Currency.cpp.o
#13 82.75 [ 48%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/JsonInputStreamSerializer.cpp.o
#13 83.47 [ 49%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/RpcServerConfig.cpp.o
#13 83.82 [ 50%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/JsonInputValueSerializer.cpp.o
#13 85.23 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 85.23                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#13 85.23                  from /src/zion-cryptonote/src/CryptoNoteCore/Currency.cpp:15:
#13 85.23 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 85.23 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 85.23    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 85.23       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 85.23 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 85.23    23 |   struct chacha8_key {
#13 85.23       |          ^~~~~~~~~~~
#13 85.96 [ 50%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/JsonOutputStreamSerializer.cpp.o
#13 88.10 [ 50%] Building CXX object src/CMakeFiles/P2P.dir/P2p/NetNodeConfig.cpp.o
#13 88.95 [ 51%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/KVBinaryInputStreamSerializer.cpp.o
#13 89.24 [ 51%] Linking CXX static library libRpc.a
#13 89.51 [ 52%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Difficulty.cpp.o
#13 89.63 [ 52%] Built target Rpc
#13 89.69 [ 53%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pConnectionProxy.cpp.o
#13 90.17 [ 53%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/KVBinaryOutputStreamSerializer.cpp.o
#13 90.40 [ 53%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/IBlock.cpp.o
#13 91.80 [ 54%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/ITimeProvider.cpp.o
#13 91.81 [ 55%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/MemoryStream.cpp.o
#13 92.09 [ 55%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Miner.cpp.o
#13 92.31 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 92.31                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#13 92.31                  from /src/zion-cryptonote/src/P2p/IP2pNodeInternal.h:8,
#13 92.31                  from /src/zion-cryptonote/src/P2p/P2pConnectionProxy.h:9,
#13 92.31                  from /src/zion-cryptonote/src/P2p/P2pConnectionProxy.cpp:5:
#13 92.31 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 92.31 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 92.31    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 92.31       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 92.31 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 92.31    23 |   struct chacha8_key {
#13 92.31       |          ^~~~~~~~~~~
#13 92.39 [ 55%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/SerializationOverloads.cpp.o
#13 93.51 [ 55%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pContext.cpp.o
#13 93.73 [ 56%] Linking CXX static library libSerialization.a
#13 94.05 [ 56%] Built target Serialization
#13 94.12 [ 57%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/MinerConfig.cpp.o
#13 94.93 [ 57%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/SwappedMap.cpp.o
#13 95.01 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 95.01                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#13 95.01                  from /src/zion-cryptonote/src/P2p/P2pContext.h:19,
#13 95.01                  from /src/zion-cryptonote/src/P2p/P2pContext.cpp:5:
#13 95.01 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 95.01 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 95.01    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 95.01       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 95.01 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 95.01    23 |   struct chacha8_key {
#13 95.01       |          ^~~~~~~~~~~
#13 95.32 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 95.32                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#13 95.32                  from /src/zion-cryptonote/src/CryptoNoteCore/Miner.cpp:24:
#13 95.32 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 95.32 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 95.32    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 95.32       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 95.32 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 95.32    23 |   struct chacha8_key {
#13 95.32       |          ^~~~~~~~~~~
#13 96.06 [ 58%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pContextOwner.cpp.o
#13 96.36 /src/zion-cryptonote/src/CryptoNoteCore/SwappedMap.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#13 96.36     8 | char suppressMSVCWarningLNK4221;
#13 96.36       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#13 96.70 [ 58%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pInterfaces.cpp.o
#13 97.86 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 97.86                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#13 97.86                  from /src/zion-cryptonote/src/P2p/P2pContext.h:19,
#13 97.86                  from /src/zion-cryptonote/src/P2p/P2pContextOwner.cpp:7:
#13 97.86 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 97.86 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 97.86    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 97.86       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 97.86 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 97.86    23 |   struct chacha8_key {
#13 97.86       |          ^~~~~~~~~~~
#13 98.50 [ 59%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/SwappedVector.cpp.o
#13 98.52 [ 60%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pNode.cpp.o
#13 98.98 [ 61%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/Dispatcher.cpp.o
#13 99.67 /src/zion-cryptonote/src/CryptoNoteCore/SwappedVector.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#13 99.67     8 | char suppressMSVCWarningLNK4221;
#13 99.67       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#13 99.80 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp: In constructor 'System::Dispatcher::Dispatcher()':
#13 99.80 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp:92:14: warning: unused variable 'result' [-Wunused-variable]
#13 99.80    92 |         auto result = close(remoteSpawnEvent);
#13 99.80       |              ^~~~~~
#13 99.80 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp:97:10: warning: unused variable 'result' [-Wunused-variable]
#13 99.80    97 |     auto result = close(epoll);
#13 99.80       |          ^~~~~~
#13 99.80 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp: In destructor 'System::Dispatcher::~Dispatcher()':
#13 99.80 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp:123:9: warning: unused variable 'result' [-Wunused-variable]
#13 99.80   123 |     int result = ::close(timers.top());
#13 99.80       |         ^~~~~~
#13 99.80 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp:128:8: warning: variable 'result' set but not used [-Wunused-but-set-variable]
#13 99.80   128 |   auto result = close(epoll);
#13 99.80       |        ^~~~~~
#13 100.0 [ 61%] Building CXX object src/CMakeFiles/Transfers.dir/Transfers/BlockchainSynchronizer.cpp.o
#13 100.1 [ 61%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Transaction.cpp.o
#13 101.0 [ 61%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/ErrorMessage.cpp.o
#13 101.4 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 101.4                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#13 101.4                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionApiExtra.h:7,
#13 101.4                  from /src/zion-cryptonote/src/CryptoNoteCore/Transaction.cpp:6:
#13 101.4 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 101.4 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 101.4    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 101.4       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 101.4 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 101.4    23 |   struct chacha8_key {
#13 101.4       |          ^~~~~~~~~~~
#13 101.6 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 101.6                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#13 101.6                  from /src/zion-cryptonote/include/INode.h:15,
#13 101.6                  from /src/zion-cryptonote/src/Transfers/BlockchainSynchronizer.h:7,
#13 101.6                  from /src/zion-cryptonote/src/Transfers/BlockchainSynchronizer.cpp:5:
#13 101.6 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 101.6 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 101.6    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 101.6       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 101.6 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 101.6    23 |   struct chacha8_key {
#13 101.6       |          ^~~~~~~~~~~
#13 101.8 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 101.8                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#13 101.8                  from /src/zion-cryptonote/src/P2p/IP2pNodeInternal.h:8,
#13 101.8                  from /src/zion-cryptonote/src/P2p/P2pNode.h:17,
#13 101.8                  from /src/zion-cryptonote/src/P2p/P2pNode.cpp:5:
#13 101.8 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 101.8 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 101.8    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 101.8       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 101.8 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 101.8    23 |   struct chacha8_key {
#13 101.8       |          ^~~~~~~~~~~
#13 102.2 [ 62%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/Ipv4Resolver.cpp.o
#13 105.6 [ 62%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/TcpConnection.cpp.o
#13 106.8 [ 63%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/TransactionExtra.cpp.o
#13 107.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp: In destructor 'System::TcpConnection::~TcpConnection()':
#13 107.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:37:9: warning: unused variable 'result' [-Wunused-variable]
#13 107.0    37 |     int result = close(connection);
#13 107.0       |         ^~~~~~
#13 107.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp: In member function 'size_t System::TcpConnection::read(uint8_t*, size_t)':
#13 107.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:73:26: warning: logical 'and' of equal expressions [-Wlogical-op]
#13 107.0    73 |     if (errno != EAGAIN  && errno != EWOULDBLOCK) {
#13 107.0       |                          ^
#13 107.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp: In member function 'std::size_t System::TcpConnection::write(const uint8_t*, size_t)':
#13 107.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:169:26: warning: logical 'and' of equal expressions [-Wlogical-op]
#13 107.0   169 |     if (errno != EAGAIN  && errno != EWOULDBLOCK) {
#13 107.0       |                          ^
#13 107.3 [ 63%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pNodeConfig.cpp.o
#13 107.5 [ 64%] Building CXX object src/CMakeFiles/Transfers.dir/Transfers/SynchronizationState.cpp.o
#13 107.8 [ 65%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/TcpConnector.cpp.o
#13 108.8 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 108.8                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#13 108.8                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionExtra.cpp:10:
#13 108.8 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 108.8 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 108.8    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 108.8       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 108.8 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 108.8    23 |   struct chacha8_key {
#13 108.8       |          ^~~~~~~~~~~
#13 109.1 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnector.cpp: In member function 'System::TcpConnection System::TcpConnector::connect(const System::Ipv4Address&, uint16_t)':
#13 109.1 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnector.cpp:133:23: warning: unused variable 'result' [-Wunused-variable]
#13 109.1   133 |                   int result = close(connection);
#13 109.1       |                       ^~~~~~
#13 109.1 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnector.cpp:160:9: warning: unused variable 'result' [-Wunused-variable]
#13 109.1   160 |     int result = close(connection);
#13 109.1       |         ^~~~~~
#13 109.3 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 109.3                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#13 109.3                  from /src/zion-cryptonote/include/INode.h:15,
#13 109.3                  from /src/zion-cryptonote/src/Transfers/CommonTypes.h:13,
#13 109.3                  from /src/zion-cryptonote/src/Transfers/SynchronizationState.h:7,
#13 109.3                  from /src/zion-cryptonote/src/Transfers/SynchronizationState.cpp:5:
#13 109.3 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 109.3 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 109.3    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 109.3       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 109.3 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 109.3    23 |   struct chacha8_key {
#13 109.3       |          ^~~~~~~~~~~
#13 109.5 /src/zion-cryptonote/src/Transfers/SynchronizationState.cpp: In member function 'void CryptoNote::SynchronizationState::addBlocks(const Crypto::Hash*, uint32_t, uint32_t)':
#13 109.5 /src/zion-cryptonote/src/Transfers/SynchronizationState.cpp:84:8: warning: unused variable 'size' [-Wunused-variable]
#13 109.5    84 |   auto size = m_blockchain.size();
#13 109.5       |        ^~~~
#13 110.1 [ 65%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/TcpListener.cpp.o
#13 110.6 [ 66%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/TransactionPool.cpp.o
#13 110.8 [ 66%] Building CXX object src/CMakeFiles/Transfers.dir/Transfers/TransfersConsumer.cpp.o
#13 110.8 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp: In constructor 'System::TcpListener::TcpListener(System::Dispatcher&, const System::Ipv4Address&, uint16_t)':
#13 110.8 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp:63:9: warning: unused variable 'result' [-Wunused-variable]
#13 110.8    63 |     int result = close(listener);
#13 110.8       |         ^~~~~~
#13 110.8 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp: In destructor 'System::TcpListener::~TcpListener()':
#13 110.8 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp:82:9: warning: unused variable 'result' [-Wunused-variable]
#13 110.8    82 |     int result = close(listener);
#13 110.8       |         ^~~~~~
#13 110.8 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp: In member function 'System::TcpConnection System::TcpListener::accept()':
#13 110.8 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp:176:11: warning: unused variable 'result' [-Wunused-variable]
#13 110.8   176 |       int result = close(connection);
#13 110.8       |           ^~~~~~
#13 111.0 [ 67%] Building CXX object src/CMakeFiles/P2P.dir/P2p/PeerListManager.cpp.o
#13 111.6 [ 68%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/Timer.cpp.o
#13 112.2 /src/zion-cryptonote/src/Platform/Linux/System/Timer.cpp: In lambda function:
#13 112.2 /src/zion-cryptonote/src/Platform/Linux/System/Timer.cpp:92:32: warning: logical 'or' of equal expressions [-Wlogical-op]
#13 112.2    92 |             if(errno == EAGAIN || errno == EWOULDBLOCK) {
#13 112.2       |                                ^
#13 113.0 [ 68%] Building CXX object src/CMakeFiles/System.dir/System/ContextGroup.cpp.o
#13 113.3 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 113.3                  from /src/zion-cryptonote/src/Transfers/TransfersContainer.h:19,
#13 113.3                  from /src/zion-cryptonote/src/Transfers/TransfersSubscription.h:8,
#13 113.3                  from /src/zion-cryptonote/src/Transfers/TransfersConsumer.h:9,
#13 113.3                  from /src/zion-cryptonote/src/Transfers/TransfersConsumer.cpp:5:
#13 113.3 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 113.3 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 113.3    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 113.3       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 113.3 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 113.3    23 |   struct chacha8_key {
#13 113.3       |          ^~~~~~~~~~~
#13 114.0 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 114.0                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#13 114.0                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionPool.cpp:21:
#13 114.0 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 114.0 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 114.0    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 114.0       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 114.0 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 114.0    23 |   struct chacha8_key {
#13 114.0       |          ^~~~~~~~~~~
#13 114.3 [ 69%] Linking CXX static library libP2P.a
#13 114.5 [ 70%] Building CXX object src/CMakeFiles/System.dir/System/ContextGroupTimeout.cpp.o
#13 115.1 [ 70%] Built target P2P
#13 115.4 [ 71%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/LegacyKeysImporter.cpp.o
#13 115.9 [ 71%] Building CXX object src/CMakeFiles/System.dir/System/Event.cpp.o
#13 117.4 [ 72%] Building CXX object src/CMakeFiles/System.dir/System/EventLock.cpp.o
#13 118.2 [ 72%] Building CXX object src/CMakeFiles/System.dir/System/InterruptedException.cpp.o
#13 118.7 /src/zion-cryptonote/src/System/InterruptedException.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#13 118.7     8 | char suppressMSVCWarningLNK4221;
#13 118.7       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#13 119.0 [ 73%] Building CXX object src/CMakeFiles/System.dir/System/Ipv4Address.cpp.o
#13 119.6 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 119.6                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#13 119.6                  from /src/zion-cryptonote/src/Wallet/LegacyKeysImporter.cpp:14:
#13 119.6 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 119.6 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 119.6    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 119.6       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 119.6 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 119.6    23 |   struct chacha8_key {
#13 119.6       |          ^~~~~~~~~~~
#13 120.1 /src/zion-cryptonote/src/System/Ipv4Address.cpp: In member function 'bool System::Ipv4Address::isPrivate() const':
#13 120.1 /src/zion-cryptonote/src/System/Ipv4Address.cpp:107:26: warning: comparison of integer expressions of different signedness: 'unsigned int' and 'int' [-Wsign-compare]
#13 120.1   107 |     (value & 0xfff00000) == ((172 << 24) | (16 << 16)) ||
#13 120.1       |     ~~~~~~~~~~~~~~~~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 120.1 /src/zion-cryptonote/src/System/Ipv4Address.cpp:109:26: warning: comparison of integer expressions of different signedness: 'unsigned int' and 'int' [-Wsign-compare]
#13 120.1   109 |     (value & 0xffff0000) == ((192 << 24) | (168 << 16));
#13 120.1       |     ~~~~~~~~~~~~~~~~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 121.0 [ 73%] Building CXX object src/CMakeFiles/System.dir/System/RemoteEventLock.cpp.o
#13 121.5 [ 74%] Building CXX object src/CMakeFiles/Transfers.dir/Transfers/TransfersContainer.cpp.o
#13 121.6 [ 74%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/WalletAsyncContextCounter.cpp.o
#13 122.2 [ 74%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/TransactionPrefixImpl.cpp.o
#13 122.4 [ 75%] Building CXX object src/CMakeFiles/System.dir/System/TcpStream.cpp.o
#13 122.7 [ 76%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/WalletErrors.cpp.o
#13 123.4 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 123.4                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#13 123.4                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionApiExtra.h:7,
#13 123.4                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionPrefixImpl.cpp:12:
#13 123.4 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 123.4 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 123.4    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 123.4       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 123.4 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 123.4    23 |   struct chacha8_key {
#13 123.4       |          ^~~~~~~~~~~
#13 123.7 [ 77%] Linking CXX static library libSystem.a
#13 123.7 [ 77%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/WalletGreen.cpp.o
#13 124.0 [ 77%] Built target System
#13 124.1 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 124.1                  from /src/zion-cryptonote/src/Transfers/TransfersContainer.h:19,
#13 124.1                  from /src/zion-cryptonote/src/Transfers/TransfersContainer.cpp:5:
#13 124.1 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 124.1 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 124.1    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 124.1       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 124.1 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 124.1    23 |   struct chacha8_key {
#13 124.1       |          ^~~~~~~~~~~
#13 124.1 [ 77%] Building CXX object src/CMakeFiles/Transfers.dir/Transfers/TransfersSubscription.cpp.o
#13 125.3 [ 78%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/TransactionUtils.cpp.o
#13 126.8 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 126.8                  from /src/zion-cryptonote/src/Transfers/TransfersContainer.h:19,
#13 126.8                  from /src/zion-cryptonote/src/Transfers/TransfersSubscription.h:8,
#13 126.8                  from /src/zion-cryptonote/src/Transfers/TransfersSubscription.cpp:5:
#13 126.8 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 126.8 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 126.8    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 126.8       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 126.8 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 126.8    23 |   struct chacha8_key {
#13 126.8       |          ^~~~~~~~~~~
#13 126.9 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 126.9                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#13 126.9                  from /src/zion-cryptonote/include/INode.h:15,
#13 126.9                  from /src/zion-cryptonote/src/Transfers/BlockchainSynchronizer.h:7,
#13 126.9                  from /src/zion-cryptonote/src/Wallet/WalletGreen.h:18,
#13 126.9                  from /src/zion-cryptonote/src/Wallet/WalletGreen.cpp:5:
#13 126.9 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 126.9 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 126.9    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 126.9       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 126.9 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 126.9    23 |   struct chacha8_key {
#13 126.9       |          ^~~~~~~~~~~
#13 126.9 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 126.9                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#13 126.9                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionUtils.cpp:11:
#13 126.9 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 126.9 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 126.9    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 126.9       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 126.9 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 126.9    23 |   struct chacha8_key {
#13 126.9       |          ^~~~~~~~~~~
#13 130.4 [ 78%] Linking CXX static library libCryptoNoteCore.a
#13 130.6 /src/zion-cryptonote/src/Wallet/WalletGreen.cpp: In member function 'bool CryptoNote::WalletGreen::updateWalletTransactionInfo(size_t, const CryptoNote::TransactionInformation&, int64_t)':
#13 130.6 /src/zion-cryptonote/src/Wallet/WalletGreen.cpp:971:8: warning: unused variable 'r' [-Wunused-variable]
#13 130.6   971 |   bool r = txIdIndex.modify(it, [&info, totalAmount, &updated](WalletTransaction& transaction) {
#13 130.6       |        ^
#13 131.1 /src/zion-cryptonote/src/Wallet/WalletGreen.cpp: In member function 'virtual void CryptoNote::WalletGreen::onTransactionUpdated(const Crypto::PublicKey&, const Crypto::Hash&, const std::vector<CryptoNote::ITransfersContainer*>&)':
#13 131.1 /src/zion-cryptonote/src/Wallet/WalletGreen.cpp:1800:10: warning: unused variable 'found' [-Wunused-variable]
#13 131.1  1800 |     bool found = container->getTransactionInformation(transactionHash, info, &inputsAmount, &outputsAmount);
#13 131.1       |          ^~~~~
#13 131.2 [ 78%] Built target CryptoNoteCore
#13 131.3 /src/zion-cryptonote/src/Wallet/WalletGreen.cpp: In member function 'virtual size_t CryptoNote::WalletGreen::createFusionTransaction(uint64_t, uint64_t)':
#13 131.3 /src/zion-cryptonote/src/Wallet/WalletGreen.cpp:2092:12: warning: variable 'transactionAmount' set but not used [-Wunused-but-set-variable]
#13 131.3  2092 |   uint64_t transactionAmount;
#13 131.3       |            ^~~~~~~~~~~~~~~~~
#13 131.7 [ 78%] Building CXX object src/CMakeFiles/PaymentGate.dir/PaymentGate/NodeFactory.cpp.o
#13 132.5 [ 78%] Building CXX object src/CMakeFiles/JsonRpcServer.dir/JsonRpcServer/JsonRpcServer.cpp.o
#13 133.7 [ 79%] Building CXX object src/CMakeFiles/Transfers.dir/Transfers/TransfersSynchronizer.cpp.o
#13 133.9 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 133.9                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#13 133.9                  from /src/zion-cryptonote/include/INode.h:15,
#13 133.9                  from /src/zion-cryptonote/src/PaymentGate/NodeFactory.h:7,
#13 133.9                  from /src/zion-cryptonote/src/PaymentGate/NodeFactory.cpp:5:
#13 133.9 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 133.9 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 133.9    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 133.9       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 133.9 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 133.9    23 |   struct chacha8_key {
#13 133.9       |          ^~~~~~~~~~~
#13 137.2 [ 80%] Building CXX object src/CMakeFiles/PaymentGate.dir/PaymentGate/PaymentServiceJsonRpcMessages.cpp.o
#13 138.8 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 138.8                  from /src/zion-cryptonote/src/Transfers/TransfersContainer.h:19,
#13 138.8                  from /src/zion-cryptonote/src/Transfers/TransfersSubscription.h:8,
#13 138.8                  from /src/zion-cryptonote/src/Transfers/TransfersConsumer.h:9,
#13 138.8                  from /src/zion-cryptonote/src/Transfers/TransfersSynchronizer.cpp:6:
#13 138.8 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 138.8 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 138.8    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 138.8       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 138.8 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 138.8    23 |   struct chacha8_key {
#13 138.8       |          ^~~~~~~~~~~
#13 139.0 [ 81%] Linking CXX static library libJsonRpcServer.a
#13 139.4 [ 81%] Built target JsonRpcServer
#13 139.6 [ 81%] Building CXX object src/CMakeFiles/ConnectivityTool.dir/ConnectivityTool/ConnectivityTool.cpp.o
#13 140.2 [ 81%] Building CXX object src/CMakeFiles/PaymentGate.dir/PaymentGate/PaymentServiceJsonRpcServer.cpp.o
#13 143.7 [ 81%] Linking CXX static library libTransfers.a
#13 143.7 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 143.7                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#13 143.7                  from /src/zion-cryptonote/src/ConnectivityTool/ConnectivityTool.cpp:22:
#13 143.7 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 143.7 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 143.7    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 143.7       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 143.7 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 143.7    23 |   struct chacha8_key {
#13 143.7       |          ^~~~~~~~~~~
#13 143.8 /src/zion-cryptonote/src/ConnectivityTool/ConnectivityTool.cpp: At global scope:
#13 143.8 /src/zion-cryptonote/src/ConnectivityTool/ConnectivityTool.cpp:46:173: warning: narrowing conversion of '(const char*)""' from 'const char*' to 'bool' [-Wnarrowing]
#13 143.8    46 |   const command_line::arg_descriptor<bool>        arg_get_daemon_info    = {"rpc_get_daemon_info", "request daemon state info vie rpc (--rpc_port option should be set ).", "", true};
#13 143.8       |                                                                                                                                                                             ^~
#13 144.1 [ 81%] Built target Transfers
#13 144.3 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 144.3                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#13 144.3                  from /src/zion-cryptonote/include/INode.h:15,
#13 144.3                  from /src/zion-cryptonote/src/PaymentGate/WalletService.h:11,
#13 144.3                  from /src/zion-cryptonote/src/PaymentGate/PaymentServiceJsonRpcServer.cpp:10:
#13 144.3 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 144.3 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 144.3    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 144.3       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 144.3 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 144.3    23 |   struct chacha8_key {
#13 144.3       |          ^~~~~~~~~~~
#13 144.4 [ 82%] Building CXX object src/CMakeFiles/Daemon.dir/Daemon/Daemon.cpp.o
#13 152.0 [ 83%] Linking CXX executable zion_connectivity_tool
#13 152.6 [ 83%] Built target ConnectivityTool
#13 152.8 [ 84%] Building CXX object src/CMakeFiles/PaymentGate.dir/PaymentGate/WalletFactory.cpp.o
#13 153.0 [ 85%] Building CXX object src/CMakeFiles/Miner.dir/Miner/BlockchainMonitor.cpp.o
#13 153.4 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 153.4                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#13 153.4                  from /src/zion-cryptonote/src/CryptoNoteCore/Blockchain.h:21,
#13 153.4                  from /src/zion-cryptonote/src/CryptoNoteCore/Core.h:14,
#13 153.4                  from /src/zion-cryptonote/src/Daemon/Daemon.cpp:15:
#13 153.4 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 153.4 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 153.4    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 153.4       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 153.4 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 153.4    23 |   struct chacha8_key {
#13 153.4       |          ^~~~~~~~~~~
#13 156.4 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 156.4                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#13 156.4                  from /src/zion-cryptonote/include/INode.h:15,
#13 156.4                  from /src/zion-cryptonote/src/PaymentGate/WalletFactory.h:8,
#13 156.4                  from /src/zion-cryptonote/src/PaymentGate/WalletFactory.cpp:5:
#13 156.4 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 156.4 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 156.4    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 156.4       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 156.4 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 156.4    23 |   struct chacha8_key {
#13 156.4       |          ^~~~~~~~~~~
#13 157.5 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 157.5                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#13 157.5                  from /src/zion-cryptonote/src/Rpc/CoreRpcServerCommandsDefinitions.h:7,
#13 157.5                  from /src/zion-cryptonote/src/Miner/BlockchainMonitor.cpp:13:
#13 157.5 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 157.5 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 157.5    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 157.5       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 157.5 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 157.5    23 |   struct chacha8_key {
#13 157.5       |          ^~~~~~~~~~~
#13 187.9 [ 85%] Building CXX object src/CMakeFiles/PaymentGate.dir/PaymentGate/WalletService.cpp.o
#13 191.9 [ 85%] Building CXX object src/CMakeFiles/Miner.dir/Miner/Miner.cpp.o
#13 195.7 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 195.7                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#13 195.7                  from /src/zion-cryptonote/include/INode.h:15,
#13 195.7                  from /src/zion-cryptonote/src/PaymentGate/WalletService.h:11,
#13 195.7                  from /src/zion-cryptonote/src/PaymentGate/WalletService.cpp:5:
#13 195.7 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 195.7 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 195.7    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 195.7       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 195.7 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 195.7    23 |   struct chacha8_key {
#13 195.7       |          ^~~~~~~~~~~
#13 196.0 [ 85%] Building CXX object src/CMakeFiles/Daemon.dir/Daemon/DaemonCommandsHandler.cpp.o
#13 196.3 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 196.3                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#13 196.3                  from /src/zion-cryptonote/src/Miner/Miner.cpp:10:
#13 196.3 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 196.3 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 196.3    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 196.3       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 196.3 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 196.3    23 |   struct chacha8_key {
#13 196.3       |          ^~~~~~~~~~~
#13 198.1 /src/zion-cryptonote/src/PaymentGate/WalletService.cpp: In function 'Crypto::Hash PaymentService::{anonymous}::parsePaymentId(const string&)':
#13 198.1 /src/zion-cryptonote/src/PaymentGate/WalletService.cpp:68:8: warning: unused variable 'r' [-Wunused-variable]
#13 198.1    68 |   bool r = Common::podFromHex(paymentIdStr, paymentId);
#13 198.1       |        ^
#13 200.7 [ 86%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/WalletRpcServer.cpp.o
#13 201.9 [ 87%] Building CXX object src/CMakeFiles/Miner.dir/Miner/MinerManager.cpp.o
#13 202.3 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 202.3                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#13 202.3                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolHandler.h:13,
#13 202.3                  from /src/zion-cryptonote/src/P2p/NetNode.h:21,
#13 202.3                  from /src/zion-cryptonote/src/Daemon/DaemonCommandsHandler.cpp:7:
#13 202.3 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 202.3 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 202.3    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 202.3       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 202.3 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 202.3    23 |   struct chacha8_key {
#13 202.3       |          ^~~~~~~~~~~
#13 205.4 [ 88%] Building CXX object src/CMakeFiles/PaymentGate.dir/PaymentGate/WalletServiceErrorCategory.cpp.o
#13 205.5 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 205.5                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#13 205.5                  from /src/zion-cryptonote/src/Wallet/WalletRpcServerCommandsDefinitions.h:6,
#13 205.5                  from /src/zion-cryptonote/src/Wallet/WalletRpcServer.h:10,
#13 205.5                  from /src/zion-cryptonote/src/Wallet/WalletRpcServer.cpp:5:
#13 205.5 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 205.5 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 205.5    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 205.5       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 205.5 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 205.5    23 |   struct chacha8_key {
#13 205.5       |          ^~~~~~~~~~~
#13 206.4 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 206.4                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#13 206.4                  from /src/zion-cryptonote/src/Miner/MinerManager.cpp:13:
#13 206.4 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 206.4 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 206.4    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 206.4       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 206.4 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 206.4    23 |   struct chacha8_key {
#13 206.4       |          ^~~~~~~~~~~
#13 207.8 [ 88%] Linking CXX static library libPaymentGate.a
#13 209.3 [ 88%] Built target PaymentGate
#13 209.5 [ 88%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/WalletSerialization.cpp.o
#13 212.5 [ 88%] Building CXX object src/CMakeFiles/Miner.dir/Miner/MiningConfig.cpp.o
#13 212.6 [ 89%] Linking CXX executable ziond
#13 213.5 /usr/bin/ld: libP2P.a(NetNode.cpp.o): in function `CryptoNote::NodeServer::init(CryptoNote::NetNodeConfig const&)':
#13 213.5 NetNode.cpp:(.text+0x5361): undefined reference to `upnpDiscover'
#13 213.5 /usr/bin/ld: NetNode.cpp:(.text+0x5387): undefined reference to `UPNP_GetValidIGD'
#13 213.5 /usr/bin/ld: NetNode.cpp:(.text+0x5395): undefined reference to `freeUPNPDevlist'
#13 213.5 /usr/bin/ld: NetNode.cpp:(.text+0x5409): undefined reference to `FreeUPNPUrls'
#13 213.5 /usr/bin/ld: NetNode.cpp:(.text+0x57ae): undefined reference to `UPNP_AddPortMapping'
#13 213.5 collect2: error: ld returned 1 exit status
#13 213.5 gmake[2]: *** [src/CMakeFiles/Daemon.dir/build.make:130: src/ziond] Error 1
#13 213.5 gmake[1]: *** [CMakeFiles/Makefile2:645: src/CMakeFiles/Daemon.dir/all] Error 2
#13 213.6 gmake[1]: *** Waiting for unfinished jobs....
#13 213.6 [ 90%] Building CXX object src/CMakeFiles/Miner.dir/Miner/main.cpp.o
#13 214.0 In file included from /src/zion-cryptonote/src/Wallet/WalletSerialization.h:14,
#13 214.0                  from /src/zion-cryptonote/src/Wallet/WalletSerialization.cpp:5:
#13 214.0 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 214.0 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 214.0    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 214.0       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 214.0 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 214.0    23 |   struct chacha8_key {
#13 214.0       |          ^~~~~~~~~~~
#13 214.3 /src/zion-cryptonote/src/Wallet/WalletSerialization.cpp: In member function 'void CryptoNote::WalletSerializer::subscribeWallets()':
#13 214.3 /src/zion-cryptonote/src/Wallet/WalletSerialization.cpp:712:10: warning: unused variable 'r' [-Wunused-variable]
#13 214.3   712 |     bool r = index.modify(it, [&subscription] (WalletRecord& rec) { rec.container = &subscription.getContainer(); });
#13 214.3       |          ^
#13 214.3 /src/zion-cryptonote/src/Wallet/WalletSerialization.cpp: In member function 'void CryptoNote::WalletSerializer::loadUnlockTransactionsJobs(Common::IInputStream&, CryptoNote::CryptoContext&)':
#13 214.3 /src/zion-cryptonote/src/Wallet/WalletSerialization.cpp:753:18: warning: unused variable 'walletsSize' [-Wunused-variable]
#13 214.3   753 |   const uint64_t walletsSize = walletsIndex.size();
#13 214.3       |                  ^~~~~~~~~~~
#13 216.5 [ 91%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/WalletUtils.cpp.o
#13 220.4 [ 91%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/KeysStorage.cpp.o
#13 220.5 /src/zion-cryptonote/src/Wallet/WalletSerialization.cpp: In member function 'void CryptoNote::WalletSerializer::loadWallets(Common::IInputStream&, CryptoNote::CryptoContext&)':
#13 220.5 /src/zion-cryptonote/src/Wallet/WalletSerialization.cpp:667:74: warning: 'isTrackingMode' may be used uninitialized in this function [-Wmaybe-uninitialized]
#13 220.5   667 |     } else if ((isTrackingMode && dto.spendSecretKey != NULL_SECRET_KEY) || (!isTrackingMode && dto.spendSecretKey == NULL_SECRET_KEY)) {
#13 220.5       |                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 221.8 [ 92%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/WalletHelper.cpp.o
#13 223.2 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 223.2                  from /src/zion-cryptonote/src/WalletLegacy/KeysStorage.cpp:10:
#13 223.2 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 223.2 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 223.2    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 223.2       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 223.2 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 223.2    23 |   struct chacha8_key {
#13 223.2       |          ^~~~~~~~~~~
#13 223.5 [ 92%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/WalletLegacy.cpp.o
#13 223.7 [ 92%] Linking CXX executable zion_miner
#13 223.8 [ 93%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/WalletLegacySerialization.cpp.o
#13 224.3 [ 93%] Built target Miner
#13 224.4 [ 93%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/WalletLegacySerializer.cpp.o
#13 225.7 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 225.7                  from /src/zion-cryptonote/src/WalletLegacy/WalletLegacySerialization.cpp:9:
#13 225.7 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 225.7 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 225.7    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 225.7       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 225.7 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 225.7    23 |   struct chacha8_key {
#13 225.7       |          ^~~~~~~~~~~
#13 225.7 In file included from /src/zion-cryptonote/src/WalletLegacy/WalletLegacySerializer.h:12,
#13 225.7                  from /src/zion-cryptonote/src/WalletLegacy/WalletLegacySerializer.cpp:5:
#13 225.7 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 225.7 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 225.7    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 225.7       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 225.7 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 225.7    23 |   struct chacha8_key {
#13 225.7       |          ^~~~~~~~~~~
#13 226.0 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 226.0                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#13 226.0                  from /src/zion-cryptonote/include/INode.h:15,
#13 226.0                  from /src/zion-cryptonote/src/WalletLegacy/WalletLegacy.h:14,
#13 226.0                  from /src/zion-cryptonote/src/WalletLegacy/WalletLegacy.cpp:5:
#13 226.0 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 226.0 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 226.0    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 226.0       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 226.0 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 226.0    23 |   struct chacha8_key {
#13 226.0       |          ^~~~~~~~~~~
#13 226.3 [ 94%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/WalletTransactionSender.cpp.o
#13 226.4 [ 94%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/WalletUnconfirmedTransactions.cpp.o
#13 227.5 [ 95%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/WalletUserTransactionsCache.cpp.o
#13 228.5 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 228.5                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#13 228.5                  from /src/zion-cryptonote/src/WalletLegacy/WalletUnconfirmedTransactions.cpp:8:
#13 228.5 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 228.5 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 228.5    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 228.5       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 228.5 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 228.5    23 |   struct chacha8_key {
#13 228.5       |          ^~~~~~~~~~~
#13 228.8 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#13 228.8                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#13 228.8                  from /src/zion-cryptonote/src/WalletLegacy/WalletTransactionSender.cpp:7:
#13 228.8 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#13 228.8 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#13 228.8    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#13 228.8       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#13 228.8 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#13 228.8    23 |   struct chacha8_key {
#13 228.8       |          ^~~~~~~~~~~
#13 234.4 [ 96%] Linking CXX static library libWallet.a
#13 234.9 [ 96%] Built target Wallet
#13 234.9 gmake: *** [Makefile:101: all] Error 2
#13 ERROR: process "/bin/sh -c cmake -S . -B build -DCMAKE_BUILD_TYPE=Release     && cmake --build build -j \"$(nproc)\"" did not complete successfully: exit code: 2
------
 > [build 6/6] RUN cmake -S . -B build -DCMAKE_BUILD_TYPE=Release     && cmake --build build -j "$(nproc)":
228.8 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
228.8 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
228.8    48 |     memcpy(&key, &pwd_hash, sizeof(key));
228.8       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
228.8 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
228.8    23 |   struct chacha8_key {
228.8       |          ^~~~~~~~~~~
234.4 [ 96%] Linking CXX static library libWallet.a
234.9 [ 96%] Built target Wallet
234.9 gmake: *** [Makefile:101: all] Error 2
------

 [33m2 warnings found (use docker --debug to expand):
[0m - FromPlatformFlagConstDisallowed: FROM --platform flag should not use constant value "linux/amd64" (line 3)
 - FromPlatformFlagConstDisallowed: FROM --platform flag should not use constant value "linux/amd64" (line 20)
Dockerfile.zion-cryptonote:17
--------------------
  16 |     WORKDIR /src/zion-cryptonote
  17 | >>> RUN cmake -S . -B build -DCMAKE_BUILD_TYPE=Release \
  18 | >>>     && cmake --build build -j "$(nproc)"
  19 |     
--------------------
ERROR: failed to build: failed to solve: process "/bin/sh -c cmake -S . -B build -DCMAKE_BUILD_TYPE=Release     && cmake --build build -j \"$(nproc)\"" did not complete successfully: exit code: 2
\n### Rebuild after miniupnpc link fix pá 19. září 2025 10:33:02 UTC
#0 building with "desktop-linux" instance using docker driver

#1 [internal] load build definition from Dockerfile.zion-cryptonote
#1 transferring dockerfile: 1.43kB 0.0s done
#1 DONE 0.0s

#2 resolve image config for docker-image://docker.io/docker/dockerfile:1
#2 ...

#3 [auth] docker/dockerfile:pull token for registry-1.docker.io
#3 DONE 0.0s

#2 resolve image config for docker-image://docker.io/docker/dockerfile:1
#2 DONE 1.3s

#4 docker-image://docker.io/docker/dockerfile:1@sha256:dabfc0969b935b2080555ace70ee69a5261af8a8f1b4df97b9e7fbcf6722eddf
#4 resolve docker.io/docker/dockerfile:1@sha256:dabfc0969b935b2080555ace70ee69a5261af8a8f1b4df97b9e7fbcf6722eddf 0.0s done
#4 CACHED

#5 [auth] library/ubuntu:pull token for registry-1.docker.io
#5 DONE 0.0s

#6 [internal] load metadata for docker.io/library/ubuntu:22.04
#6 DONE 0.7s

#7 [internal] load .dockerignore
#7 transferring context: 333B done
#7 DONE 0.0s

#8 [build 1/6] FROM docker.io/library/ubuntu:22.04@sha256:4e0171b9275e12d375863f2b3ae9ce00a4c53ddda176bd55868df97ac6f21a6e
#8 resolve docker.io/library/ubuntu:22.04@sha256:4e0171b9275e12d375863f2b3ae9ce00a4c53ddda176bd55868df97ac6f21a6e 0.0s done
#8 DONE 0.0s

#9 [stage-1 2/4] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&             apt-get install -y --no-install-recommends                 libboost-all-dev libc6 procps miniupnpc &&         rm -rf /var/lib/apt/lists/*
#9 CACHED

#10 [internal] load build context
#10 transferring context: 75.59kB 0.0s done
#10 DONE 0.0s

#11 [build 2/6] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&         apt-get install -y --no-install-recommends             build-essential cmake git pkg-config             libboost-all-dev libssl-dev libpthread-stubs0-dev libc6-dev libminiupnpc-dev &&         rm -rf /var/lib/apt/lists/*
#11 CACHED

#12 [build 3/6] WORKDIR /src
#12 CACHED

#13 [build 4/6] COPY zion-cryptonote/ /src/zion-cryptonote/
#13 DONE 0.3s

#14 [build 5/6] WORKDIR /src/zion-cryptonote
#14 DONE 0.0s

#15 [build 6/6] RUN cmake -S . -B build -DCMAKE_BUILD_TYPE=Release     && cmake --build build -j "$(nproc)"
#15 0.707 -- The C compiler identification is GNU 11.4.0
#15 1.050 -- The CXX compiler identification is GNU 11.4.0
#15 1.077 -- Detecting C compiler ABI info
#15 1.766 -- Detecting C compiler ABI info - done
#15 1.781 -- Check for working C compiler: /usr/bin/cc - skipped
#15 1.782 -- Detecting C compile features
#15 1.783 -- Detecting C compile features - done
#15 1.786 -- Detecting CXX compiler ABI info
#15 2.330 -- Detecting CXX compiler ABI info - done
#15 2.348 -- Check for working CXX compiler: /usr/bin/c++ - skipped
#15 2.348 -- Detecting CXX compile features
#15 2.349 -- Detecting CXX compile features - done
#15 2.355 -- Looking for pthread.h
#15 2.900 -- Looking for pthread.h - found
#15 2.901 -- Performing Test CMAKE_HAVE_LIBC_PTHREAD
#15 3.438 -- Performing Test CMAKE_HAVE_LIBC_PTHREAD - Success
#15 3.440 -- Found Threads: TRUE  
#15 3.473 -- Found Boost: /usr/include (found suitable version "1.74.0", minimum required is "1.55") found components: system filesystem date_time chrono regex serialization program_options 
#15 3.501 -- Found Git: /usr/bin/git
#15 3.507 -- External dependencies: minimal setup
#15 3.519 -- Configuring done
#15 3.585 -- Generating done
#15 3.588 -- Build files have been written to: /src/zion-cryptonote/build
#15 4.027 [  0%] Building C object src/CMakeFiles/Crypto.dir/crypto/blake256.c.o
#15 4.061 [  0%] Building CXX object src/CMakeFiles/BlockchainExplorer.dir/BlockchainExplorer/BlockchainExplorer.cpp.o
#15 4.061 [  0%] Building CXX object src/CMakeFiles/Common.dir/Common/Base58.cpp.o
#15 4.078 fatal: not a git repository (or any of the parent directories): .git
#15 4.083 CMake Warning at src/version.cmake:3 (message):
#15 4.083   Cannot determine current revision.  Make sure that you are building either
#15 4.083   from a Git working tree or from a source archive.
#15 4.083 
#15 4.083 
#15 4.166 [  0%] Built target version
#15 4.387 [  1%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Account.cpp.o
#15 4.889 /src/zion-cryptonote/src/Common/Base58.cpp: In function 'uint64_t Tools::Base58::{anonymous}::uint_8be_to_64(const uint8_t*, size_t)':
#15 4.889 /src/zion-cryptonote/src/Common/Base58.cpp:87:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 4.889    87 |         case 1:            res |= *data++;
#15 4.889       |                            ~~~~^~~~~~~~~~
#15 4.890 /src/zion-cryptonote/src/Common/Base58.cpp:88:9: note: here
#15 4.890    88 |         case 2: res <<= 8; res |= *data++;
#15 4.890       |         ^~~~
#15 4.890 /src/zion-cryptonote/src/Common/Base58.cpp:88:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 4.890    88 |         case 2: res <<= 8; res |= *data++;
#15 4.890       |                            ~~~~^~~~~~~~~~
#15 4.890 /src/zion-cryptonote/src/Common/Base58.cpp:89:9: note: here
#15 4.890    89 |         case 3: res <<= 8; res |= *data++;
#15 4.890       |         ^~~~
#15 4.890 /src/zion-cryptonote/src/Common/Base58.cpp:89:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 4.890    89 |         case 3: res <<= 8; res |= *data++;
#15 4.890       |                            ~~~~^~~~~~~~~~
#15 4.890 /src/zion-cryptonote/src/Common/Base58.cpp:90:9: note: here
#15 4.890    90 |         case 4: res <<= 8; res |= *data++;
#15 4.890       |         ^~~~
#15 4.890 /src/zion-cryptonote/src/Common/Base58.cpp:90:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 4.890    90 |         case 4: res <<= 8; res |= *data++;
#15 4.890       |                            ~~~~^~~~~~~~~~
#15 4.890 /src/zion-cryptonote/src/Common/Base58.cpp:91:9: note: here
#15 4.890    91 |         case 5: res <<= 8; res |= *data++;
#15 4.890       |         ^~~~
#15 4.890 /src/zion-cryptonote/src/Common/Base58.cpp:91:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 4.890    91 |         case 5: res <<= 8; res |= *data++;
#15 4.890       |                            ~~~~^~~~~~~~~~
#15 4.890 /src/zion-cryptonote/src/Common/Base58.cpp:92:9: note: here
#15 4.890    92 |         case 6: res <<= 8; res |= *data++;
#15 4.890       |         ^~~~
#15 4.890 /src/zion-cryptonote/src/Common/Base58.cpp:92:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 4.890    92 |         case 6: res <<= 8; res |= *data++;
#15 4.890       |                            ~~~~^~~~~~~~~~
#15 4.890 /src/zion-cryptonote/src/Common/Base58.cpp:93:9: note: here
#15 4.890    93 |         case 7: res <<= 8; res |= *data++;
#15 4.890       |         ^~~~
#15 4.890 /src/zion-cryptonote/src/Common/Base58.cpp:93:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 4.890    93 |         case 7: res <<= 8; res |= *data++;
#15 4.890       |                            ~~~~^~~~~~~~~~
#15 4.890 /src/zion-cryptonote/src/Common/Base58.cpp:94:9: note: here
#15 4.890    94 |         case 8: res <<= 8; res |= *data; break;
#15 4.890       |         ^~~~
#15 4.929 [  2%] Building C object src/CMakeFiles/Crypto.dir/crypto/chacha8.c.o
#15 5.432 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 5.432                  from /src/zion-cryptonote/src/CryptoNoteCore/Account.cpp:6:
#15 5.432 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 5.432 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 5.432    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 5.432       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 5.432 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 5.432    23 |   struct chacha8_key {
#15 5.432       |          ^~~~~~~~~~~
#15 5.733 [  2%] Building C object src/CMakeFiles/Crypto.dir/crypto/crypto-ops-data.c.o
#15 5.861 [  3%] Building CXX object src/CMakeFiles/Common.dir/Common/BlockingQueue.cpp.o
#15 6.241 [  3%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/BlockIndex.cpp.o
#15 6.375 [  4%] Building C object src/CMakeFiles/Crypto.dir/crypto/crypto-ops.c.o
#15 6.656 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 6.656                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 6.656                  from /src/zion-cryptonote/include/INode.h:15,
#15 6.656                  from /src/zion-cryptonote/src/BlockchainExplorer/BlockchainExplorer.h:12,
#15 6.656                  from /src/zion-cryptonote/src/BlockchainExplorer/BlockchainExplorer.cpp:5:
#15 6.656 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 6.656 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 6.656    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 6.656       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 6.656 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 6.656    23 |   struct chacha8_key {
#15 6.656       |          ^~~~~~~~~~~
#15 6.904 /src/zion-cryptonote/src/Common/BlockingQueue.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#15 6.904     8 | char suppressMSVCWarningLNK4221;
#15 6.904       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#15 7.093 [  4%] Building CXX object src/CMakeFiles/Common.dir/Common/CommandLine.cpp.o
#15 8.201 [  4%] Building CXX object src/CMakeFiles/Crypto.dir/crypto/crypto.cpp.o
#15 8.784 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 8.784                  from /src/zion-cryptonote/src/CryptoNoteCore/BlockIndex.cpp:9:
#15 8.784 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 8.784 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 8.784    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 8.784       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 8.786 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 8.786    23 |   struct chacha8_key {
#15 8.786       |          ^~~~~~~~~~~
#15 10.96 /src/zion-cryptonote/src/CryptoNoteCore/BlockIndex.cpp: In member function 'std::vector<Crypto::Hash> CryptoNote::BlockIndex::buildSparseChain(const Crypto::Hash&) const':
#15 10.96 /src/zion-cryptonote/src/CryptoNoteCore/BlockIndex.cpp:51:66: warning: 'startBlockHeight' may be used uninitialized in this function [-Wmaybe-uninitialized]
#15 10.96    51 |     size_t sparseChainEnd = static_cast<size_t>(startBlockHeight + 1);
#15 10.96       |                                                 ~~~~~~~~~~~~~~~~~^~~
#15 11.39 [  6%] Building CXX object src/CMakeFiles/Common.dir/Common/ConsoleHandler.cpp.o
#15 11.39 [  5%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Blockchain.cpp.o
#15 11.50 [  7%] Building C object src/CMakeFiles/Crypto.dir/crypto/groestl.c.o
#15 12.64 [  7%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash-extra-blake.c.o
#15 13.20 [  8%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash-extra-groestl.c.o
#15 13.69 [  8%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash-extra-jh.c.o
#15 13.97 [  9%] Building CXX object src/CMakeFiles/BlockchainExplorer.dir/BlockchainExplorer/BlockchainExplorerDataBuilder.cpp.o
#15 13.98 /src/zion-cryptonote/src/crypto/hash-extra-jh.c: In function 'hash_extra_jh':
#15 13.98 /src/zion-cryptonote/src/crypto/hash-extra-jh.c:14:7: warning: unused variable 'r' [-Wunused-variable]
#15 13.98    14 |   int r = jh_hash(HASH_SIZE * 8, data, 8 * length, (uint8_t*)hash);
#15 13.98       |       ^
#15 14.41 [ 10%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash-extra-skein.c.o
#15 14.62 /src/zion-cryptonote/src/crypto/hash-extra-skein.c: In function 'hash_extra_skein':
#15 14.63 /src/zion-cryptonote/src/crypto/hash-extra-skein.c:12:7: warning: unused variable 'r' [-Wunused-variable]
#15 14.63    12 |   int r = skein_hash(8 * HASH_SIZE, data, 8 * length, (uint8_t*)hash);
#15 14.63       |       ^
#15 14.85 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 14.85                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 14.85                  from /src/zion-cryptonote/src/CryptoNoteCore/Blockchain.h:21,
#15 14.85                  from /src/zion-cryptonote/src/CryptoNoteCore/Blockchain.cpp:5:
#15 14.85 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 14.85 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 14.85    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 14.85       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 14.85 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 14.85    23 |   struct chacha8_key {
#15 14.85       |          ^~~~~~~~~~~
#15 14.97 [ 10%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash.c.o
#15 15.70 [ 11%] Building C object src/CMakeFiles/Crypto.dir/crypto/jh.c.o
#15 15.80 [ 11%] Building CXX object src/CMakeFiles/Common.dir/Common/ConsoleTools.cpp.o
#15 16.17 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 16.17                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 16.17                  from /src/zion-cryptonote/src/BlockchainExplorer/BlockchainExplorerDataBuilder.cpp:11:
#15 16.17 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 16.17 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 16.17    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 16.17       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 16.17 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 16.17    23 |   struct chacha8_key {
#15 16.17       |          ^~~~~~~~~~~
#15 17.20 [ 11%] Building C object src/CMakeFiles/Crypto.dir/crypto/keccak.c.o
#15 17.75 [ 12%] Building CXX object src/CMakeFiles/Common.dir/Common/IInputStream.cpp.o
#15 18.08 [ 12%] Building CXX object src/CMakeFiles/Common.dir/Common/IOutputStream.cpp.o
#15 18.25 [ 13%] Building C object src/CMakeFiles/Crypto.dir/crypto/oaes_lib.c.o
#15 18.44 [ 14%] Building CXX object src/CMakeFiles/Common.dir/Common/JsonValue.cpp.o
#15 18.65 /src/zion-cryptonote/src/crypto/oaes_lib.c: In function 'oaes_get_seed':
#15 18.66 /src/zion-cryptonote/src/crypto/oaes_lib.c:490:9: warning: 'ftime' is deprecated: Use gettimeofday or clock_gettime instead [-Wdeprecated-declarations]
#15 18.66   490 |         ftime (&timer);
#15 18.66       |         ^~~~~
#15 18.66 In file included from /src/zion-cryptonote/src/crypto/oaes_lib.c:36:
#15 18.66 /usr/include/x86_64-linux-gnu/sys/timeb.h:29:12: note: declared here
#15 18.66    29 | extern int ftime (struct timeb *__timebuf)
#15 18.66       |            ^~~~~
#15 18.75 At top level:
#15 18.75 /src/zion-cryptonote/src/crypto/oaes_lib.c:30:19: warning: '_NR' defined but not used [-Wunused-const-variable=]
#15 18.75    30 | static const char _NR[] = {
#15 18.75       |                   ^~~
#15 20.24 [ 14%] Building C object src/CMakeFiles/Crypto.dir/crypto/random.c.o
#15 21.62 [ 14%] Building CXX object src/CMakeFiles/BlockchainExplorer.dir/BlockchainExplorer/BlockchainExplorerErrors.cpp.o
#15 21.95 [ 15%] Building C object src/CMakeFiles/Crypto.dir/crypto/skein.c.o
#15 23.44 [ 16%] Linking CXX static library libBlockchainExplorer.a
#15 23.56 [ 16%] Building CXX object src/CMakeFiles/Common.dir/Common/Math.cpp.o
#15 23.64 [ 16%] Building C object src/CMakeFiles/Crypto.dir/crypto/slow-hash.c.o
#15 23.90 [ 16%] Built target BlockchainExplorer
#15 24.01 In file included from /src/zion-cryptonote/src/crypto/slow-hash.c:183:
#15 24.01 /src/zion-cryptonote/src/crypto/slow-hash.inl: In function 'cn_slow_hash_noaesni':
#15 24.01 /src/zion-cryptonote/src/crypto/slow-hash.inl:16:44: warning: unused variable 'b_x' [-Wunused-variable]
#15 24.01    16 |   __m128i *longoutput, *expkey, *xmminput, b_x;
#15 24.01       |                                            ^~~
#15 24.01 /src/zion-cryptonote/src/crypto/slow-hash.inl:16:12: warning: variable 'longoutput' set but not used [-Wunused-but-set-variable]
#15 24.01    16 |   __m128i *longoutput, *expkey, *xmminput, b_x;
#15 24.01       |            ^~~~~~~~~~
#15 24.07 /src/zion-cryptonote/src/Common/Math.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#15 24.07     8 | char suppressMSVCWarningLNK4221;
#15 24.07       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#15 24.20 [ 16%] Building CXX object src/CMakeFiles/Http.dir/HTTP/HttpParser.cpp.o
#15 24.30 [ 17%] Building CXX object src/CMakeFiles/Common.dir/Common/MemoryInputStream.cpp.o
#15 24.86 [ 18%] Building CXX object src/CMakeFiles/Crypto.dir/crypto/slow-hash.cpp.o
#15 25.31 [ 18%] Building CXX object src/CMakeFiles/Common.dir/Common/PathTools.cpp.o
#15 25.32 /src/zion-cryptonote/src/crypto/slow-hash.cpp: In destructor 'Crypto::cn_context::~cn_context()':
#15 25.32 /src/zion-cryptonote/src/crypto/slow-hash.cpp:54:7: warning: 'throw' will always call 'terminate' [-Wterminate]
#15 25.32    54 |       throw bad_alloc();
#15 25.32       |       ^~~~~~~~~~~~~~~~~
#15 25.32 /src/zion-cryptonote/src/crypto/slow-hash.cpp:54:7: note: in C++11 destructors default to 'noexcept'
#15 25.90 [ 19%] Building C object src/CMakeFiles/Crypto.dir/crypto/tree-hash.c.o
#15 26.34 [ 20%] Building CXX object src/CMakeFiles/Http.dir/HTTP/HttpParserErrorCodes.cpp.o
#15 26.94 [ 21%] Building CXX object src/CMakeFiles/Common.dir/Common/ScopeExit.cpp.o
#15 26.97 [ 21%] Linking CXX static library libCrypto.a
#15 27.62 [ 21%] Built target Crypto
#15 27.70 [ 21%] Building CXX object src/CMakeFiles/Common.dir/Common/SignalHandler.cpp.o
#15 27.87 [ 21%] Building CXX object src/CMakeFiles/Http.dir/HTTP/HttpRequest.cpp.o
#15 28.06 [ 22%] Building CXX object src/CMakeFiles/Common.dir/Common/StdInputStream.cpp.o
#15 29.10 [ 22%] Building CXX object src/CMakeFiles/Common.dir/Common/StdOutputStream.cpp.o
#15 29.15 [ 23%] Building CXX object src/CMakeFiles/Common.dir/Common/StreamTools.cpp.o
#15 29.27 [ 23%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/BlockchainIndices.cpp.o
#15 29.48 [ 24%] Building CXX object src/CMakeFiles/Http.dir/HTTP/HttpResponse.cpp.o
#15 30.33 [ 24%] Building CXX object src/CMakeFiles/Common.dir/Common/StringInputStream.cpp.o
#15 30.55 [ 25%] Building CXX object src/CMakeFiles/Common.dir/Common/StringOutputStream.cpp.o
#15 30.97 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 30.97                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#15 30.97                  from /src/zion-cryptonote/src/CryptoNoteCore/BlockchainIndices.cpp:8:
#15 30.97 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 30.97 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 30.97    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 30.97       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 30.97 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 30.97    23 |   struct chacha8_key {
#15 30.97       |          ^~~~~~~~~~~
#15 31.26 [ 25%] Linking CXX static library libHttp.a
#15 31.40 [ 26%] Building CXX object src/CMakeFiles/InProcessNode.dir/InProcessNode/InProcessNode.cpp.o
#15 31.43 [ 26%] Building CXX object src/CMakeFiles/Common.dir/Common/StringTools.cpp.o
#15 31.61 [ 26%] Built target Http
#15 31.67 [ 27%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/BlockchainMessages.cpp.o
#15 32.54 [ 28%] Building CXX object src/CMakeFiles/Common.dir/Common/StringView.cpp.o
#15 33.15 [ 28%] Building CXX object src/CMakeFiles/InProcessNode.dir/InProcessNode/InProcessNodeErrors.cpp.o
#15 33.37 [ 28%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Checkpoints.cpp.o
#15 33.68 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 33.68                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 33.68                  from /src/zion-cryptonote/include/INode.h:15,
#15 33.68                  from /src/zion-cryptonote/src/InProcessNode/InProcessNode.h:7,
#15 33.68                  from /src/zion-cryptonote/src/InProcessNode/InProcessNode.cpp:5:
#15 33.68 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 33.68 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 33.68    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 33.68       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 33.68 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 33.68    23 |   struct chacha8_key {
#15 33.68       |          ^~~~~~~~~~~
#15 33.75 [ 29%] Building CXX object src/CMakeFiles/Common.dir/Common/Util.cpp.o
#15 34.11 [ 30%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Core.cpp.o
#15 36.75 [ 30%] Building CXX object src/CMakeFiles/Common.dir/Common/VectorOutputStream.cpp.o
#15 38.30 [ 30%] Building CXX object src/CMakeFiles/Logging.dir/Logging/CommonLogger.cpp.o
#15 38.35 [ 31%] Linking CXX static library libCommon.a
#15 39.23 [ 31%] Built target Common
#15 39.56 [ 32%] Building CXX object src/CMakeFiles/NodeRpcProxy.dir/NodeRpcProxy/NodeErrors.cpp.o
#15 40.31 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 40.31                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 40.31                  from /src/zion-cryptonote/src/CryptoNoteCore/Blockchain.h:21,
#15 40.31                  from /src/zion-cryptonote/src/CryptoNoteCore/Core.h:14,
#15 40.31                  from /src/zion-cryptonote/src/CryptoNoteCore/Core.cpp:5:
#15 40.31 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 40.31 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 40.31    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 40.31       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 40.31 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 40.31    23 |   struct chacha8_key {
#15 40.31       |          ^~~~~~~~~~~
#15 40.98 /src/zion-cryptonote/src/CryptoNoteCore/Core.cpp: In member function 'virtual std::unique_ptr<CryptoNote::IBlock> CryptoNote::core::getBlock(const Crypto::Hash&)':
#15 40.98 /src/zion-cryptonote/src/CryptoNoteCore/Core.cpp:981:19: warning: redundant move in return statement [-Wredundant-move]
#15 40.98   981 |   return std::move(blockPtr);
#15 40.98       |          ~~~~~~~~~^~~~~~~~~~
#15 40.98 /src/zion-cryptonote/src/CryptoNoteCore/Core.cpp:981:19: note: remove 'std::move' call
#15 41.45 [ 32%] Building CXX object src/CMakeFiles/NodeRpcProxy.dir/NodeRpcProxy/NodeRpcProxy.cpp.o
#15 44.66 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 44.66                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 44.66                  from /src/zion-cryptonote/include/INode.h:15,
#15 44.66                  from /src/zion-cryptonote/src/NodeRpcProxy/NodeRpcProxy.h:15,
#15 44.66                  from /src/zion-cryptonote/src/NodeRpcProxy/NodeRpcProxy.cpp:5:
#15 44.66 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 44.66 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 44.66    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 44.66       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 44.66 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 44.66    23 |   struct chacha8_key {
#15 44.66       |          ^~~~~~~~~~~
#15 47.01 [ 33%] Building CXX object src/CMakeFiles/Logging.dir/Logging/ConsoleLogger.cpp.o
#15 49.52 [ 33%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CoreConfig.cpp.o
#15 51.95 [ 34%] Linking CXX static library libNodeRpcProxy.a
#15 52.22 [ 34%] Building CXX object src/CMakeFiles/Logging.dir/Logging/FileLogger.cpp.o
#15 52.92 [ 34%] Built target NodeRpcProxy
#15 53.24 [ 35%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/HttpClient.cpp.o
#15 54.03 [ 36%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteBasic.cpp.o
#15 55.41 [ 36%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/HttpServer.cpp.o
#15 56.41 [ 36%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteBasicImpl.cpp.o
#15 56.67 [ 37%] Building CXX object src/CMakeFiles/Logging.dir/Logging/ILogger.cpp.o
#15 57.87 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 57.87                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 57.87                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteBasicImpl.cpp:6:
#15 57.87 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 57.87 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 57.87    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 57.87       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 57.87 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 57.87    23 |   struct chacha8_key {
#15 57.87       |          ^~~~~~~~~~~
#15 58.00 /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteBasicImpl.cpp: In function 'std::string CryptoNote::getAccountAddressAsStr(uint64_t, const CryptoNote::AccountPublicAddress&)':
#15 58.00 /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteBasicImpl.cpp:53:10: warning: unused variable 'r' [-Wunused-variable]
#15 58.00    53 |     bool r = toBinaryArray(adr, ba);
#15 58.00       |          ^
#15 59.80 [ 38%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteFormatUtils.cpp.o
#15 61.09 [ 39%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/JsonRpc.cpp.o
#15 61.09 [ 39%] Building CXX object src/CMakeFiles/Logging.dir/Logging/LoggerGroup.cpp.o
#15 61.53 [ 40%] Linking CXX static library libInProcessNode.a
#15 61.93 [ 40%] Built target InProcessNode
#15 62.00 [ 40%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/RpcServer.cpp.o
#15 62.01 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 62.01                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 62.01                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.cpp:5:
#15 62.01 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 62.01 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 62.01    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 62.01       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 62.01 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 62.01    23 |   struct chacha8_key {
#15 62.01       |          ^~~~~~~~~~~
#15 62.73 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 62.73                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 62.73                  from /src/zion-cryptonote/src/Rpc/CoreRpcServerCommandsDefinitions.h:7,
#15 62.73                  from /src/zion-cryptonote/src/Rpc/JsonRpc.h:11,
#15 62.73                  from /src/zion-cryptonote/src/Rpc/JsonRpc.cpp:5:
#15 62.73 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 62.73 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 62.73    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 62.73       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 62.73 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 62.73    23 |   struct chacha8_key {
#15 62.73       |          ^~~~~~~~~~~
#15 64.43 [ 40%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteSerialization.cpp.o
#15 64.52 [ 41%] Building CXX object src/CMakeFiles/Logging.dir/Logging/LoggerManager.cpp.o
#15 65.18 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 65.18                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 65.18                  from /src/zion-cryptonote/src/Rpc/CoreRpcServerCommandsDefinitions.h:7,
#15 65.18                  from /src/zion-cryptonote/src/Rpc/RpcServer.h:11,
#15 65.18                  from /src/zion-cryptonote/src/Rpc/RpcServer.cpp:5:
#15 65.18 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 65.18 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 65.18    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 65.18       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 65.18 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 65.18    23 |   struct chacha8_key {
#15 65.18       |          ^~~~~~~~~~~
#15 65.91 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 65.91                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.cpp:5:
#15 65.91 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 65.91 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 65.91    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 65.91       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 65.91 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 65.91    23 |   struct chacha8_key {
#15 65.91       |          ^~~~~~~~~~~
#15 66.90 [ 41%] Building CXX object src/CMakeFiles/P2P.dir/CryptoNoteProtocol/CryptoNoteProtocolHandler.cpp.o
#15 69.48 [ 42%] Building CXX object src/CMakeFiles/Logging.dir/Logging/LoggerMessage.cpp.o
#15 69.65 [ 43%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteTools.cpp.o
#15 70.52 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 70.52                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 70.52                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolHandler.h:13,
#15 70.52                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolHandler.cpp:5:
#15 70.52 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 70.52 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 70.52    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 70.52       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 70.52 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 70.52    23 |   struct chacha8_key {
#15 70.52       |          ^~~~~~~~~~~
#15 71.90 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 71.90                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#15 71.90                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.cpp:5:
#15 71.90 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 71.90 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 71.90    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 71.90       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 71.90 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 71.90    23 |   struct chacha8_key {
#15 71.90       |          ^~~~~~~~~~~
#15 73.10 /src/zion-cryptonote/src/Logging/LoggerMessage.cpp: In constructor 'Logging::LoggerMessage::LoggerMessage(Logging::LoggerMessage&&)':
#15 73.10 /src/zion-cryptonote/src/Logging/LoggerMessage.cpp:65:11: warning: unused variable '_Pnext' [-Wunused-variable]
#15 73.10    65 |     char *_Pnext = pptr();
#15 73.10       |           ^~~~~~
#15 74.56 [ 43%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Currency.cpp.o
#15 75.54 [ 43%] Building CXX object src/CMakeFiles/Logging.dir/Logging/LoggerRef.cpp.o
#15 79.10 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 79.10                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 79.10                  from /src/zion-cryptonote/src/CryptoNoteCore/Currency.cpp:15:
#15 79.10 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 79.10 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 79.10    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 79.10       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 79.11 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 79.11    23 |   struct chacha8_key {
#15 79.11       |          ^~~~~~~~~~~
#15 80.41 [ 44%] Building CXX object src/CMakeFiles/P2P.dir/P2p/IP2pNodeInternal.cpp.o
#15 80.52 [ 45%] Building CXX object src/CMakeFiles/Logging.dir/Logging/StreamLogger.cpp.o
#15 81.74 [ 46%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/RpcServerConfig.cpp.o
#15 82.44 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 82.44                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#15 82.44                  from /src/zion-cryptonote/src/P2p/IP2pNodeInternal.h:8,
#15 82.44                  from /src/zion-cryptonote/src/P2p/IP2pNodeInternal.cpp:5:
#15 82.44 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 82.44 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 82.44    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 82.44       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 82.44 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 82.44    23 |   struct chacha8_key {
#15 82.44       |          ^~~~~~~~~~~
#15 83.25 [ 46%] Building CXX object src/CMakeFiles/P2P.dir/P2p/LevinProtocol.cpp.o
#15 83.49 [ 47%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Difficulty.cpp.o
#15 84.80 [ 47%] Linking CXX static library libLogging.a
#15 84.84 [ 47%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/IBlock.cpp.o
#15 85.45 [ 47%] Built target Logging
#15 85.80 [ 48%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/BinaryInputStreamSerializer.cpp.o
#15 85.82 [ 49%] Building CXX object src/CMakeFiles/P2P.dir/P2p/NetNode.cpp.o
#15 86.59 [ 50%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/ITimeProvider.cpp.o
#15 86.93 [ 50%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Miner.cpp.o
#15 87.06 [ 50%] Linking CXX static library libRpc.a
#15 87.29 [ 50%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/BinaryOutputStreamSerializer.cpp.o
#15 87.59 [ 50%] Built target Rpc
#15 87.69 [ 50%] Building CXX object src/CMakeFiles/P2P.dir/P2p/NetNodeConfig.cpp.o
#15 88.68 [ 51%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/JsonInputStreamSerializer.cpp.o
#15 88.78 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 88.78                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 88.78                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolHandler.h:13,
#15 88.78                  from /src/zion-cryptonote/src/P2p/NetNode.h:21,
#15 88.78                  from /src/zion-cryptonote/src/P2p/NetNode.cpp:5:
#15 88.78 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 88.78 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 88.78    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 88.78       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 88.78 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 88.78    23 |   struct chacha8_key {
#15 88.78       |          ^~~~~~~~~~~
#15 90.14 [ 52%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/JsonInputValueSerializer.cpp.o
#15 91.99 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 91.99                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 91.99                  from /src/zion-cryptonote/src/CryptoNoteCore/Miner.cpp:24:
#15 91.99 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 91.99 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 91.99    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 91.99       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 91.99 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 91.99    23 |   struct chacha8_key {
#15 91.99       |          ^~~~~~~~~~~
#15 93.87 [ 52%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/JsonOutputStreamSerializer.cpp.o
#15 95.28 [ 53%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/KVBinaryInputStreamSerializer.cpp.o
#15 96.27 [ 54%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/Dispatcher.cpp.o
#15 96.76 [ 54%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/KVBinaryOutputStreamSerializer.cpp.o
#15 96.96 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp: In constructor 'System::Dispatcher::Dispatcher()':
#15 96.96 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp:92:14: warning: unused variable 'result' [-Wunused-variable]
#15 96.96    92 |         auto result = close(remoteSpawnEvent);
#15 96.96       |              ^~~~~~
#15 96.96 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp:97:10: warning: unused variable 'result' [-Wunused-variable]
#15 96.96    97 |     auto result = close(epoll);
#15 96.96       |          ^~~~~~
#15 96.96 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp: In destructor 'System::Dispatcher::~Dispatcher()':
#15 96.96 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp:123:9: warning: unused variable 'result' [-Wunused-variable]
#15 96.96   123 |     int result = ::close(timers.top());
#15 96.96       |         ^~~~~~
#15 96.96 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp:128:8: warning: variable 'result' set but not used [-Wunused-but-set-variable]
#15 96.96   128 |   auto result = close(epoll);
#15 96.96       |        ^~~~~~
#15 97.21 [ 55%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/MinerConfig.cpp.o
#15 98.08 [ 55%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/ErrorMessage.cpp.o
#15 98.77 [ 56%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/MemoryStream.cpp.o
#15 99.41 [ 56%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/SerializationOverloads.cpp.o
#15 99.54 [ 57%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/Ipv4Resolver.cpp.o
#15 100.4 [ 58%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pConnectionProxy.cpp.o
#15 100.6 [ 59%] Linking CXX static library libSerialization.a
#15 101.0 [ 59%] Built target Serialization
#15 101.0 [ 59%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/SwappedMap.cpp.o
#15 101.2 [ 59%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/TcpConnection.cpp.o
#15 101.6 [ 60%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/SwappedVector.cpp.o
#15 102.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp: In destructor 'System::TcpConnection::~TcpConnection()':
#15 102.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:37:9: warning: unused variable 'result' [-Wunused-variable]
#15 102.0    37 |     int result = close(connection);
#15 102.0       |         ^~~~~~
#15 102.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp: In member function 'size_t System::TcpConnection::read(uint8_t*, size_t)':
#15 102.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:73:26: warning: logical 'and' of equal expressions [-Wlogical-op]
#15 102.0    73 |     if (errno != EAGAIN  && errno != EWOULDBLOCK) {
#15 102.0       |                          ^
#15 102.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp: In member function 'std::size_t System::TcpConnection::write(const uint8_t*, size_t)':
#15 102.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:169:26: warning: logical 'and' of equal expressions [-Wlogical-op]
#15 102.0   169 |     if (errno != EAGAIN  && errno != EWOULDBLOCK) {
#15 102.0       |                          ^
#15 102.5 /src/zion-cryptonote/src/CryptoNoteCore/SwappedMap.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#15 102.5     8 | char suppressMSVCWarningLNK4221;
#15 102.5       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#15 102.6 /src/zion-cryptonote/src/CryptoNoteCore/SwappedVector.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#15 102.6     8 | char suppressMSVCWarningLNK4221;
#15 102.6       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#15 102.9 [ 61%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/TcpConnector.cpp.o
#15 102.9 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 102.9                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#15 102.9                  from /src/zion-cryptonote/src/P2p/IP2pNodeInternal.h:8,
#15 102.9                  from /src/zion-cryptonote/src/P2p/P2pConnectionProxy.h:9,
#15 102.9                  from /src/zion-cryptonote/src/P2p/P2pConnectionProxy.cpp:5:
#15 102.9 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 102.9 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 102.9    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 102.9       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 102.9 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 102.9    23 |   struct chacha8_key {
#15 102.9       |          ^~~~~~~~~~~
#15 102.9 [ 61%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Transaction.cpp.o
#15 103.0 [ 62%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/TransactionExtra.cpp.o
#15 103.5 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnector.cpp: In member function 'System::TcpConnection System::TcpConnector::connect(const System::Ipv4Address&, uint16_t)':
#15 103.5 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnector.cpp:133:23: warning: unused variable 'result' [-Wunused-variable]
#15 103.5   133 |                   int result = close(connection);
#15 103.5       |                       ^~~~~~
#15 103.5 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnector.cpp:160:9: warning: unused variable 'result' [-Wunused-variable]
#15 103.5   160 |     int result = close(connection);
#15 103.5       |         ^~~~~~
#15 104.2 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 104.2                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 104.2                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionApiExtra.h:7,
#15 104.2                  from /src/zion-cryptonote/src/CryptoNoteCore/Transaction.cpp:6:
#15 104.2 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 104.2 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 104.2    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 104.2       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 104.2 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 104.2    23 |   struct chacha8_key {
#15 104.2       |          ^~~~~~~~~~~
#15 104.4 [ 62%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/TcpListener.cpp.o
#15 104.4 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 104.4                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#15 104.4                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionExtra.cpp:10:
#15 104.4 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 104.4 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 104.4    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 104.4       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 104.4 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 104.4    23 |   struct chacha8_key {
#15 104.4       |          ^~~~~~~~~~~
#15 105.1 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp: In constructor 'System::TcpListener::TcpListener(System::Dispatcher&, const System::Ipv4Address&, uint16_t)':
#15 105.1 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp:63:9: warning: unused variable 'result' [-Wunused-variable]
#15 105.1    63 |     int result = close(listener);
#15 105.1       |         ^~~~~~
#15 105.1 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp: In destructor 'System::TcpListener::~TcpListener()':
#15 105.1 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp:82:9: warning: unused variable 'result' [-Wunused-variable]
#15 105.1    82 |     int result = close(listener);
#15 105.1       |         ^~~~~~
#15 105.1 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp: In member function 'System::TcpConnection System::TcpListener::accept()':
#15 105.1 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp:176:11: warning: unused variable 'result' [-Wunused-variable]
#15 105.1   176 |       int result = close(connection);
#15 105.1       |           ^~~~~~
#15 105.5 [ 62%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pContext.cpp.o
#15 105.8 [ 63%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/Timer.cpp.o
#15 105.9 [ 63%] Building CXX object src/CMakeFiles/Transfers.dir/Transfers/BlockchainSynchronizer.cpp.o
#15 106.5 /src/zion-cryptonote/src/Platform/Linux/System/Timer.cpp: In lambda function:
#15 106.5 /src/zion-cryptonote/src/Platform/Linux/System/Timer.cpp:92:32: warning: logical 'or' of equal expressions [-Wlogical-op]
#15 106.5    92 |             if(errno == EAGAIN || errno == EWOULDBLOCK) {
#15 106.5       |                                ^
#15 107.2 [ 63%] Building CXX object src/CMakeFiles/System.dir/System/ContextGroup.cpp.o
#15 107.2 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 107.2                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#15 107.2                  from /src/zion-cryptonote/src/P2p/P2pContext.h:19,
#15 107.2                  from /src/zion-cryptonote/src/P2p/P2pContext.cpp:5:
#15 107.2 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 107.2 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 107.2    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 107.2       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 107.2 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 107.2    23 |   struct chacha8_key {
#15 107.2       |          ^~~~~~~~~~~
#15 107.3 [ 64%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/TransactionPool.cpp.o
#15 107.4 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 107.4                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 107.4                  from /src/zion-cryptonote/include/INode.h:15,
#15 107.4                  from /src/zion-cryptonote/src/Transfers/BlockchainSynchronizer.h:7,
#15 107.4                  from /src/zion-cryptonote/src/Transfers/BlockchainSynchronizer.cpp:5:
#15 107.4 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 107.4 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 107.4    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 107.4       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 107.4 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 107.4    23 |   struct chacha8_key {
#15 107.4       |          ^~~~~~~~~~~
#15 108.2 [ 65%] Building CXX object src/CMakeFiles/System.dir/System/ContextGroupTimeout.cpp.o
#15 108.4 [ 66%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pContextOwner.cpp.o
#15 109.3 [ 66%] Building CXX object src/CMakeFiles/System.dir/System/Event.cpp.o
#15 110.2 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 110.2                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#15 110.2                  from /src/zion-cryptonote/src/P2p/P2pContext.h:19,
#15 110.2                  from /src/zion-cryptonote/src/P2p/P2pContextOwner.cpp:7:
#15 110.2 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 110.2 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 110.2    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 110.2       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 110.2 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 110.2    23 |   struct chacha8_key {
#15 110.2       |          ^~~~~~~~~~~
#15 110.4 [ 67%] Building CXX object src/CMakeFiles/System.dir/System/EventLock.cpp.o
#15 110.5 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 110.5                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 110.5                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionPool.cpp:21:
#15 110.5 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 110.5 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 110.5    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 110.5       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 110.5 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 110.5    23 |   struct chacha8_key {
#15 110.5       |          ^~~~~~~~~~~
#15 110.9 [ 67%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pInterfaces.cpp.o
#15 111.0 [ 67%] Building CXX object src/CMakeFiles/System.dir/System/InterruptedException.cpp.o
#15 111.3 /src/zion-cryptonote/src/System/InterruptedException.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#15 111.3     8 | char suppressMSVCWarningLNK4221;
#15 111.3       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#15 111.4 [ 68%] Building CXX object src/CMakeFiles/Transfers.dir/Transfers/SynchronizationState.cpp.o
#15 111.4 [ 69%] Building CXX object src/CMakeFiles/System.dir/System/Ipv4Address.cpp.o
#15 112.1 /src/zion-cryptonote/src/System/Ipv4Address.cpp: In member function 'bool System::Ipv4Address::isPrivate() const':
#15 112.1 /src/zion-cryptonote/src/System/Ipv4Address.cpp:107:26: warning: comparison of integer expressions of different signedness: 'unsigned int' and 'int' [-Wsign-compare]
#15 112.1   107 |     (value & 0xfff00000) == ((172 << 24) | (16 << 16)) ||
#15 112.1       |     ~~~~~~~~~~~~~~~~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 112.1 /src/zion-cryptonote/src/System/Ipv4Address.cpp:109:26: warning: comparison of integer expressions of different signedness: 'unsigned int' and 'int' [-Wsign-compare]
#15 112.1   109 |     (value & 0xffff0000) == ((192 << 24) | (168 << 16));
#15 112.1       |     ~~~~~~~~~~~~~~~~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 112.9 [ 70%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pNode.cpp.o
#15 113.2 [ 70%] Building CXX object src/CMakeFiles/System.dir/System/RemoteEventLock.cpp.o
#15 113.6 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 113.6                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 113.6                  from /src/zion-cryptonote/include/INode.h:15,
#15 113.6                  from /src/zion-cryptonote/src/Transfers/CommonTypes.h:13,
#15 113.6                  from /src/zion-cryptonote/src/Transfers/SynchronizationState.h:7,
#15 113.6                  from /src/zion-cryptonote/src/Transfers/SynchronizationState.cpp:5:
#15 113.6 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 113.6 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 113.6    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 113.6       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 113.6 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 113.6    23 |   struct chacha8_key {
#15 113.6       |          ^~~~~~~~~~~
#15 113.9 /src/zion-cryptonote/src/Transfers/SynchronizationState.cpp: In member function 'void CryptoNote::SynchronizationState::addBlocks(const Crypto::Hash*, uint32_t, uint32_t)':
#15 113.9 /src/zion-cryptonote/src/Transfers/SynchronizationState.cpp:84:8: warning: unused variable 'size' [-Wunused-variable]
#15 113.9    84 |   auto size = m_blockchain.size();
#15 113.9       |        ^~~~
#15 115.2 [ 71%] Building CXX object src/CMakeFiles/System.dir/System/TcpStream.cpp.o
#15 115.4 [ 71%] Building CXX object src/CMakeFiles/Transfers.dir/Transfers/TransfersConsumer.cpp.o
#15 117.0 [ 72%] Linking CXX static library libSystem.a
#15 117.1 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 117.1                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#15 117.1                  from /src/zion-cryptonote/src/P2p/IP2pNodeInternal.h:8,
#15 117.1                  from /src/zion-cryptonote/src/P2p/P2pNode.h:17,
#15 117.1                  from /src/zion-cryptonote/src/P2p/P2pNode.cpp:5:
#15 117.1 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 117.1 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 117.1    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 117.1       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 117.1 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 117.1    23 |   struct chacha8_key {
#15 117.1       |          ^~~~~~~~~~~
#15 117.5 [ 72%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/TransactionPrefixImpl.cpp.o
#15 117.6 [ 72%] Built target System
#15 117.9 [ 73%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/LegacyKeysImporter.cpp.o
#15 119.1 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 119.1                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 119.1                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionApiExtra.h:7,
#15 119.1                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionPrefixImpl.cpp:12:
#15 119.1 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 119.1 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 119.1    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 119.1       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 119.1 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 119.1    23 |   struct chacha8_key {
#15 119.1       |          ^~~~~~~~~~~
#15 119.1 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 119.1                  from /src/zion-cryptonote/src/Transfers/TransfersContainer.h:19,
#15 119.1                  from /src/zion-cryptonote/src/Transfers/TransfersSubscription.h:8,
#15 119.1                  from /src/zion-cryptonote/src/Transfers/TransfersConsumer.h:9,
#15 119.1                  from /src/zion-cryptonote/src/Transfers/TransfersConsumer.cpp:5:
#15 119.1 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 119.1 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 119.1    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 119.1       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 119.1 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 119.1    23 |   struct chacha8_key {
#15 119.1       |          ^~~~~~~~~~~
#15 122.1 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 122.1                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#15 122.1                  from /src/zion-cryptonote/src/Wallet/LegacyKeysImporter.cpp:14:
#15 122.1 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 122.1 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 122.1    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 122.1       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 122.1 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 122.1    23 |   struct chacha8_key {
#15 122.1       |          ^~~~~~~~~~~
#15 122.6 [ 73%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pNodeConfig.cpp.o
#15 122.6 [ 74%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/TransactionUtils.cpp.o
#15 124.0 [ 74%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/WalletAsyncContextCounter.cpp.o
#15 124.5 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 124.5                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 124.5                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionUtils.cpp:11:
#15 124.5 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 124.5 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 124.5    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 124.5       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 124.5 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 124.5    23 |   struct chacha8_key {
#15 124.5       |          ^~~~~~~~~~~
#15 125.4 [ 75%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/WalletErrors.cpp.o
#15 125.7 [ 76%] Building CXX object src/CMakeFiles/Transfers.dir/Transfers/TransfersContainer.cpp.o
#15 126.3 [ 76%] Linking CXX static library libCryptoNoteCore.a
#15 126.8 [ 77%] Building CXX object src/CMakeFiles/P2P.dir/P2p/PeerListManager.cpp.o
#15 126.8 [ 77%] Built target CryptoNoteCore
#15 126.9 [ 77%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/WalletGreen.cpp.o
#15 127.1 [ 77%] Building CXX object src/CMakeFiles/PaymentGate.dir/PaymentGate/NodeFactory.cpp.o
#15 128.7 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 128.7                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 128.7                  from /src/zion-cryptonote/include/INode.h:15,
#15 128.7                  from /src/zion-cryptonote/src/PaymentGate/NodeFactory.h:7,
#15 128.7                  from /src/zion-cryptonote/src/PaymentGate/NodeFactory.cpp:5:
#15 128.7 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 128.7 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 128.7    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 128.7       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 128.7 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 128.7    23 |   struct chacha8_key {
#15 128.7       |          ^~~~~~~~~~~
#15 128.7 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 128.7                  from /src/zion-cryptonote/src/Transfers/TransfersContainer.h:19,
#15 128.7                  from /src/zion-cryptonote/src/Transfers/TransfersContainer.cpp:5:
#15 128.7 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 128.7 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 128.7    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 128.7       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 128.7 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 128.7    23 |   struct chacha8_key {
#15 128.7       |          ^~~~~~~~~~~
#15 130.5 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 130.5                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 130.5                  from /src/zion-cryptonote/include/INode.h:15,
#15 130.5                  from /src/zion-cryptonote/src/Transfers/BlockchainSynchronizer.h:7,
#15 130.5                  from /src/zion-cryptonote/src/Wallet/WalletGreen.h:18,
#15 130.5                  from /src/zion-cryptonote/src/Wallet/WalletGreen.cpp:5:
#15 130.5 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 130.5 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 130.5    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 130.5       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 130.5 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 130.5    23 |   struct chacha8_key {
#15 130.5       |          ^~~~~~~~~~~
#15 130.8 [ 78%] Linking CXX static library libP2P.a
#15 131.1 [ 79%] Building CXX object src/CMakeFiles/PaymentGate.dir/PaymentGate/PaymentServiceJsonRpcMessages.cpp.o
#15 131.3 [ 79%] Built target P2P
#15 131.4 [ 80%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/WalletRpcServer.cpp.o
#15 132.0 /src/zion-cryptonote/src/Wallet/WalletGreen.cpp: In member function 'bool CryptoNote::WalletGreen::updateWalletTransactionInfo(size_t, const CryptoNote::TransactionInformation&, int64_t)':
#15 132.0 /src/zion-cryptonote/src/Wallet/WalletGreen.cpp:971:8: warning: unused variable 'r' [-Wunused-variable]
#15 132.0   971 |   bool r = txIdIndex.modify(it, [&info, totalAmount, &updated](WalletTransaction& transaction) {
#15 132.0       |        ^
#15 132.3 /src/zion-cryptonote/src/Wallet/WalletGreen.cpp: In member function 'virtual void CryptoNote::WalletGreen::onTransactionUpdated(const Crypto::PublicKey&, const Crypto::Hash&, const std::vector<CryptoNote::ITransfersContainer*>&)':
#15 132.3 /src/zion-cryptonote/src/Wallet/WalletGreen.cpp:1800:10: warning: unused variable 'found' [-Wunused-variable]
#15 132.3  1800 |     bool found = container->getTransactionInformation(transactionHash, info, &inputsAmount, &outputsAmount);
#15 132.3       |          ^~~~~
#15 132.3 /src/zion-cryptonote/src/Wallet/WalletGreen.cpp: In member function 'virtual size_t CryptoNote::WalletGreen::createFusionTransaction(uint64_t, uint64_t)':
#15 132.3 /src/zion-cryptonote/src/Wallet/WalletGreen.cpp:2092:12: warning: variable 'transactionAmount' set but not used [-Wunused-but-set-variable]
#15 132.3  2092 |   uint64_t transactionAmount;
#15 132.3       |            ^~~~~~~~~~~~~~~~~
#15 134.3 [ 80%] Building CXX object src/CMakeFiles/PaymentGate.dir/PaymentGate/PaymentServiceJsonRpcServer.cpp.o
#15 136.4 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 136.4                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 136.4                  from /src/zion-cryptonote/src/Wallet/WalletRpcServerCommandsDefinitions.h:6,
#15 136.4                  from /src/zion-cryptonote/src/Wallet/WalletRpcServer.h:10,
#15 136.4                  from /src/zion-cryptonote/src/Wallet/WalletRpcServer.cpp:5:
#15 136.4 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 136.4 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 136.4    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 136.4       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 136.4 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 136.4    23 |   struct chacha8_key {
#15 136.4       |          ^~~~~~~~~~~
#15 136.8 [ 80%] Building CXX object src/CMakeFiles/Transfers.dir/Transfers/TransfersSubscription.cpp.o
#15 140.7 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 140.7                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 140.7                  from /src/zion-cryptonote/include/INode.h:15,
#15 140.7                  from /src/zion-cryptonote/src/PaymentGate/WalletService.h:11,
#15 140.7                  from /src/zion-cryptonote/src/PaymentGate/PaymentServiceJsonRpcServer.cpp:10:
#15 140.7 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 140.7 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 140.7    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 140.7       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 140.7 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 140.7    23 |   struct chacha8_key {
#15 140.7       |          ^~~~~~~~~~~
#15 145.7 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 145.7                  from /src/zion-cryptonote/src/Transfers/TransfersContainer.h:19,
#15 145.7                  from /src/zion-cryptonote/src/Transfers/TransfersSubscription.h:8,
#15 145.7                  from /src/zion-cryptonote/src/Transfers/TransfersSubscription.cpp:5:
#15 145.7 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 145.7 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 145.7    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 145.7       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 145.7 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 145.7    23 |   struct chacha8_key {
#15 145.7       |          ^~~~~~~~~~~
#15 332.6 c++: fatal error: Killed signal terminated program cc1plus
#15 332.6 compilation terminated.
#15 333.1 gmake[2]: *** [src/CMakeFiles/Wallet.dir/build.make:118: src/CMakeFiles/Wallet.dir/Wallet/WalletGreen.cpp.o] Error 1
#15 333.1 gmake[2]: *** Waiting for unfinished jobs....
#15 335.1 [ 80%] Building CXX object src/CMakeFiles/JsonRpcServer.dir/JsonRpcServer/JsonRpcServer.cpp.o
#15 338.8 [ 81%] Building CXX object src/CMakeFiles/PaymentGate.dir/PaymentGate/WalletFactory.cpp.o
#15 344.0 gmake[1]: *** [CMakeFiles/Makefile2:522: src/CMakeFiles/Wallet.dir/all] Error 2
#15 344.0 gmake[1]: *** Waiting for unfinished jobs....
#15 344.1 [ 82%] Building CXX object src/CMakeFiles/Transfers.dir/Transfers/TransfersSynchronizer.cpp.o
#15 346.2 [ 83%] Linking CXX static library libJsonRpcServer.a
#15 346.8 [ 83%] Built target JsonRpcServer
#15 346.8 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 346.8                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 346.8                  from /src/zion-cryptonote/include/INode.h:15,
#15 346.8                  from /src/zion-cryptonote/src/PaymentGate/WalletFactory.h:8,
#15 346.8                  from /src/zion-cryptonote/src/PaymentGate/WalletFactory.cpp:5:
#15 346.8 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 346.8 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 346.8    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 346.8       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 346.8 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 346.8    23 |   struct chacha8_key {
#15 346.8       |          ^~~~~~~~~~~
#15 346.8 [ 83%] Building CXX object src/CMakeFiles/PaymentGate.dir/PaymentGate/WalletService.cpp.o
#15 348.7 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 348.7                  from /src/zion-cryptonote/src/Transfers/TransfersContainer.h:19,
#15 348.7                  from /src/zion-cryptonote/src/Transfers/TransfersSubscription.h:8,
#15 348.7                  from /src/zion-cryptonote/src/Transfers/TransfersConsumer.h:9,
#15 348.7                  from /src/zion-cryptonote/src/Transfers/TransfersSynchronizer.cpp:6:
#15 348.7 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 348.7 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 348.7    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 348.7       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 348.7 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 348.7    23 |   struct chacha8_key {
#15 348.7       |          ^~~~~~~~~~~
#15 348.9 [ 84%] Building CXX object src/CMakeFiles/PaymentGate.dir/PaymentGate/WalletServiceErrorCategory.cpp.o
#15 351.4 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 351.4                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 351.4                  from /src/zion-cryptonote/include/INode.h:15,
#15 351.4                  from /src/zion-cryptonote/src/PaymentGate/WalletService.h:11,
#15 351.4                  from /src/zion-cryptonote/src/PaymentGate/WalletService.cpp:5:
#15 351.4 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 351.4 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 351.4    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 351.4       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 351.4 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 351.4    23 |   struct chacha8_key {
#15 351.4       |          ^~~~~~~~~~~
#15 353.1 /src/zion-cryptonote/src/PaymentGate/WalletService.cpp: In function 'Crypto::Hash PaymentService::{anonymous}::parsePaymentId(const string&)':
#15 353.1 /src/zion-cryptonote/src/PaymentGate/WalletService.cpp:68:8: warning: unused variable 'r' [-Wunused-variable]
#15 353.1    68 |   bool r = Common::podFromHex(paymentIdStr, paymentId);
#15 353.1       |        ^
#15 354.1 [ 84%] Linking CXX static library libTransfers.a
#15 354.7 [ 84%] Built target Transfers
#15 357.3 [ 84%] Linking CXX static library libPaymentGate.a
#15 357.6 [ 84%] Built target PaymentGate
#15 357.6 gmake: *** [Makefile:101: all] Error 2
#15 ERROR: process "/bin/sh -c cmake -S . -B build -DCMAKE_BUILD_TYPE=Release     && cmake --build build -j \"$(nproc)\"" did not complete successfully: cannot allocate memory
------
 > [build 6/6] RUN cmake -S . -B build -DCMAKE_BUILD_TYPE=Release     && cmake --build build -j "$(nproc)":
351.4       |          ^~~~~~~~~~~
353.1 /src/zion-cryptonote/src/PaymentGate/WalletService.cpp: In function 'Crypto::Hash PaymentService::{anonymous}::parsePaymentId(const string&)':
353.1 /src/zion-cryptonote/src/PaymentGate/WalletService.cpp:68:8: warning: unused variable 'r' [-Wunused-variable]
353.1    68 |   bool r = Common::podFromHex(paymentIdStr, paymentId);
353.1       |        ^
354.1 [ 84%] Linking CXX static library libTransfers.a
354.7 [ 84%] Built target Transfers
357.3 [ 84%] Linking CXX static library libPaymentGate.a
357.6 [ 84%] Built target PaymentGate
357.6 gmake: *** [Makefile:101: all] Error 2
------

 [33m2 warnings found (use docker --debug to expand):
[0m - FromPlatformFlagConstDisallowed: FROM --platform flag should not use constant value "linux/amd64" (line 3)
 - FromPlatformFlagConstDisallowed: FROM --platform flag should not use constant value "linux/amd64" (line 20)
Dockerfile.zion-cryptonote:17
--------------------
  16 |     WORKDIR /src/zion-cryptonote
  17 | >>> RUN cmake -S . -B build -DCMAKE_BUILD_TYPE=Release \
  18 | >>>     && cmake --build build -j "$(nproc)"
  19 |     
--------------------
ERROR: failed to build: failed to solve: ResourceExhausted: process "/bin/sh -c cmake -S . -B build -DCMAKE_BUILD_TYPE=Release     && cmake --build build -j \"$(nproc)\"" did not complete successfully: cannot allocate memory
\n### Rebuild with -j2 to avoid OOM pá 19. září 2025 10:39:43 UTC
#0 building with "desktop-linux" instance using docker driver

#1 [internal] load build definition from Dockerfile.zion-cryptonote
#1 transferring dockerfile: 1.43kB 0.0s done
#1 DONE 0.0s

#2 resolve image config for docker-image://docker.io/docker/dockerfile:1
#2 ...

#3 [auth] docker/dockerfile:pull token for registry-1.docker.io
#3 DONE 0.0s

#2 resolve image config for docker-image://docker.io/docker/dockerfile:1
#2 DONE 1.4s

#4 docker-image://docker.io/docker/dockerfile:1@sha256:dabfc0969b935b2080555ace70ee69a5261af8a8f1b4df97b9e7fbcf6722eddf
#4 resolve docker.io/docker/dockerfile:1@sha256:dabfc0969b935b2080555ace70ee69a5261af8a8f1b4df97b9e7fbcf6722eddf 0.0s done
#4 CACHED

#5 [auth] library/ubuntu:pull token for registry-1.docker.io
#5 DONE 0.0s

#6 [internal] load metadata for docker.io/library/ubuntu:22.04
#6 DONE 0.7s

#7 [internal] load .dockerignore
#7 transferring context: 333B done
#7 DONE 0.0s

#8 [build 1/6] FROM docker.io/library/ubuntu:22.04@sha256:4e0171b9275e12d375863f2b3ae9ce00a4c53ddda176bd55868df97ac6f21a6e
#8 resolve docker.io/library/ubuntu:22.04@sha256:4e0171b9275e12d375863f2b3ae9ce00a4c53ddda176bd55868df97ac6f21a6e done
#8 DONE 0.0s

#9 [stage-1 2/4] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&             apt-get install -y --no-install-recommends                 libboost-all-dev libc6 procps miniupnpc &&         rm -rf /var/lib/apt/lists/*
#9 CACHED

#10 [internal] load build context
#10 transferring context: 71.15kB 0.0s done
#10 DONE 0.0s

#11 [build 4/6] COPY zion-cryptonote/ /src/zion-cryptonote/
#11 CACHED

#12 [build 2/6] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&         apt-get install -y --no-install-recommends             build-essential cmake git pkg-config             libboost-all-dev libssl-dev libpthread-stubs0-dev libc6-dev libminiupnpc-dev &&         rm -rf /var/lib/apt/lists/*
#12 CACHED

#13 [build 3/6] WORKDIR /src
#13 CACHED

#14 [build 5/6] WORKDIR /src/zion-cryptonote
#14 CACHED

#15 [build 6/6] RUN cmake -S . -B build -DCMAKE_BUILD_TYPE=Release     && cmake --build build -j 2
#15 0.702 -- The C compiler identification is GNU 11.4.0
#15 1.060 -- The CXX compiler identification is GNU 11.4.0
#15 1.098 -- Detecting C compiler ABI info
#15 1.669 -- Detecting C compiler ABI info - done
#15 1.685 -- Check for working C compiler: /usr/bin/cc - skipped
#15 1.685 -- Detecting C compile features
#15 1.687 -- Detecting C compile features - done
#15 1.690 -- Detecting CXX compiler ABI info
#15 2.224 -- Detecting CXX compiler ABI info - done
#15 2.240 -- Check for working CXX compiler: /usr/bin/c++ - skipped
#15 2.241 -- Detecting CXX compile features
#15 2.241 -- Detecting CXX compile features - done
#15 2.247 -- Looking for pthread.h
#15 2.901 -- Looking for pthread.h - found
#15 2.902 -- Performing Test CMAKE_HAVE_LIBC_PTHREAD
#15 3.447 -- Performing Test CMAKE_HAVE_LIBC_PTHREAD - Success
#15 3.451 -- Found Threads: TRUE  
#15 3.485 -- Found Boost: /usr/include (found suitable version "1.74.0", minimum required is "1.55") found components: system filesystem date_time chrono regex serialization program_options 
#15 3.516 -- Found Git: /usr/bin/git
#15 3.522 -- External dependencies: minimal setup
#15 3.541 -- Configuring done
#15 3.607 -- Generating done
#15 3.610 -- Build files have been written to: /src/zion-cryptonote/build
#15 3.951 [  0%] Building CXX object src/CMakeFiles/BlockchainExplorer.dir/BlockchainExplorer/BlockchainExplorer.cpp.o
#15 4.015 fatal: not a git repository (or any of the parent directories): .git
#15 4.020 CMake Warning at src/version.cmake:3 (message):
#15 4.020   Cannot determine current revision.  Make sure that you are building either
#15 4.020   from a Git working tree or from a source archive.
#15 4.020 
#15 4.020 
#15 4.104 [  0%] Built target version
#15 4.383 [  0%] Building CXX object src/CMakeFiles/Common.dir/Common/Base58.cpp.o
#15 5.141 /src/zion-cryptonote/src/Common/Base58.cpp: In function 'uint64_t Tools::Base58::{anonymous}::uint_8be_to_64(const uint8_t*, size_t)':
#15 5.141 /src/zion-cryptonote/src/Common/Base58.cpp:87:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 5.141    87 |         case 1:            res |= *data++;
#15 5.141       |                            ~~~~^~~~~~~~~~
#15 5.142 /src/zion-cryptonote/src/Common/Base58.cpp:88:9: note: here
#15 5.142    88 |         case 2: res <<= 8; res |= *data++;
#15 5.142       |         ^~~~
#15 5.142 /src/zion-cryptonote/src/Common/Base58.cpp:88:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 5.142    88 |         case 2: res <<= 8; res |= *data++;
#15 5.142       |                            ~~~~^~~~~~~~~~
#15 5.142 /src/zion-cryptonote/src/Common/Base58.cpp:89:9: note: here
#15 5.142    89 |         case 3: res <<= 8; res |= *data++;
#15 5.142       |         ^~~~
#15 5.142 /src/zion-cryptonote/src/Common/Base58.cpp:89:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 5.142    89 |         case 3: res <<= 8; res |= *data++;
#15 5.142       |                            ~~~~^~~~~~~~~~
#15 5.142 /src/zion-cryptonote/src/Common/Base58.cpp:90:9: note: here
#15 5.142    90 |         case 4: res <<= 8; res |= *data++;
#15 5.142       |         ^~~~
#15 5.142 /src/zion-cryptonote/src/Common/Base58.cpp:90:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 5.142    90 |         case 4: res <<= 8; res |= *data++;
#15 5.142       |                            ~~~~^~~~~~~~~~
#15 5.142 /src/zion-cryptonote/src/Common/Base58.cpp:91:9: note: here
#15 5.142    91 |         case 5: res <<= 8; res |= *data++;
#15 5.142       |         ^~~~
#15 5.142 /src/zion-cryptonote/src/Common/Base58.cpp:91:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 5.142    91 |         case 5: res <<= 8; res |= *data++;
#15 5.142       |                            ~~~~^~~~~~~~~~
#15 5.142 /src/zion-cryptonote/src/Common/Base58.cpp:92:9: note: here
#15 5.142    92 |         case 6: res <<= 8; res |= *data++;
#15 5.142       |         ^~~~
#15 5.142 /src/zion-cryptonote/src/Common/Base58.cpp:92:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 5.142    92 |         case 6: res <<= 8; res |= *data++;
#15 5.142       |                            ~~~~^~~~~~~~~~
#15 5.142 /src/zion-cryptonote/src/Common/Base58.cpp:93:9: note: here
#15 5.142    93 |         case 7: res <<= 8; res |= *data++;
#15 5.142       |         ^~~~
#15 5.142 /src/zion-cryptonote/src/Common/Base58.cpp:93:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 5.142    93 |         case 7: res <<= 8; res |= *data++;
#15 5.142       |                            ~~~~^~~~~~~~~~
#15 5.142 /src/zion-cryptonote/src/Common/Base58.cpp:94:9: note: here
#15 5.142    94 |         case 8: res <<= 8; res |= *data; break;
#15 5.142       |         ^~~~
#15 5.884 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 5.884                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 5.884                  from /src/zion-cryptonote/include/INode.h:15,
#15 5.884                  from /src/zion-cryptonote/src/BlockchainExplorer/BlockchainExplorer.h:12,
#15 5.884                  from /src/zion-cryptonote/src/BlockchainExplorer/BlockchainExplorer.cpp:5:
#15 5.884 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 5.884 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 5.884    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 5.884       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 5.884 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 5.884    23 |   struct chacha8_key {
#15 5.884       |          ^~~~~~~~~~~
#15 5.985 [  1%] Building CXX object src/CMakeFiles/Common.dir/Common/BlockingQueue.cpp.o
#15 6.689 /src/zion-cryptonote/src/Common/BlockingQueue.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#15 6.689     8 | char suppressMSVCWarningLNK4221;
#15 6.689       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#15 6.811 [  1%] Building CXX object src/CMakeFiles/Common.dir/Common/CommandLine.cpp.o
#15 9.791 [  2%] Building CXX object src/CMakeFiles/Common.dir/Common/ConsoleHandler.cpp.o
#15 11.80 [  3%] Building CXX object src/CMakeFiles/BlockchainExplorer.dir/BlockchainExplorer/BlockchainExplorerDataBuilder.cpp.o
#15 13.70 [  3%] Building CXX object src/CMakeFiles/Common.dir/Common/ConsoleTools.cpp.o
#15 13.73 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 13.73                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 13.73                  from /src/zion-cryptonote/src/BlockchainExplorer/BlockchainExplorerDataBuilder.cpp:11:
#15 13.73 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 13.73 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 13.73    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 13.73       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 13.73 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 13.73    23 |   struct chacha8_key {
#15 13.73       |          ^~~~~~~~~~~
#15 15.20 [  4%] Building CXX object src/CMakeFiles/Common.dir/Common/IInputStream.cpp.o
#15 15.48 [  4%] Building CXX object src/CMakeFiles/Common.dir/Common/IOutputStream.cpp.o
#15 15.71 [  5%] Building CXX object src/CMakeFiles/Common.dir/Common/JsonValue.cpp.o
#15 16.91 [  5%] Building CXX object src/CMakeFiles/BlockchainExplorer.dir/BlockchainExplorer/BlockchainExplorerErrors.cpp.o
#15 18.01 [  6%] Linking CXX static library libBlockchainExplorer.a
#15 18.20 [  6%] Building CXX object src/CMakeFiles/Common.dir/Common/Math.cpp.o
#15 18.31 [  6%] Built target BlockchainExplorer
#15 18.53 [  6%] Building C object src/CMakeFiles/Crypto.dir/crypto/blake256.c.o
#15 18.57 /src/zion-cryptonote/src/Common/Math.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#15 18.57     8 | char suppressMSVCWarningLNK4221;
#15 18.57       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#15 18.67 [  7%] Building CXX object src/CMakeFiles/Common.dir/Common/MemoryInputStream.cpp.o
#15 19.32 [  8%] Building C object src/CMakeFiles/Crypto.dir/crypto/chacha8.c.o
#15 19.37 [  8%] Building CXX object src/CMakeFiles/Common.dir/Common/PathTools.cpp.o
#15 20.16 [  8%] Building C object src/CMakeFiles/Crypto.dir/crypto/crypto-ops-data.c.o
#15 20.39 [  9%] Building C object src/CMakeFiles/Crypto.dir/crypto/crypto-ops.c.o
#15 20.49 [ 10%] Building CXX object src/CMakeFiles/Common.dir/Common/ScopeExit.cpp.o
#15 21.13 [ 10%] Building CXX object src/CMakeFiles/Common.dir/Common/SignalHandler.cpp.o
#15 21.69 [ 10%] Building CXX object src/CMakeFiles/Crypto.dir/crypto/crypto.cpp.o
#15 22.15 [ 11%] Building CXX object src/CMakeFiles/Common.dir/Common/StdInputStream.cpp.o
#15 22.91 [ 12%] Building C object src/CMakeFiles/Crypto.dir/crypto/groestl.c.o
#15 22.99 [ 12%] Building CXX object src/CMakeFiles/Common.dir/Common/StdOutputStream.cpp.o
#15 23.67 [ 12%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash-extra-blake.c.o
#15 23.75 [ 13%] Building CXX object src/CMakeFiles/Common.dir/Common/StreamTools.cpp.o
#15 24.01 [ 14%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash-extra-groestl.c.o
#15 24.37 [ 14%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash-extra-jh.c.o
#15 24.52 /src/zion-cryptonote/src/crypto/hash-extra-jh.c: In function 'hash_extra_jh':
#15 24.53 /src/zion-cryptonote/src/crypto/hash-extra-jh.c:14:7: warning: unused variable 'r' [-Wunused-variable]
#15 24.53    14 |   int r = jh_hash(HASH_SIZE * 8, data, 8 * length, (uint8_t*)hash);
#15 24.53       |       ^
#15 24.72 [ 14%] Building CXX object src/CMakeFiles/Common.dir/Common/StringInputStream.cpp.o
#15 24.78 [ 15%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash-extra-skein.c.o
#15 24.94 /src/zion-cryptonote/src/crypto/hash-extra-skein.c: In function 'hash_extra_skein':
#15 24.94 /src/zion-cryptonote/src/crypto/hash-extra-skein.c:12:7: warning: unused variable 'r' [-Wunused-variable]
#15 24.94    12 |   int r = skein_hash(8 * HASH_SIZE, data, 8 * length, (uint8_t*)hash);
#15 24.94       |       ^
#15 25.18 [ 15%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash.c.o
#15 25.62 [ 16%] Building CXX object src/CMakeFiles/Common.dir/Common/StringOutputStream.cpp.o
#15 25.83 [ 17%] Building C object src/CMakeFiles/Crypto.dir/crypto/jh.c.o
#15 26.40 [ 17%] Building CXX object src/CMakeFiles/Common.dir/Common/StringTools.cpp.o
#15 26.63 [ 17%] Building C object src/CMakeFiles/Crypto.dir/crypto/keccak.c.o
#15 27.31 [ 18%] Building C object src/CMakeFiles/Crypto.dir/crypto/oaes_lib.c.o
#15 27.49 /src/zion-cryptonote/src/crypto/oaes_lib.c: In function 'oaes_get_seed':
#15 27.49 /src/zion-cryptonote/src/crypto/oaes_lib.c:490:9: warning: 'ftime' is deprecated: Use gettimeofday or clock_gettime instead [-Wdeprecated-declarations]
#15 27.49   490 |         ftime (&timer);
#15 27.49       |         ^~~~~
#15 27.49 In file included from /src/zion-cryptonote/src/crypto/oaes_lib.c:36:
#15 27.49 /usr/include/x86_64-linux-gnu/sys/timeb.h:29:12: note: declared here
#15 27.49    29 | extern int ftime (struct timeb *__timebuf)
#15 27.49       |            ^~~~~
#15 27.53 At top level:
#15 27.53 /src/zion-cryptonote/src/crypto/oaes_lib.c:30:19: warning: '_NR' defined but not used [-Wunused-const-variable=]
#15 27.53    30 | static const char _NR[] = {
#15 27.53       |                   ^~~
#15 28.06 [ 19%] Building CXX object src/CMakeFiles/Common.dir/Common/StringView.cpp.o
#15 28.41 [ 19%] Building C object src/CMakeFiles/Crypto.dir/crypto/random.c.o
#15 29.06 [ 20%] Building C object src/CMakeFiles/Crypto.dir/crypto/skein.c.o
#15 29.13 [ 21%] Building CXX object src/CMakeFiles/Common.dir/Common/Util.cpp.o
#15 30.12 [ 21%] Building C object src/CMakeFiles/Crypto.dir/crypto/slow-hash.c.o
#15 30.42 In file included from /src/zion-cryptonote/src/crypto/slow-hash.c:183:
#15 30.42 /src/zion-cryptonote/src/crypto/slow-hash.inl: In function 'cn_slow_hash_noaesni':
#15 30.42 /src/zion-cryptonote/src/crypto/slow-hash.inl:16:44: warning: unused variable 'b_x' [-Wunused-variable]
#15 30.42    16 |   __m128i *longoutput, *expkey, *xmminput, b_x;
#15 30.42       |                                            ^~~
#15 30.42 /src/zion-cryptonote/src/crypto/slow-hash.inl:16:12: warning: variable 'longoutput' set but not used [-Wunused-but-set-variable]
#15 30.42    16 |   __m128i *longoutput, *expkey, *xmminput, b_x;
#15 30.42       |            ^~~~~~~~~~
#15 31.14 [ 22%] Building CXX object src/CMakeFiles/Common.dir/Common/VectorOutputStream.cpp.o
#15 31.14 [ 22%] Building CXX object src/CMakeFiles/Crypto.dir/crypto/slow-hash.cpp.o
#15 31.53 /src/zion-cryptonote/src/crypto/slow-hash.cpp: In destructor 'Crypto::cn_context::~cn_context()':
#15 31.53 /src/zion-cryptonote/src/crypto/slow-hash.cpp:54:7: warning: 'throw' will always call 'terminate' [-Wterminate]
#15 31.53    54 |       throw bad_alloc();
#15 31.53       |       ^~~~~~~~~~~~~~~~~
#15 31.53 /src/zion-cryptonote/src/crypto/slow-hash.cpp:54:7: note: in C++11 destructors default to 'noexcept'
#15 31.87 [ 23%] Building C object src/CMakeFiles/Crypto.dir/crypto/tree-hash.c.o
#15 31.99 [ 24%] Linking CXX static library libCommon.a
#15 32.29 [ 24%] Built target Common
#15 32.51 [ 25%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Account.cpp.o
#15 32.60 [ 25%] Linking CXX static library libCrypto.a
#15 32.94 [ 25%] Built target Crypto
#15 33.18 [ 25%] Building CXX object src/CMakeFiles/Http.dir/HTTP/HttpParser.cpp.o
#15 33.65 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 33.65                  from /src/zion-cryptonote/src/CryptoNoteCore/Account.cpp:6:
#15 33.65 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 33.65 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 33.65    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 33.65       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 33.65 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 33.65    23 |   struct chacha8_key {
#15 33.65       |          ^~~~~~~~~~~
#15 34.12 [ 25%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/BlockIndex.cpp.o
#15 34.74 [ 26%] Building CXX object src/CMakeFiles/Http.dir/HTTP/HttpParserErrorCodes.cpp.o
#15 35.69 [ 26%] Building CXX object src/CMakeFiles/Http.dir/HTTP/HttpRequest.cpp.o
#15 35.78 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 35.78                  from /src/zion-cryptonote/src/CryptoNoteCore/BlockIndex.cpp:9:
#15 35.78 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 35.78 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 35.78    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 35.78       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 35.78 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 35.78    23 |   struct chacha8_key {
#15 35.78       |          ^~~~~~~~~~~
#15 36.57 /src/zion-cryptonote/src/CryptoNoteCore/BlockIndex.cpp: In member function 'std::vector<Crypto::Hash> CryptoNote::BlockIndex::buildSparseChain(const Crypto::Hash&) const':
#15 36.57 /src/zion-cryptonote/src/CryptoNoteCore/BlockIndex.cpp:51:66: warning: 'startBlockHeight' may be used uninitialized in this function [-Wmaybe-uninitialized]
#15 36.57    51 |     size_t sparseChainEnd = static_cast<size_t>(startBlockHeight + 1);
#15 36.57       |                                                 ~~~~~~~~~~~~~~~~~^~~
#15 36.75 [ 27%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Blockchain.cpp.o
#15 37.07 [ 28%] Building CXX object src/CMakeFiles/Http.dir/HTTP/HttpResponse.cpp.o
#15 38.53 [ 28%] Linking CXX static library libHttp.a
#15 38.78 [ 28%] Built target Http
#15 39.04 [ 29%] Building CXX object src/CMakeFiles/InProcessNode.dir/InProcessNode/InProcessNode.cpp.o
#15 39.30 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 39.30                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 39.30                  from /src/zion-cryptonote/src/CryptoNoteCore/Blockchain.h:21,
#15 39.30                  from /src/zion-cryptonote/src/CryptoNoteCore/Blockchain.cpp:5:
#15 39.30 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 39.30 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 39.30    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 39.30       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 39.30 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 39.30    23 |   struct chacha8_key {
#15 39.30       |          ^~~~~~~~~~~
#15 41.10 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 41.10                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 41.10                  from /src/zion-cryptonote/include/INode.h:15,
#15 41.10                  from /src/zion-cryptonote/src/InProcessNode/InProcessNode.h:7,
#15 41.10                  from /src/zion-cryptonote/src/InProcessNode/InProcessNode.cpp:5:
#15 41.10 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 41.10 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 41.10    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 41.10       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 41.10 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 41.10    23 |   struct chacha8_key {
#15 41.10       |          ^~~~~~~~~~~
#15 50.78 [ 29%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/BlockchainIndices.cpp.o
#15 51.43 [ 29%] Building CXX object src/CMakeFiles/InProcessNode.dir/InProcessNode/InProcessNodeErrors.cpp.o
#15 52.20 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 52.20                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#15 52.20                  from /src/zion-cryptonote/src/CryptoNoteCore/BlockchainIndices.cpp:8:
#15 52.20 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 52.20 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 52.20    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 52.20       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 52.20 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 52.20    23 |   struct chacha8_key {
#15 52.20       |          ^~~~~~~~~~~
#15 52.36 [ 30%] Linking CXX static library libInProcessNode.a
#15 52.71 [ 30%] Built target InProcessNode
#15 53.00 [ 30%] Building CXX object src/CMakeFiles/Logging.dir/Logging/CommonLogger.cpp.o
#15 53.73 [ 31%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/BlockchainMessages.cpp.o
#15 55.15 [ 31%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Checkpoints.cpp.o
#15 56.96 [ 32%] Building CXX object src/CMakeFiles/Logging.dir/Logging/ConsoleLogger.cpp.o
#15 57.83 [ 33%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Core.cpp.o
#15 59.77 [ 33%] Building CXX object src/CMakeFiles/Logging.dir/Logging/FileLogger.cpp.o
#15 60.74 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 60.74                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 60.74                  from /src/zion-cryptonote/src/CryptoNoteCore/Blockchain.h:21,
#15 60.74                  from /src/zion-cryptonote/src/CryptoNoteCore/Core.h:14,
#15 60.74                  from /src/zion-cryptonote/src/CryptoNoteCore/Core.cpp:5:
#15 60.74 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 60.74 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 60.74    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 60.74       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 60.74 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 60.74    23 |   struct chacha8_key {
#15 60.74       |          ^~~~~~~~~~~
#15 61.08 /src/zion-cryptonote/src/CryptoNoteCore/Core.cpp: In member function 'virtual std::unique_ptr<CryptoNote::IBlock> CryptoNote::core::getBlock(const Crypto::Hash&)':
#15 61.08 /src/zion-cryptonote/src/CryptoNoteCore/Core.cpp:981:19: warning: redundant move in return statement [-Wredundant-move]
#15 61.08   981 |   return std::move(blockPtr);
#15 61.08       |          ~~~~~~~~~^~~~~~~~~~
#15 61.08 /src/zion-cryptonote/src/CryptoNoteCore/Core.cpp:981:19: note: remove 'std::move' call
#15 62.42 [ 34%] Building CXX object src/CMakeFiles/Logging.dir/Logging/ILogger.cpp.o
#15 64.97 [ 34%] Building CXX object src/CMakeFiles/Logging.dir/Logging/LoggerGroup.cpp.o
#15 65.50 [ 34%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CoreConfig.cpp.o
#15 67.53 [ 35%] Building CXX object src/CMakeFiles/Logging.dir/Logging/LoggerManager.cpp.o
#15 67.95 [ 36%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteBasic.cpp.o
#15 69.36 [ 36%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteBasicImpl.cpp.o
#15 70.35 [ 37%] Building CXX object src/CMakeFiles/Logging.dir/Logging/LoggerMessage.cpp.o
#15 70.40 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 70.40                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 70.40                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteBasicImpl.cpp:6:
#15 70.40 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 70.40 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 70.40    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 70.40       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 70.40 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 70.40    23 |   struct chacha8_key {
#15 70.40       |          ^~~~~~~~~~~
#15 70.49 /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteBasicImpl.cpp: In function 'std::string CryptoNote::getAccountAddressAsStr(uint64_t, const CryptoNote::AccountPublicAddress&)':
#15 70.49 /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteBasicImpl.cpp:53:10: warning: unused variable 'r' [-Wunused-variable]
#15 70.49    53 |     bool r = toBinaryArray(adr, ba);
#15 70.49       |          ^
#15 71.18 [ 38%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteFormatUtils.cpp.o
#15 71.95 /src/zion-cryptonote/src/Logging/LoggerMessage.cpp: In constructor 'Logging::LoggerMessage::LoggerMessage(Logging::LoggerMessage&&)':
#15 71.95 /src/zion-cryptonote/src/Logging/LoggerMessage.cpp:65:11: warning: unused variable '_Pnext' [-Wunused-variable]
#15 71.95    65 |     char *_Pnext = pptr();
#15 71.95       |           ^~~~~~
#15 72.71 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 72.71                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 72.71                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.cpp:5:
#15 72.71 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 72.71 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 72.71    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 72.71       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 72.71 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 72.71    23 |   struct chacha8_key {
#15 72.71       |          ^~~~~~~~~~~
#15 73.36 [ 38%] Building CXX object src/CMakeFiles/Logging.dir/Logging/LoggerRef.cpp.o
#15 75.87 [ 39%] Building CXX object src/CMakeFiles/Logging.dir/Logging/StreamLogger.cpp.o
#15 76.24 [ 39%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteSerialization.cpp.o
#15 77.41 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 77.41                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.cpp:5:
#15 77.41 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 77.41 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 77.41    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 77.41       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 77.41 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 77.41    23 |   struct chacha8_key {
#15 77.41       |          ^~~~~~~~~~~
#15 78.53 [ 39%] Linking CXX static library libLogging.a
#15 78.81 [ 39%] Built target Logging
#15 79.06 [ 40%] Building CXX object src/CMakeFiles/NodeRpcProxy.dir/NodeRpcProxy/NodeErrors.cpp.o
#15 79.32 [ 41%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteTools.cpp.o
#15 79.92 [ 41%] Building CXX object src/CMakeFiles/NodeRpcProxy.dir/NodeRpcProxy/NodeRpcProxy.cpp.o
#15 80.40 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 80.40                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#15 80.40                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.cpp:5:
#15 80.40 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 80.40 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 80.40    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 80.40       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 80.40 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 80.40    23 |   struct chacha8_key {
#15 80.40       |          ^~~~~~~~~~~
#15 81.20 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 81.20                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 81.20                  from /src/zion-cryptonote/include/INode.h:15,
#15 81.20                  from /src/zion-cryptonote/src/NodeRpcProxy/NodeRpcProxy.h:15,
#15 81.20                  from /src/zion-cryptonote/src/NodeRpcProxy/NodeRpcProxy.cpp:5:
#15 81.20 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 81.20 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 81.20    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 81.20       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 81.20 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 81.20    23 |   struct chacha8_key {
#15 81.20       |          ^~~~~~~~~~~
#15 81.28 [ 41%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Currency.cpp.o
#15 83.32 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 83.32                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 83.32                  from /src/zion-cryptonote/src/CryptoNoteCore/Currency.cpp:15:
#15 83.32 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 83.32 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 83.32    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 83.32       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 83.32 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 83.32    23 |   struct chacha8_key {
#15 83.32       |          ^~~~~~~~~~~
#15 85.98 [ 42%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Difficulty.cpp.o
#15 86.50 [ 43%] Linking CXX static library libNodeRpcProxy.a
#15 86.86 [ 43%] Built target NodeRpcProxy
#15 87.06 [ 43%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/IBlock.cpp.o
#15 87.13 [ 44%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/HttpClient.cpp.o
#15 88.36 [ 45%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/ITimeProvider.cpp.o
#15 88.61 [ 45%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/HttpServer.cpp.o
#15 88.65 [ 45%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Miner.cpp.o
#15 91.43 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 91.43                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 91.43                  from /src/zion-cryptonote/src/CryptoNoteCore/Miner.cpp:24:
#15 91.43 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 91.43 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 91.43    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 91.43       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 91.43 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 91.43    23 |   struct chacha8_key {
#15 91.43       |          ^~~~~~~~~~~
#15 91.82 [ 46%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/JsonRpc.cpp.o
#15 93.12 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 93.12                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 93.12                  from /src/zion-cryptonote/src/Rpc/CoreRpcServerCommandsDefinitions.h:7,
#15 93.12                  from /src/zion-cryptonote/src/Rpc/JsonRpc.h:11,
#15 93.12                  from /src/zion-cryptonote/src/Rpc/JsonRpc.cpp:5:
#15 93.12 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 93.12 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 93.12    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 93.12       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 93.12 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 93.12    23 |   struct chacha8_key {
#15 93.12       |          ^~~~~~~~~~~
#15 94.46 [ 46%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/RpcServer.cpp.o
#15 94.90 [ 47%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/MinerConfig.cpp.o
#15 96.63 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 96.63                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 96.63                  from /src/zion-cryptonote/src/Rpc/CoreRpcServerCommandsDefinitions.h:7,
#15 96.63                  from /src/zion-cryptonote/src/Rpc/RpcServer.h:11,
#15 96.63                  from /src/zion-cryptonote/src/Rpc/RpcServer.cpp:5:
#15 96.63 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 96.63 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 96.63    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 96.63       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 96.63 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 96.63    23 |   struct chacha8_key {
#15 96.63       |          ^~~~~~~~~~~
#15 98.04 [ 47%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/SwappedMap.cpp.o
#15 99.45 /src/zion-cryptonote/src/CryptoNoteCore/SwappedMap.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#15 99.45     8 | char suppressMSVCWarningLNK4221;
#15 99.45       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#15 99.76 [ 48%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/SwappedVector.cpp.o
#15 100.5 /src/zion-cryptonote/src/CryptoNoteCore/SwappedVector.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#15 100.5     8 | char suppressMSVCWarningLNK4221;
#15 100.5       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#15 100.8 [ 48%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Transaction.cpp.o
#15 101.8 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 101.8                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 101.8                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionApiExtra.h:7,
#15 101.8                  from /src/zion-cryptonote/src/CryptoNoteCore/Transaction.cpp:6:
#15 101.8 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 101.8 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 101.8    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 101.8       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 101.8 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 101.8    23 |   struct chacha8_key {
#15 101.8       |          ^~~~~~~~~~~
#15 103.9 [ 49%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/RpcServerConfig.cpp.o
#15 104.7 [ 50%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/TransactionExtra.cpp.o
#15 105.8 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 105.8                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#15 105.8                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionExtra.cpp:10:
#15 105.8 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 105.8 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 105.8    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 105.8       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 105.8 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 105.8    23 |   struct chacha8_key {
#15 105.8       |          ^~~~~~~~~~~
#15 106.8 [ 51%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/TransactionPool.cpp.o
#15 107.2 [ 51%] Linking CXX static library libRpc.a
#15 107.5 [ 51%] Built target Rpc
#15 107.7 [ 51%] Building CXX object src/CMakeFiles/P2P.dir/CryptoNoteProtocol/CryptoNoteProtocolHandler.cpp.o
#15 109.3 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 109.3                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 109.3                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionPool.cpp:21:
#15 109.3 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 109.3 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 109.3    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 109.3       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 109.3 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 109.3    23 |   struct chacha8_key {
#15 109.3       |          ^~~~~~~~~~~
#15 109.5 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 109.5                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 109.5                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolHandler.h:13,
#15 109.5                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolHandler.cpp:5:
#15 109.5 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 109.5 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 109.5    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 109.5       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 109.5 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 109.5    23 |   struct chacha8_key {
#15 109.5       |          ^~~~~~~~~~~
#15 114.0 [ 51%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/TransactionPrefixImpl.cpp.o
#15 114.5 [ 52%] Building CXX object src/CMakeFiles/P2P.dir/P2p/IP2pNodeInternal.cpp.o
#15 115.1 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 115.1                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 115.1                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionApiExtra.h:7,
#15 115.1                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionPrefixImpl.cpp:12:
#15 115.1 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 115.1 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 115.1    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 115.1       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 115.1 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 115.1    23 |   struct chacha8_key {
#15 115.1       |          ^~~~~~~~~~~
#15 115.7 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 115.7                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#15 115.7                  from /src/zion-cryptonote/src/P2p/IP2pNodeInternal.h:8,
#15 115.7                  from /src/zion-cryptonote/src/P2p/IP2pNodeInternal.cpp:5:
#15 115.7 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 115.7 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 115.7    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 115.7       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 115.7 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 115.7    23 |   struct chacha8_key {
#15 115.7       |          ^~~~~~~~~~~
#15 116.1 [ 52%] Building CXX object src/CMakeFiles/P2P.dir/P2p/LevinProtocol.cpp.o
#15 116.7 [ 53%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/TransactionUtils.cpp.o
#15 117.6 [ 54%] Building CXX object src/CMakeFiles/P2P.dir/P2p/NetNode.cpp.o
#15 117.7 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 117.7                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 117.7                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionUtils.cpp:11:
#15 117.7 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 117.7 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 117.7    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 117.7       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 117.7 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 117.7    23 |   struct chacha8_key {
#15 117.7       |          ^~~~~~~~~~~
#15 118.7 [ 54%] Linking CXX static library libCryptoNoteCore.a
#15 119.1 [ 54%] Built target CryptoNoteCore
#15 119.3 [ 55%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/BinaryInputStreamSerializer.cpp.o
#15 120.0 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 120.0                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 120.0                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolHandler.h:13,
#15 120.0                  from /src/zion-cryptonote/src/P2p/NetNode.h:21,
#15 120.0                  from /src/zion-cryptonote/src/P2p/NetNode.cpp:5:
#15 120.0 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 120.0 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 120.0    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 120.0       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 120.0 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 120.0    23 |   struct chacha8_key {
#15 120.0       |          ^~~~~~~~~~~
#15 120.6 [ 55%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/BinaryOutputStreamSerializer.cpp.o
#15 121.5 [ 56%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/JsonInputStreamSerializer.cpp.o
#15 122.5 [ 57%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/JsonInputValueSerializer.cpp.o
#15 123.7 [ 57%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/JsonOutputStreamSerializer.cpp.o
#15 125.0 [ 58%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/KVBinaryInputStreamSerializer.cpp.o
#15 125.9 [ 58%] Building CXX object src/CMakeFiles/P2P.dir/P2p/NetNodeConfig.cpp.o
#15 126.0 [ 58%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/KVBinaryOutputStreamSerializer.cpp.o
#15 127.4 [ 59%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/MemoryStream.cpp.o
#15 127.9 [ 59%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/SerializationOverloads.cpp.o
#15 128.8 [ 60%] Linking CXX static library libSerialization.a
#15 129.1 [ 60%] Built target Serialization
#15 129.3 [ 61%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/Dispatcher.cpp.o
#15 129.6 [ 62%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pConnectionProxy.cpp.o
#15 129.8 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp: In constructor 'System::Dispatcher::Dispatcher()':
#15 129.8 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp:92:14: warning: unused variable 'result' [-Wunused-variable]
#15 129.8    92 |         auto result = close(remoteSpawnEvent);
#15 129.8       |              ^~~~~~
#15 129.8 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp:97:10: warning: unused variable 'result' [-Wunused-variable]
#15 129.8    97 |     auto result = close(epoll);
#15 129.8       |          ^~~~~~
#15 129.8 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp: In destructor 'System::Dispatcher::~Dispatcher()':
#15 129.8 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp:123:9: warning: unused variable 'result' [-Wunused-variable]
#15 129.8   123 |     int result = ::close(timers.top());
#15 129.8       |         ^~~~~~
#15 129.8 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp:128:8: warning: variable 'result' set but not used [-Wunused-but-set-variable]
#15 129.8   128 |   auto result = close(epoll);
#15 129.8       |        ^~~~~~
#15 130.8 [ 62%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/ErrorMessage.cpp.o
#15 131.5 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 131.5                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#15 131.5                  from /src/zion-cryptonote/src/P2p/IP2pNodeInternal.h:8,
#15 131.5                  from /src/zion-cryptonote/src/P2p/P2pConnectionProxy.h:9,
#15 131.5                  from /src/zion-cryptonote/src/P2p/P2pConnectionProxy.cpp:5:
#15 131.5 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 131.5 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 131.5    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 131.5       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 131.5 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 131.5    23 |   struct chacha8_key {
#15 131.5       |          ^~~~~~~~~~~
#15 131.6 [ 63%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/Ipv4Resolver.cpp.o
#15 133.0 [ 63%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/TcpConnection.cpp.o
#15 133.6 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp: In destructor 'System::TcpConnection::~TcpConnection()':
#15 133.6 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:37:9: warning: unused variable 'result' [-Wunused-variable]
#15 133.6    37 |     int result = close(connection);
#15 133.6       |         ^~~~~~
#15 133.6 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp: In member function 'size_t System::TcpConnection::read(uint8_t*, size_t)':
#15 133.6 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:73:26: warning: logical 'and' of equal expressions [-Wlogical-op]
#15 133.6    73 |     if (errno != EAGAIN  && errno != EWOULDBLOCK) {
#15 133.6       |                          ^
#15 133.7 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp: In member function 'std::size_t System::TcpConnection::write(const uint8_t*, size_t)':
#15 133.7 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:169:26: warning: logical 'and' of equal expressions [-Wlogical-op]
#15 133.7   169 |     if (errno != EAGAIN  && errno != EWOULDBLOCK) {
#15 133.7       |                          ^
#15 133.7 [ 63%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pContext.cpp.o
#15 134.4 [ 64%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/TcpConnector.cpp.o
#15 134.9 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnector.cpp: In member function 'System::TcpConnection System::TcpConnector::connect(const System::Ipv4Address&, uint16_t)':
#15 134.9 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnector.cpp:133:23: warning: unused variable 'result' [-Wunused-variable]
#15 134.9   133 |                   int result = close(connection);
#15 134.9       |                       ^~~~~~
#15 134.9 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnector.cpp:160:9: warning: unused variable 'result' [-Wunused-variable]
#15 134.9   160 |     int result = close(connection);
#15 134.9       |         ^~~~~~
#15 135.0 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 135.0                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#15 135.0                  from /src/zion-cryptonote/src/P2p/P2pContext.h:19,
#15 135.0                  from /src/zion-cryptonote/src/P2p/P2pContext.cpp:5:
#15 135.0 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 135.0 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 135.0    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 135.0       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 135.0 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 135.0    23 |   struct chacha8_key {
#15 135.0       |          ^~~~~~~~~~~
#15 135.5 [ 64%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/TcpListener.cpp.o
#15 135.8 [ 65%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pContextOwner.cpp.o
#15 136.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp: In constructor 'System::TcpListener::TcpListener(System::Dispatcher&, const System::Ipv4Address&, uint16_t)':
#15 136.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp:63:9: warning: unused variable 'result' [-Wunused-variable]
#15 136.0    63 |     int result = close(listener);
#15 136.0       |         ^~~~~~
#15 136.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp: In destructor 'System::TcpListener::~TcpListener()':
#15 136.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp:82:9: warning: unused variable 'result' [-Wunused-variable]
#15 136.0    82 |     int result = close(listener);
#15 136.0       |         ^~~~~~
#15 136.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp: In member function 'System::TcpConnection System::TcpListener::accept()':
#15 136.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp:176:11: warning: unused variable 'result' [-Wunused-variable]
#15 136.0   176 |       int result = close(connection);
#15 136.0       |           ^~~~~~
#15 136.6 [ 66%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/Timer.cpp.o
#15 137.0 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 137.0                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#15 137.0                  from /src/zion-cryptonote/src/P2p/P2pContext.h:19,
#15 137.0                  from /src/zion-cryptonote/src/P2p/P2pContextOwner.cpp:7:
#15 137.0 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 137.0 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 137.0    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 137.0       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 137.0 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 137.0    23 |   struct chacha8_key {
#15 137.0       |          ^~~~~~~~~~~
#15 137.1 /src/zion-cryptonote/src/Platform/Linux/System/Timer.cpp: In lambda function:
#15 137.1 /src/zion-cryptonote/src/Platform/Linux/System/Timer.cpp:92:32: warning: logical 'or' of equal expressions [-Wlogical-op]
#15 137.1    92 |             if(errno == EAGAIN || errno == EWOULDBLOCK) {
#15 137.1       |                                ^
#15 137.5 [ 66%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pInterfaces.cpp.o
#15 137.6 [ 66%] Building CXX object src/CMakeFiles/System.dir/System/ContextGroup.cpp.o
#15 138.4 [ 67%] Building CXX object src/CMakeFiles/System.dir/System/ContextGroupTimeout.cpp.o
#15 138.6 [ 68%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pNode.cpp.o
#15 139.1 [ 68%] Building CXX object src/CMakeFiles/System.dir/System/Event.cpp.o
#15 139.9 [ 69%] Building CXX object src/CMakeFiles/System.dir/System/EventLock.cpp.o
#15 140.4 [ 69%] Building CXX object src/CMakeFiles/System.dir/System/InterruptedException.cpp.o
#15 140.6 /src/zion-cryptonote/src/System/InterruptedException.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#15 140.6     8 | char suppressMSVCWarningLNK4221;
#15 140.6       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#15 140.7 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 140.7                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#15 140.7                  from /src/zion-cryptonote/src/P2p/IP2pNodeInternal.h:8,
#15 140.7                  from /src/zion-cryptonote/src/P2p/P2pNode.h:17,
#15 140.7                  from /src/zion-cryptonote/src/P2p/P2pNode.cpp:5:
#15 140.7 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 140.7 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 140.7    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 140.7       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 140.7 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 140.7    23 |   struct chacha8_key {
#15 140.7       |          ^~~~~~~~~~~
#15 140.7 [ 70%] Building CXX object src/CMakeFiles/System.dir/System/Ipv4Address.cpp.o
#15 141.2 /src/zion-cryptonote/src/System/Ipv4Address.cpp: In member function 'bool System::Ipv4Address::isPrivate() const':
#15 141.2 /src/zion-cryptonote/src/System/Ipv4Address.cpp:107:26: warning: comparison of integer expressions of different signedness: 'unsigned int' and 'int' [-Wsign-compare]
#15 141.2   107 |     (value & 0xfff00000) == ((172 << 24) | (16 << 16)) ||
#15 141.2       |     ~~~~~~~~~~~~~~~~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 141.2 /src/zion-cryptonote/src/System/Ipv4Address.cpp:109:26: warning: comparison of integer expressions of different signedness: 'unsigned int' and 'int' [-Wsign-compare]
#15 141.2   109 |     (value & 0xffff0000) == ((192 << 24) | (168 << 16));
#15 141.2       |     ~~~~~~~~~~~~~~~~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 141.7 [ 70%] Building CXX object src/CMakeFiles/System.dir/System/RemoteEventLock.cpp.o
#15 142.8 [ 71%] Building CXX object src/CMakeFiles/System.dir/System/TcpStream.cpp.o
#15 143.3 [ 71%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pNodeConfig.cpp.o
#15 143.9 [ 72%] Linking CXX static library libSystem.a
#15 144.1 [ 72%] Built target System
#15 144.3 [ 72%] Building CXX object src/CMakeFiles/Transfers.dir/Transfers/BlockchainSynchronizer.cpp.o
#15 145.7 [ 73%] Building CXX object src/CMakeFiles/P2P.dir/P2p/PeerListManager.cpp.o
#15 145.7 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 145.7                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 145.7                  from /src/zion-cryptonote/include/INode.h:15,
#15 145.7                  from /src/zion-cryptonote/src/Transfers/BlockchainSynchronizer.h:7,
#15 145.7                  from /src/zion-cryptonote/src/Transfers/BlockchainSynchronizer.cpp:5:
#15 145.7 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 145.7 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 145.7    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 145.7       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 145.7 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 145.7    23 |   struct chacha8_key {
#15 145.7       |          ^~~~~~~~~~~
#15 148.3 [ 74%] Linking CXX static library libP2P.a
#15 148.6 [ 74%] Built target P2P
#15 148.8 [ 75%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/LegacyKeysImporter.cpp.o
#15 148.9 [ 76%] Building CXX object src/CMakeFiles/Transfers.dir/Transfers/SynchronizationState.cpp.o
#15 150.1 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 150.1                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 150.1                  from /src/zion-cryptonote/include/INode.h:15,
#15 150.1                  from /src/zion-cryptonote/src/Transfers/CommonTypes.h:13,
#15 150.1                  from /src/zion-cryptonote/src/Transfers/SynchronizationState.h:7,
#15 150.1                  from /src/zion-cryptonote/src/Transfers/SynchronizationState.cpp:5:
#15 150.1 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 150.1 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 150.1    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 150.1       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 150.1 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 150.1    23 |   struct chacha8_key {
#15 150.1       |          ^~~~~~~~~~~
#15 150.3 /src/zion-cryptonote/src/Transfers/SynchronizationState.cpp: In member function 'void CryptoNote::SynchronizationState::addBlocks(const Crypto::Hash*, uint32_t, uint32_t)':
#15 150.3 /src/zion-cryptonote/src/Transfers/SynchronizationState.cpp:84:8: warning: unused variable 'size' [-Wunused-variable]
#15 150.3    84 |   auto size = m_blockchain.size();
#15 150.3       |        ^~~~
#15 150.8 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 150.8                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#15 150.8                  from /src/zion-cryptonote/src/Wallet/LegacyKeysImporter.cpp:14:
#15 150.8 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 150.8 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 150.8    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 150.8       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 150.8 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 150.8    23 |   struct chacha8_key {
#15 150.8       |          ^~~~~~~~~~~
#15 151.2 [ 76%] Building CXX object src/CMakeFiles/Transfers.dir/Transfers/TransfersConsumer.cpp.o
#15 152.1 [ 76%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/WalletAsyncContextCounter.cpp.o
#15 153.1 [ 77%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/WalletErrors.cpp.o
#15 153.4 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 153.4                  from /src/zion-cryptonote/src/Transfers/TransfersContainer.h:19,
#15 153.4                  from /src/zion-cryptonote/src/Transfers/TransfersSubscription.h:8,
#15 153.4                  from /src/zion-cryptonote/src/Transfers/TransfersConsumer.h:9,
#15 153.4                  from /src/zion-cryptonote/src/Transfers/TransfersConsumer.cpp:5:
#15 153.4 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 153.4 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 153.4    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 153.4       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 153.4 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 153.4    23 |   struct chacha8_key {
#15 153.4       |          ^~~~~~~~~~~
#15 154.2 [ 77%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/WalletGreen.cpp.o
#15 156.5 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 156.5                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 156.5                  from /src/zion-cryptonote/include/INode.h:15,
#15 156.5                  from /src/zion-cryptonote/src/Transfers/BlockchainSynchronizer.h:7,
#15 156.5                  from /src/zion-cryptonote/src/Wallet/WalletGreen.h:18,
#15 156.5                  from /src/zion-cryptonote/src/Wallet/WalletGreen.cpp:5:
#15 156.5 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 156.5 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 156.5    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 156.5       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 156.5 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 156.5    23 |   struct chacha8_key {
#15 156.5       |          ^~~~~~~~~~~
#15 157.6 /src/zion-cryptonote/src/Wallet/WalletGreen.cpp: In member function 'bool CryptoNote::WalletGreen::updateWalletTransactionInfo(size_t, const CryptoNote::TransactionInformation&, int64_t)':
#15 157.6 /src/zion-cryptonote/src/Wallet/WalletGreen.cpp:971:8: warning: unused variable 'r' [-Wunused-variable]
#15 157.6   971 |   bool r = txIdIndex.modify(it, [&info, totalAmount, &updated](WalletTransaction& transaction) {
#15 157.6       |        ^
#15 157.8 /src/zion-cryptonote/src/Wallet/WalletGreen.cpp: In member function 'virtual void CryptoNote::WalletGreen::onTransactionUpdated(const Crypto::PublicKey&, const Crypto::Hash&, const std::vector<CryptoNote::ITransfersContainer*>&)':
#15 157.8 /src/zion-cryptonote/src/Wallet/WalletGreen.cpp:1800:10: warning: unused variable 'found' [-Wunused-variable]
#15 157.8  1800 |     bool found = container->getTransactionInformation(transactionHash, info, &inputsAmount, &outputsAmount);
#15 157.8       |          ^~~~~
#15 157.9 /src/zion-cryptonote/src/Wallet/WalletGreen.cpp: In member function 'virtual size_t CryptoNote::WalletGreen::createFusionTransaction(uint64_t, uint64_t)':
#15 157.9 /src/zion-cryptonote/src/Wallet/WalletGreen.cpp:2092:12: warning: variable 'transactionAmount' set but not used [-Wunused-but-set-variable]
#15 157.9  2092 |   uint64_t transactionAmount;
#15 157.9       |            ^~~~~~~~~~~~~~~~~
#15 158.0 [ 78%] Building CXX object src/CMakeFiles/Transfers.dir/Transfers/TransfersContainer.cpp.o
#15 160.2 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 160.2                  from /src/zion-cryptonote/src/Transfers/TransfersContainer.h:19,
#15 160.2                  from /src/zion-cryptonote/src/Transfers/TransfersContainer.cpp:5:
#15 160.2 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 160.2 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 160.2    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 160.2       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 160.2 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 160.2    23 |   struct chacha8_key {
#15 160.2       |          ^~~~~~~~~~~
#15 166.1 [ 78%] Building CXX object src/CMakeFiles/Transfers.dir/Transfers/TransfersSubscription.cpp.o
#15 168.0 [ 79%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/WalletRpcServer.cpp.o
#15 168.5 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 168.5                  from /src/zion-cryptonote/src/Transfers/TransfersContainer.h:19,
#15 168.5                  from /src/zion-cryptonote/src/Transfers/TransfersSubscription.h:8,
#15 168.5                  from /src/zion-cryptonote/src/Transfers/TransfersSubscription.cpp:5:
#15 168.5 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 168.5 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 168.5    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 168.5       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 168.5 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 168.5    23 |   struct chacha8_key {
#15 168.5       |          ^~~~~~~~~~~
#15 170.1 [ 80%] Building CXX object src/CMakeFiles/Transfers.dir/Transfers/TransfersSynchronizer.cpp.o
#15 170.4 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 170.4                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 170.4                  from /src/zion-cryptonote/src/Wallet/WalletRpcServerCommandsDefinitions.h:6,
#15 170.4                  from /src/zion-cryptonote/src/Wallet/WalletRpcServer.h:10,
#15 170.4                  from /src/zion-cryptonote/src/Wallet/WalletRpcServer.cpp:5:
#15 170.4 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 170.4 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 170.4    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 170.4       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 170.4 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 170.4    23 |   struct chacha8_key {
#15 170.4       |          ^~~~~~~~~~~
#15 172.6 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 172.6                  from /src/zion-cryptonote/src/Transfers/TransfersContainer.h:19,
#15 172.6                  from /src/zion-cryptonote/src/Transfers/TransfersSubscription.h:8,
#15 172.6                  from /src/zion-cryptonote/src/Transfers/TransfersConsumer.h:9,
#15 172.6                  from /src/zion-cryptonote/src/Transfers/TransfersSynchronizer.cpp:6:
#15 172.6 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 172.6 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 172.6    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 172.6       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 172.6 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 172.6    23 |   struct chacha8_key {
#15 172.6       |          ^~~~~~~~~~~
#15 175.1 [ 80%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/WalletSerialization.cpp.o
#15 175.3 [ 80%] Linking CXX static library libTransfers.a
#15 175.6 [ 80%] Built target Transfers
#15 175.8 [ 80%] Building CXX object src/CMakeFiles/PaymentGate.dir/PaymentGate/NodeFactory.cpp.o
#15 176.8 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 176.8                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 176.8                  from /src/zion-cryptonote/include/INode.h:15,
#15 176.8                  from /src/zion-cryptonote/src/PaymentGate/NodeFactory.h:7,
#15 176.8                  from /src/zion-cryptonote/src/PaymentGate/NodeFactory.cpp:5:
#15 176.8 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 176.8 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 176.8    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 176.8       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 176.8 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 176.8    23 |   struct chacha8_key {
#15 176.8       |          ^~~~~~~~~~~
#15 176.9 In file included from /src/zion-cryptonote/src/Wallet/WalletSerialization.h:14,
#15 176.9                  from /src/zion-cryptonote/src/Wallet/WalletSerialization.cpp:5:
#15 176.9 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 176.9 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 176.9    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 176.9       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 176.9 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 176.9    23 |   struct chacha8_key {
#15 176.9       |          ^~~~~~~~~~~
#15 177.0 /src/zion-cryptonote/src/Wallet/WalletSerialization.cpp: In member function 'void CryptoNote::WalletSerializer::subscribeWallets()':
#15 177.0 /src/zion-cryptonote/src/Wallet/WalletSerialization.cpp:712:10: warning: unused variable 'r' [-Wunused-variable]
#15 177.0   712 |     bool r = index.modify(it, [&subscription] (WalletRecord& rec) { rec.container = &subscription.getContainer(); });
#15 177.0       |          ^
#15 177.0 /src/zion-cryptonote/src/Wallet/WalletSerialization.cpp: In member function 'void CryptoNote::WalletSerializer::loadUnlockTransactionsJobs(Common::IInputStream&, CryptoNote::CryptoContext&)':
#15 177.0 /src/zion-cryptonote/src/Wallet/WalletSerialization.cpp:753:18: warning: unused variable 'walletsSize' [-Wunused-variable]
#15 177.0   753 |   const uint64_t walletsSize = walletsIndex.size();
#15 177.0       |                  ^~~~~~~~~~~
#15 178.3 [ 81%] Building CXX object src/CMakeFiles/PaymentGate.dir/PaymentGate/PaymentServiceJsonRpcMessages.cpp.o
#15 179.6 /src/zion-cryptonote/src/Wallet/WalletSerialization.cpp: In member function 'void CryptoNote::WalletSerializer::loadWallets(Common::IInputStream&, CryptoNote::CryptoContext&)':
#15 179.6 /src/zion-cryptonote/src/Wallet/WalletSerialization.cpp:667:74: warning: 'isTrackingMode' may be used uninitialized in this function [-Wmaybe-uninitialized]
#15 179.6   667 |     } else if ((isTrackingMode && dto.spendSecretKey != NULL_SECRET_KEY) || (!isTrackingMode && dto.spendSecretKey == NULL_SECRET_KEY)) {
#15 179.6       |                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 180.0 [ 81%] Building CXX object src/CMakeFiles/PaymentGate.dir/PaymentGate/PaymentServiceJsonRpcServer.cpp.o
#15 180.2 [ 82%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/WalletUtils.cpp.o
#15 182.3 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 182.3                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 182.3                  from /src/zion-cryptonote/include/INode.h:15,
#15 182.3                  from /src/zion-cryptonote/src/PaymentGate/WalletService.h:11,
#15 182.3                  from /src/zion-cryptonote/src/PaymentGate/PaymentServiceJsonRpcServer.cpp:10:
#15 182.3 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 182.3 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 182.3    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 182.3       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 182.3 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 182.3    23 |   struct chacha8_key {
#15 182.3       |          ^~~~~~~~~~~
#15 183.0 [ 82%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/KeysStorage.cpp.o
#15 184.2 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 184.2                  from /src/zion-cryptonote/src/WalletLegacy/KeysStorage.cpp:10:
#15 184.2 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 184.2 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 184.2    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 184.2       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 184.2 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 184.2    23 |   struct chacha8_key {
#15 184.2       |          ^~~~~~~~~~~
#15 184.7 [ 83%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/WalletHelper.cpp.o
#15 186.0 [ 84%] Building CXX object src/CMakeFiles/PaymentGate.dir/PaymentGate/WalletFactory.cpp.o
#15 187.3 [ 84%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/WalletLegacy.cpp.o
#15 187.8 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 187.8                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 187.8                  from /src/zion-cryptonote/include/INode.h:15,
#15 187.8                  from /src/zion-cryptonote/src/PaymentGate/WalletFactory.h:8,
#15 187.8                  from /src/zion-cryptonote/src/PaymentGate/WalletFactory.cpp:5:
#15 187.8 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 187.8 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 187.8    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 187.8       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 187.8 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 187.8    23 |   struct chacha8_key {
#15 187.8       |          ^~~~~~~~~~~
#15 189.0 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 189.0                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 189.0                  from /src/zion-cryptonote/include/INode.h:15,
#15 189.0                  from /src/zion-cryptonote/src/WalletLegacy/WalletLegacy.h:14,
#15 189.0                  from /src/zion-cryptonote/src/WalletLegacy/WalletLegacy.cpp:5:
#15 189.0 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 189.0 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 189.0    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 189.0       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 189.0 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 189.0    23 |   struct chacha8_key {
#15 189.0       |          ^~~~~~~~~~~
#15 189.9 [ 84%] Building CXX object src/CMakeFiles/PaymentGate.dir/PaymentGate/WalletService.cpp.o
#15 191.7 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 191.7                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 191.7                  from /src/zion-cryptonote/include/INode.h:15,
#15 191.7                  from /src/zion-cryptonote/src/PaymentGate/WalletService.h:11,
#15 191.7                  from /src/zion-cryptonote/src/PaymentGate/WalletService.cpp:5:
#15 191.7 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 191.7 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 191.7    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 191.7       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 191.7 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 191.7    23 |   struct chacha8_key {
#15 191.7       |          ^~~~~~~~~~~
#15 192.4 [ 85%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/WalletLegacySerialization.cpp.o
#15 192.6 /src/zion-cryptonote/src/PaymentGate/WalletService.cpp: In function 'Crypto::Hash PaymentService::{anonymous}::parsePaymentId(const string&)':
#15 192.6 /src/zion-cryptonote/src/PaymentGate/WalletService.cpp:68:8: warning: unused variable 'r' [-Wunused-variable]
#15 192.6    68 |   bool r = Common::podFromHex(paymentIdStr, paymentId);
#15 192.6       |        ^
#15 193.9 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 193.9                  from /src/zion-cryptonote/src/WalletLegacy/WalletLegacySerialization.cpp:9:
#15 193.9 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 193.9 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 193.9    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 193.9       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 193.9 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 193.9    23 |   struct chacha8_key {
#15 193.9       |          ^~~~~~~~~~~
#15 194.5 [ 85%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/WalletLegacySerializer.cpp.o
#15 195.4 In file included from /src/zion-cryptonote/src/WalletLegacy/WalletLegacySerializer.h:12,
#15 195.4                  from /src/zion-cryptonote/src/WalletLegacy/WalletLegacySerializer.cpp:5:
#15 195.4 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 195.4 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 195.4    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 195.4       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 195.4 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 195.4    23 |   struct chacha8_key {
#15 195.4       |          ^~~~~~~~~~~
#15 196.3 [ 86%] Building CXX object src/CMakeFiles/PaymentGate.dir/PaymentGate/WalletServiceErrorCategory.cpp.o
#15 196.5 [ 87%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/WalletTransactionSender.cpp.o
#15 197.1 [ 87%] Linking CXX static library libPaymentGate.a
#15 197.4 [ 87%] Built target PaymentGate
#15 197.6 [ 87%] Building CXX object src/CMakeFiles/JsonRpcServer.dir/JsonRpcServer/JsonRpcServer.cpp.o
#15 198.0 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 198.0                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 198.0                  from /src/zion-cryptonote/src/WalletLegacy/WalletTransactionSender.cpp:7:
#15 198.0 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 198.0 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 198.0    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 198.0       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 198.0 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 198.0    23 |   struct chacha8_key {
#15 198.0       |          ^~~~~~~~~~~
#15 200.4 [ 88%] Linking CXX static library libJsonRpcServer.a
#15 200.7 [ 88%] Built target JsonRpcServer
#15 200.9 [ 88%] Building CXX object src/CMakeFiles/ConnectivityTool.dir/ConnectivityTool/ConnectivityTool.cpp.o
#15 201.3 [ 88%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/WalletUnconfirmedTransactions.cpp.o
#15 202.7 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 202.7                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#15 202.7                  from /src/zion-cryptonote/src/WalletLegacy/WalletUnconfirmedTransactions.cpp:8:
#15 202.7 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 202.7 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 202.7    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 202.7       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 202.7 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 202.7    23 |   struct chacha8_key {
#15 202.7       |          ^~~~~~~~~~~
#15 203.1 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 203.1                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#15 203.1                  from /src/zion-cryptonote/src/ConnectivityTool/ConnectivityTool.cpp:22:
#15 203.1 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 203.1 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 203.1    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 203.1       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 203.1 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 203.1    23 |   struct chacha8_key {
#15 203.1       |          ^~~~~~~~~~~
#15 203.2 /src/zion-cryptonote/src/ConnectivityTool/ConnectivityTool.cpp: At global scope:
#15 203.2 /src/zion-cryptonote/src/ConnectivityTool/ConnectivityTool.cpp:46:173: warning: narrowing conversion of '(const char*)""' from 'const char*' to 'bool' [-Wnarrowing]
#15 203.2    46 |   const command_line::arg_descriptor<bool>        arg_get_daemon_info    = {"rpc_get_daemon_info", "request daemon state info vie rpc (--rpc_port option should be set ).", "", true};
#15 203.2       |                                                                                                                                                                             ^~
#15 204.3 [ 89%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/WalletUserTransactionsCache.cpp.o
#15 206.7 [ 90%] Linking CXX executable zion_connectivity_tool
#15 207.1 [ 90%] Built target ConnectivityTool
#15 207.2 [ 91%] Linking CXX static library libWallet.a
#15 207.3 [ 92%] Building CXX object src/CMakeFiles/Daemon.dir/Daemon/Daemon.cpp.o
#15 207.5 [ 92%] Built target Wallet
#15 207.7 [ 93%] Building CXX object src/CMakeFiles/Miner.dir/Miner/BlockchainMonitor.cpp.o
#15 209.9 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 209.9                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 209.9                  from /src/zion-cryptonote/src/Rpc/CoreRpcServerCommandsDefinitions.h:7,
#15 209.9                  from /src/zion-cryptonote/src/Miner/BlockchainMonitor.cpp:13:
#15 209.9 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 209.9 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 209.9    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 209.9       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 209.9 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 209.9    23 |   struct chacha8_key {
#15 209.9       |          ^~~~~~~~~~~
#15 210.5 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 210.5                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 210.5                  from /src/zion-cryptonote/src/CryptoNoteCore/Blockchain.h:21,
#15 210.5                  from /src/zion-cryptonote/src/CryptoNoteCore/Core.h:14,
#15 210.5                  from /src/zion-cryptonote/src/Daemon/Daemon.cpp:15:
#15 210.5 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 210.5 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 210.5    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 210.5       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 210.5 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 210.5    23 |   struct chacha8_key {
#15 210.5       |          ^~~~~~~~~~~
#15 211.6 [ 93%] Building CXX object src/CMakeFiles/Miner.dir/Miner/Miner.cpp.o
#15 214.1 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 214.1                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 214.1                  from /src/zion-cryptonote/src/Miner/Miner.cpp:10:
#15 214.1 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 214.1 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 214.1    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 214.1       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 214.1 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 214.1    23 |   struct chacha8_key {
#15 214.1       |          ^~~~~~~~~~~
#15 215.4 [ 93%] Building CXX object src/CMakeFiles/Daemon.dir/Daemon/DaemonCommandsHandler.cpp.o
#15 216.6 [ 94%] Building CXX object src/CMakeFiles/Miner.dir/Miner/MinerManager.cpp.o
#15 218.0 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 218.0                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 218.0                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolHandler.h:13,
#15 218.0                  from /src/zion-cryptonote/src/P2p/NetNode.h:21,
#15 218.0                  from /src/zion-cryptonote/src/Daemon/DaemonCommandsHandler.cpp:7:
#15 218.0 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 218.0 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 218.0    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 218.0       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 218.0 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 218.0    23 |   struct chacha8_key {
#15 218.0       |          ^~~~~~~~~~~
#15 218.8 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 218.8                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#15 218.8                  from /src/zion-cryptonote/src/Miner/MinerManager.cpp:13:
#15 218.8 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 218.8 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 218.8    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 218.8       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 218.8 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 218.8    23 |   struct chacha8_key {
#15 218.8       |          ^~~~~~~~~~~
#15 220.8 [ 94%] Building CXX object src/CMakeFiles/Miner.dir/Miner/MiningConfig.cpp.o
#15 221.7 [ 95%] Linking CXX executable ziond
#15 222.7 [ 95%] Built target Daemon
#15 222.8 [ 96%] Building CXX object src/CMakeFiles/Miner.dir/Miner/main.cpp.o
#15 225.9 [ 96%] Building CXX object src/CMakeFiles/SimpleWallet.dir/SimpleWallet/PasswordContainer.cpp.o
#15 226.4 [ 96%] Linking CXX executable zion_miner
#15 226.8 [ 96%] Built target Miner
#15 226.9 [ 97%] Building CXX object src/CMakeFiles/SimpleWallet.dir/SimpleWallet/SimpleWallet.cpp.o
#15 227.0 [ 98%] Building CXX object src/CMakeFiles/PaymentGateService.dir/PaymentGateService/ConfigurationManager.cpp.o
#15 229.2 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 229.2                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 229.2                  from /src/zion-cryptonote/include/INode.h:15,
#15 229.2                  from /src/zion-cryptonote/src/NodeRpcProxy/NodeRpcProxy.h:15,
#15 229.2                  from /src/zion-cryptonote/src/SimpleWallet/SimpleWallet.h:20,
#15 229.2                  from /src/zion-cryptonote/src/SimpleWallet/SimpleWallet.cpp:5:
#15 229.2 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 229.2 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 229.2    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 229.2       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 229.2 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 229.2    23 |   struct chacha8_key {
#15 229.2       |          ^~~~~~~~~~~
#15 229.5 In file included from /usr/include/boost/smart_ptr/detail/sp_thread_sleep.hpp:22,
#15 229.5                  from /usr/include/boost/smart_ptr/detail/yield_k.hpp:23,
#15 229.5                  from /usr/include/boost/smart_ptr/detail/spinlock_gcc_atomic.hpp:14,
#15 229.5                  from /usr/include/boost/smart_ptr/detail/spinlock.hpp:42,
#15 229.5                  from /usr/include/boost/smart_ptr/detail/spinlock_pool.hpp:25,
#15 229.5                  from /usr/include/boost/smart_ptr/shared_ptr.hpp:29,
#15 229.5                  from /usr/include/boost/shared_ptr.hpp:17,
#15 229.5                  from /usr/include/boost/program_options/variables_map.hpp:13,
#15 229.5                  from /src/zion-cryptonote/src/SimpleWallet/SimpleWallet.h:12,
#15 229.5                  from /src/zion-cryptonote/src/SimpleWallet/SimpleWallet.cpp:5:
#15 229.5 /usr/include/boost/bind.hpp: At global scope:
#15 229.5 /usr/include/boost/bind.hpp:36:1: note: '#pragma message: The practice of declaring the Bind placeholders (_1, _2, ...) in the global namespace is deprecated. Please use <boost/bind/bind.hpp> + using namespace boost::placeholders, or define BOOST_BIND_GLOBAL_PLACEHOLDERS to retain the current behavior.'
#15 229.5    36 | BOOST_PRAGMA_MESSAGE(
#15 229.5       | ^~~~~~~~~~~~~~~~~~~~
#15 230.1 [ 98%] Building CXX object src/CMakeFiles/PaymentGateService.dir/PaymentGateService/PaymentGateService.cpp.o
#15 233.8 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 233.8                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 233.8                  from /src/zion-cryptonote/include/INode.h:15,
#15 233.8                  from /src/zion-cryptonote/src/PaymentGate/NodeFactory.h:7,
#15 233.8                  from /src/zion-cryptonote/src/PaymentGateService/PaymentGateService.h:14,
#15 233.8                  from /src/zion-cryptonote/src/PaymentGateService/PaymentGateService.cpp:5:
#15 233.8 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 233.8 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 233.8    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 233.8       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 233.8 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 233.8    23 |   struct chacha8_key {
#15 233.8       |          ^~~~~~~~~~~
#15 238.7 [ 98%] Linking CXX executable zion_wallet
#15 239.6 [ 98%] Built target SimpleWallet
#15 239.7 [ 99%] Building CXX object src/CMakeFiles/PaymentGateService.dir/PaymentGateService/PaymentServiceConfiguration.cpp.o
#15 240.4 [ 99%] Building CXX object src/CMakeFiles/PaymentGateService.dir/PaymentGateService/RpcNodeConfiguration.cpp.o
#15 243.8 [100%] Building CXX object src/CMakeFiles/PaymentGateService.dir/PaymentGateService/main.cpp.o
#15 246.1 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 246.1                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 246.1                  from /src/zion-cryptonote/include/INode.h:15,
#15 246.1                  from /src/zion-cryptonote/src/PaymentGate/NodeFactory.h:7,
#15 246.1                  from /src/zion-cryptonote/src/PaymentGateService/PaymentGateService.h:14,
#15 246.1                  from /src/zion-cryptonote/src/PaymentGateService/main.cpp:11:
#15 246.1 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 246.1 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 246.1    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 246.1       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 246.1 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 246.1    23 |   struct chacha8_key {
#15 246.1       |          ^~~~~~~~~~~
#15 247.5 [100%] Linking CXX executable zion_walletd
#15 248.1 /usr/bin/ld: libP2P.a(NetNode.cpp.o): in function `CryptoNote::NodeServer::init(CryptoNote::NetNodeConfig const&)':
#15 248.1 NetNode.cpp:(.text+0x5361): undefined reference to `upnpDiscover'
#15 248.1 /usr/bin/ld: NetNode.cpp:(.text+0x5387): undefined reference to `UPNP_GetValidIGD'
#15 248.1 /usr/bin/ld: NetNode.cpp:(.text+0x5395): undefined reference to `freeUPNPDevlist'
#15 248.1 /usr/bin/ld: NetNode.cpp:(.text+0x5409): undefined reference to `FreeUPNPUrls'
#15 248.1 /usr/bin/ld: NetNode.cpp:(.text+0x57ae): undefined reference to `UPNP_AddPortMapping'
#15 248.1 collect2: error: ld returned 1 exit status
#15 248.1 gmake[2]: *** [src/CMakeFiles/PaymentGateService.dir/build.make:184: src/zion_walletd] Error 1
#15 248.2 gmake[1]: *** [CMakeFiles/Makefile2:724: src/CMakeFiles/PaymentGateService.dir/all] Error 2
#15 248.2 gmake: *** [Makefile:101: all] Error 2
#15 ERROR: process "/bin/sh -c cmake -S . -B build -DCMAKE_BUILD_TYPE=Release     && cmake --build build -j 2" did not complete successfully: exit code: 2
------
 > [build 6/6] RUN cmake -S . -B build -DCMAKE_BUILD_TYPE=Release     && cmake --build build -j 2:
libP2P.a(NetNode.cpp.o): in function `CryptoNote::NodeServer::init(CryptoNote::NetNodeConfig const&)':
248.1 NetNode.cpp:(.text+0x5361): undefined reference to `upnpDiscover'
248.1 /usr/bin/ld: NetNode.cpp:(.text+0x5387): undefined reference to `UPNP_GetValidIGD'
248.1 /usr/bin/ld: NetNode.cpp:(.text+0x5395): undefined reference to `freeUPNPDevlist'
248.1 /usr/bin/ld: NetNode.cpp:(.text+0x5409): undefined reference to `FreeUPNPUrls'
248.1 /usr/bin/ld: NetNode.cpp:(.text+0x57ae): undefined reference to `UPNP_AddPortMapping'
248.1 collect2: error: ld returned 1 exit status
248.1 gmake[2]: *** [src/CMakeFiles/PaymentGateService.dir/build.make:184: src/zion_walletd] Error 1
248.2 gmake[1]: *** [CMakeFiles/Makefile2:724: src/CMakeFiles/PaymentGateService.dir/all] Error 2
248.2 gmake: *** [Makefile:101: all] Error 2
------

 [33m2 warnings found (use docker --debug to expand):
[0m - FromPlatformFlagConstDisallowed: FROM --platform flag should not use constant value "linux/amd64" (line 3)
 - FromPlatformFlagConstDisallowed: FROM --platform flag should not use constant value "linux/amd64" (line 20)
Dockerfile.zion-cryptonote:17
--------------------
  16 |     WORKDIR /src/zion-cryptonote
  17 | >>> RUN cmake -S . -B build -DCMAKE_BUILD_TYPE=Release \
  18 | >>>     && cmake --build build -j 2
  19 |     
--------------------
ERROR: failed to build: failed to solve: process "/bin/sh -c cmake -S . -B build -DCMAKE_BUILD_TYPE=Release     && cmake --build build -j 2" did not complete successfully: exit code: 2
\n### Rebuild after linking miniupnpc for walletd pá 19. září 2025 10:45:54 UTC
#0 building with "desktop-linux" instance using docker driver

#1 [internal] load build definition from Dockerfile.zion-cryptonote
#1 transferring dockerfile: 1.43kB done
#1 DONE 0.0s

#2 resolve image config for docker-image://docker.io/docker/dockerfile:1
#2 ...

#3 [auth] docker/dockerfile:pull token for registry-1.docker.io
#3 DONE 0.0s

#2 resolve image config for docker-image://docker.io/docker/dockerfile:1
#2 DONE 1.3s

#4 docker-image://docker.io/docker/dockerfile:1@sha256:dabfc0969b935b2080555ace70ee69a5261af8a8f1b4df97b9e7fbcf6722eddf
#4 resolve docker.io/docker/dockerfile:1@sha256:dabfc0969b935b2080555ace70ee69a5261af8a8f1b4df97b9e7fbcf6722eddf 0.0s done
#4 CACHED

#5 [auth] library/ubuntu:pull token for registry-1.docker.io
#5 DONE 0.0s

#6 [internal] load metadata for docker.io/library/ubuntu:22.04
#6 DONE 0.7s

#7 [internal] load .dockerignore
#7 transferring context: 333B done
#7 DONE 0.0s

#8 [build 1/6] FROM docker.io/library/ubuntu:22.04@sha256:4e0171b9275e12d375863f2b3ae9ce00a4c53ddda176bd55868df97ac6f21a6e
#8 resolve docker.io/library/ubuntu:22.04@sha256:4e0171b9275e12d375863f2b3ae9ce00a4c53ddda176bd55868df97ac6f21a6e done
#8 DONE 0.0s

#9 [stage-1 2/4] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&             apt-get install -y --no-install-recommends                 libboost-all-dev libc6 procps miniupnpc &&         rm -rf /var/lib/apt/lists/*
#9 CACHED

#10 [internal] load build context
#10 transferring context: 75.83kB 0.0s done
#10 DONE 0.0s

#11 [build 2/6] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&         apt-get install -y --no-install-recommends             build-essential cmake git pkg-config             libboost-all-dev libssl-dev libpthread-stubs0-dev libc6-dev libminiupnpc-dev &&         rm -rf /var/lib/apt/lists/*
#11 CACHED

#12 [build 3/6] WORKDIR /src
#12 CACHED

#13 [build 4/6] COPY zion-cryptonote/ /src/zion-cryptonote/
#13 DONE 0.3s

#14 [build 5/6] WORKDIR /src/zion-cryptonote
#14 DONE 0.0s

#15 [build 6/6] RUN cmake -S . -B build -DCMAKE_BUILD_TYPE=Release     && cmake --build build -j 2
#15 0.669 -- The C compiler identification is GNU 11.4.0
#15 1.004 -- The CXX compiler identification is GNU 11.4.0
#15 1.035 -- Detecting C compiler ABI info
#15 1.600 -- Detecting C compiler ABI info - done
#15 1.615 -- Check for working C compiler: /usr/bin/cc - skipped
#15 1.616 -- Detecting C compile features
#15 1.617 -- Detecting C compile features - done
#15 1.620 -- Detecting CXX compiler ABI info
#15 2.177 -- Detecting CXX compiler ABI info - done
#15 2.192 -- Check for working CXX compiler: /usr/bin/c++ - skipped
#15 2.192 -- Detecting CXX compile features
#15 2.193 -- Detecting CXX compile features - done
#15 2.199 -- Looking for pthread.h
#15 2.774 -- Looking for pthread.h - found
#15 2.774 -- Performing Test CMAKE_HAVE_LIBC_PTHREAD
#15 3.352 -- Performing Test CMAKE_HAVE_LIBC_PTHREAD - Success
#15 3.354 -- Found Threads: TRUE  
#15 3.395 -- Found Boost: /usr/include (found suitable version "1.74.0", minimum required is "1.55") found components: system filesystem date_time chrono regex serialization program_options 
#15 3.427 -- Found Git: /usr/bin/git
#15 3.432 -- External dependencies: minimal setup
#15 3.444 -- Configuring done
#15 3.506 -- Generating done
#15 3.508 -- Build files have been written to: /src/zion-cryptonote/build
#15 3.858 [  0%] Building CXX object src/CMakeFiles/BlockchainExplorer.dir/BlockchainExplorer/BlockchainExplorer.cpp.o
#15 3.922 fatal: not a git repository (or any of the parent directories): .git
#15 3.928 CMake Warning at src/version.cmake:3 (message):
#15 3.928   Cannot determine current revision.  Make sure that you are building either
#15 3.928   from a Git working tree or from a source archive.
#15 3.928 
#15 3.929 
#15 4.052 [  0%] Built target version
#15 4.321 [  0%] Building CXX object src/CMakeFiles/Common.dir/Common/Base58.cpp.o
#15 4.982 /src/zion-cryptonote/src/Common/Base58.cpp: In function 'uint64_t Tools::Base58::{anonymous}::uint_8be_to_64(const uint8_t*, size_t)':
#15 4.982 /src/zion-cryptonote/src/Common/Base58.cpp:87:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 4.982    87 |         case 1:            res |= *data++;
#15 4.982       |                            ~~~~^~~~~~~~~~
#15 4.982 /src/zion-cryptonote/src/Common/Base58.cpp:88:9: note: here
#15 4.982    88 |         case 2: res <<= 8; res |= *data++;
#15 4.982       |         ^~~~
#15 4.982 /src/zion-cryptonote/src/Common/Base58.cpp:88:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 4.982    88 |         case 2: res <<= 8; res |= *data++;
#15 4.982       |                            ~~~~^~~~~~~~~~
#15 4.982 /src/zion-cryptonote/src/Common/Base58.cpp:89:9: note: here
#15 4.982    89 |         case 3: res <<= 8; res |= *data++;
#15 4.982       |         ^~~~
#15 4.982 /src/zion-cryptonote/src/Common/Base58.cpp:89:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 4.982    89 |         case 3: res <<= 8; res |= *data++;
#15 4.982       |                            ~~~~^~~~~~~~~~
#15 4.982 /src/zion-cryptonote/src/Common/Base58.cpp:90:9: note: here
#15 4.982    90 |         case 4: res <<= 8; res |= *data++;
#15 4.982       |         ^~~~
#15 4.982 /src/zion-cryptonote/src/Common/Base58.cpp:90:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 4.982    90 |         case 4: res <<= 8; res |= *data++;
#15 4.982       |                            ~~~~^~~~~~~~~~
#15 4.982 /src/zion-cryptonote/src/Common/Base58.cpp:91:9: note: here
#15 4.982    91 |         case 5: res <<= 8; res |= *data++;
#15 4.982       |         ^~~~
#15 4.982 /src/zion-cryptonote/src/Common/Base58.cpp:91:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 4.982    91 |         case 5: res <<= 8; res |= *data++;
#15 4.982       |                            ~~~~^~~~~~~~~~
#15 4.982 /src/zion-cryptonote/src/Common/Base58.cpp:92:9: note: here
#15 4.982    92 |         case 6: res <<= 8; res |= *data++;
#15 4.982       |         ^~~~
#15 4.982 /src/zion-cryptonote/src/Common/Base58.cpp:92:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 4.982    92 |         case 6: res <<= 8; res |= *data++;
#15 4.982       |                            ~~~~^~~~~~~~~~
#15 4.982 /src/zion-cryptonote/src/Common/Base58.cpp:93:9: note: here
#15 4.982    93 |         case 7: res <<= 8; res |= *data++;
#15 4.982       |         ^~~~
#15 4.982 /src/zion-cryptonote/src/Common/Base58.cpp:93:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#15 4.982    93 |         case 7: res <<= 8; res |= *data++;
#15 4.982       |                            ~~~~^~~~~~~~~~
#15 4.982 /src/zion-cryptonote/src/Common/Base58.cpp:94:9: note: here
#15 4.982    94 |         case 8: res <<= 8; res |= *data; break;
#15 4.982       |         ^~~~
#15 5.579 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 5.579                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 5.579                  from /src/zion-cryptonote/include/INode.h:15,
#15 5.579                  from /src/zion-cryptonote/src/BlockchainExplorer/BlockchainExplorer.h:12,
#15 5.579                  from /src/zion-cryptonote/src/BlockchainExplorer/BlockchainExplorer.cpp:5:
#15 5.579 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 5.579 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 5.579    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 5.579       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 5.579 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 5.579    23 |   struct chacha8_key {
#15 5.579       |          ^~~~~~~~~~~
#15 5.734 [  1%] Building CXX object src/CMakeFiles/Common.dir/Common/BlockingQueue.cpp.o
#15 6.352 /src/zion-cryptonote/src/Common/BlockingQueue.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#15 6.352     8 | char suppressMSVCWarningLNK4221;
#15 6.352       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#15 6.494 [  1%] Building CXX object src/CMakeFiles/Common.dir/Common/CommandLine.cpp.o
#15 9.289 [  2%] Building CXX object src/CMakeFiles/Common.dir/Common/ConsoleHandler.cpp.o
#15 10.90 [  3%] Building CXX object src/CMakeFiles/BlockchainExplorer.dir/BlockchainExplorer/BlockchainExplorerDataBuilder.cpp.o
#15 12.76 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 12.76                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 12.76                  from /src/zion-cryptonote/src/BlockchainExplorer/BlockchainExplorerDataBuilder.cpp:11:
#15 12.76 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 12.76 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 12.76    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 12.76       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 12.76 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 12.76    23 |   struct chacha8_key {
#15 12.76       |          ^~~~~~~~~~~
#15 13.14 [  3%] Building CXX object src/CMakeFiles/Common.dir/Common/ConsoleTools.cpp.o
#15 14.08 [  4%] Building CXX object src/CMakeFiles/Common.dir/Common/IInputStream.cpp.o
#15 14.33 [  4%] Building CXX object src/CMakeFiles/Common.dir/Common/IOutputStream.cpp.o
#15 14.87 [  5%] Building CXX object src/CMakeFiles/Common.dir/Common/JsonValue.cpp.o
#15 15.57 [  5%] Building CXX object src/CMakeFiles/BlockchainExplorer.dir/BlockchainExplorer/BlockchainExplorerErrors.cpp.o
#15 16.46 [  6%] Linking CXX static library libBlockchainExplorer.a
#15 16.79 [  6%] Built target BlockchainExplorer
#15 17.04 [  6%] Building C object src/CMakeFiles/Crypto.dir/crypto/blake256.c.o
#15 17.18 [  6%] Building CXX object src/CMakeFiles/Common.dir/Common/Math.cpp.o
#15 17.56 /src/zion-cryptonote/src/Common/Math.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#15 17.56     8 | char suppressMSVCWarningLNK4221;
#15 17.56       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#15 17.67 [  7%] Building CXX object src/CMakeFiles/Common.dir/Common/MemoryInputStream.cpp.o
#15 17.93 [  8%] Building C object src/CMakeFiles/Crypto.dir/crypto/chacha8.c.o
#15 18.34 [  8%] Building CXX object src/CMakeFiles/Common.dir/Common/PathTools.cpp.o
#15 18.56 [  8%] Building C object src/CMakeFiles/Crypto.dir/crypto/crypto-ops-data.c.o
#15 18.78 [  9%] Building C object src/CMakeFiles/Crypto.dir/crypto/crypto-ops.c.o
#15 19.25 [ 10%] Building CXX object src/CMakeFiles/Common.dir/Common/ScopeExit.cpp.o
#15 19.82 [ 10%] Building CXX object src/CMakeFiles/Common.dir/Common/SignalHandler.cpp.o
#15 20.04 [ 10%] Building CXX object src/CMakeFiles/Crypto.dir/crypto/crypto.cpp.o
#15 20.79 [ 11%] Building CXX object src/CMakeFiles/Common.dir/Common/StdInputStream.cpp.o
#15 21.25 [ 12%] Building C object src/CMakeFiles/Crypto.dir/crypto/groestl.c.o
#15 21.54 [ 12%] Building CXX object src/CMakeFiles/Common.dir/Common/StdOutputStream.cpp.o
#15 21.96 [ 12%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash-extra-blake.c.o
#15 22.34 [ 13%] Building CXX object src/CMakeFiles/Common.dir/Common/StreamTools.cpp.o
#15 22.37 [ 14%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash-extra-groestl.c.o
#15 22.79 [ 14%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash-extra-jh.c.o
#15 22.96 /src/zion-cryptonote/src/crypto/hash-extra-jh.c: In function 'hash_extra_jh':
#15 22.96 /src/zion-cryptonote/src/crypto/hash-extra-jh.c:14:7: warning: unused variable 'r' [-Wunused-variable]
#15 22.96    14 |   int r = jh_hash(HASH_SIZE * 8, data, 8 * length, (uint8_t*)hash);
#15 22.96       |       ^
#15 23.23 [ 15%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash-extra-skein.c.o
#15 23.42 /src/zion-cryptonote/src/crypto/hash-extra-skein.c: In function 'hash_extra_skein':
#15 23.42 /src/zion-cryptonote/src/crypto/hash-extra-skein.c:12:7: warning: unused variable 'r' [-Wunused-variable]
#15 23.42    12 |   int r = skein_hash(8 * HASH_SIZE, data, 8 * length, (uint8_t*)hash);
#15 23.42       |       ^
#15 23.49 [ 15%] Building CXX object src/CMakeFiles/Common.dir/Common/StringInputStream.cpp.o
#15 23.67 [ 15%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash.c.o
#15 24.11 [ 16%] Building C object src/CMakeFiles/Crypto.dir/crypto/jh.c.o
#15 24.17 [ 17%] Building CXX object src/CMakeFiles/Common.dir/Common/StringOutputStream.cpp.o
#15 24.89 [ 17%] Building C object src/CMakeFiles/Crypto.dir/crypto/keccak.c.o
#15 24.93 [ 17%] Building CXX object src/CMakeFiles/Common.dir/Common/StringTools.cpp.o
#15 25.56 [ 18%] Building C object src/CMakeFiles/Crypto.dir/crypto/oaes_lib.c.o
#15 25.72 /src/zion-cryptonote/src/crypto/oaes_lib.c: In function 'oaes_get_seed':
#15 25.72 /src/zion-cryptonote/src/crypto/oaes_lib.c:490:9: warning: 'ftime' is deprecated: Use gettimeofday or clock_gettime instead [-Wdeprecated-declarations]
#15 25.72   490 |         ftime (&timer);
#15 25.72       |         ^~~~~
#15 25.72 In file included from /src/zion-cryptonote/src/crypto/oaes_lib.c:36:
#15 25.72 /usr/include/x86_64-linux-gnu/sys/timeb.h:29:12: note: declared here
#15 25.72    29 | extern int ftime (struct timeb *__timebuf)
#15 25.72       |            ^~~~~
#15 25.75 At top level:
#15 25.75 /src/zion-cryptonote/src/crypto/oaes_lib.c:30:19: warning: '_NR' defined but not used [-Wunused-const-variable=]
#15 25.75    30 | static const char _NR[] = {
#15 25.75       |                   ^~~
#15 26.31 [ 19%] Building CXX object src/CMakeFiles/Common.dir/Common/StringView.cpp.o
#15 26.45 [ 19%] Building C object src/CMakeFiles/Crypto.dir/crypto/random.c.o
#15 27.08 [ 20%] Building C object src/CMakeFiles/Crypto.dir/crypto/skein.c.o
#15 27.34 [ 21%] Building CXX object src/CMakeFiles/Common.dir/Common/Util.cpp.o
#15 28.10 [ 21%] Building C object src/CMakeFiles/Crypto.dir/crypto/slow-hash.c.o
#15 28.35 In file included from /src/zion-cryptonote/src/crypto/slow-hash.c:183:
#15 28.35 /src/zion-cryptonote/src/crypto/slow-hash.inl: In function 'cn_slow_hash_noaesni':
#15 28.35 /src/zion-cryptonote/src/crypto/slow-hash.inl:16:44: warning: unused variable 'b_x' [-Wunused-variable]
#15 28.35    16 |   __m128i *longoutput, *expkey, *xmminput, b_x;
#15 28.35       |                                            ^~~
#15 28.35 /src/zion-cryptonote/src/crypto/slow-hash.inl:16:12: warning: variable 'longoutput' set but not used [-Wunused-but-set-variable]
#15 28.35    16 |   __m128i *longoutput, *expkey, *xmminput, b_x;
#15 28.35       |            ^~~~~~~~~~
#15 28.96 [ 22%] Building CXX object src/CMakeFiles/Crypto.dir/crypto/slow-hash.cpp.o
#15 29.12 [ 22%] Building CXX object src/CMakeFiles/Common.dir/Common/VectorOutputStream.cpp.o
#15 29.25 /src/zion-cryptonote/src/crypto/slow-hash.cpp: In destructor 'Crypto::cn_context::~cn_context()':
#15 29.25 /src/zion-cryptonote/src/crypto/slow-hash.cpp:54:7: warning: 'throw' will always call 'terminate' [-Wterminate]
#15 29.25    54 |       throw bad_alloc();
#15 29.25       |       ^~~~~~~~~~~~~~~~~
#15 29.25 /src/zion-cryptonote/src/crypto/slow-hash.cpp:54:7: note: in C++11 destructors default to 'noexcept'
#15 29.57 [ 23%] Building C object src/CMakeFiles/Crypto.dir/crypto/tree-hash.c.o
#15 29.84 [ 24%] Linking CXX static library libCommon.a
#15 30.11 [ 24%] Built target Common
#15 30.18 [ 24%] Linking CXX static library libCrypto.a
#15 30.32 [ 25%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Account.cpp.o
#15 30.47 [ 25%] Built target Crypto
#15 30.68 [ 25%] Building CXX object src/CMakeFiles/Http.dir/HTTP/HttpParser.cpp.o
#15 31.23 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 31.23                  from /src/zion-cryptonote/src/CryptoNoteCore/Account.cpp:6:
#15 31.23 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 31.23 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 31.23    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 31.23       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 31.24 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 31.24    23 |   struct chacha8_key {
#15 31.24       |          ^~~~~~~~~~~
#15 31.66 [ 25%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/BlockIndex.cpp.o
#15 32.08 [ 26%] Building CXX object src/CMakeFiles/Http.dir/HTTP/HttpParserErrorCodes.cpp.o
#15 33.07 [ 26%] Building CXX object src/CMakeFiles/Http.dir/HTTP/HttpRequest.cpp.o
#15 33.26 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 33.26                  from /src/zion-cryptonote/src/CryptoNoteCore/BlockIndex.cpp:9:
#15 33.26 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 33.26 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 33.26    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 33.26       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 33.26 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 33.26    23 |   struct chacha8_key {
#15 33.26       |          ^~~~~~~~~~~
#15 34.05 /src/zion-cryptonote/src/CryptoNoteCore/BlockIndex.cpp: In member function 'std::vector<Crypto::Hash> CryptoNote::BlockIndex::buildSparseChain(const Crypto::Hash&) const':
#15 34.05 /src/zion-cryptonote/src/CryptoNoteCore/BlockIndex.cpp:51:66: warning: 'startBlockHeight' may be used uninitialized in this function [-Wmaybe-uninitialized]
#15 34.05    51 |     size_t sparseChainEnd = static_cast<size_t>(startBlockHeight + 1);
#15 34.05       |                                                 ~~~~~~~~~~~~~~~~~^~~
#15 34.20 [ 27%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Blockchain.cpp.o
#15 34.44 [ 28%] Building CXX object src/CMakeFiles/Http.dir/HTTP/HttpResponse.cpp.o
#15 35.85 [ 28%] Linking CXX static library libHttp.a
#15 36.16 [ 28%] Built target Http
#15 36.35 [ 29%] Building CXX object src/CMakeFiles/InProcessNode.dir/InProcessNode/InProcessNode.cpp.o
#15 36.68 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 36.68                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 36.68                  from /src/zion-cryptonote/src/CryptoNoteCore/Blockchain.h:21,
#15 36.68                  from /src/zion-cryptonote/src/CryptoNoteCore/Blockchain.cpp:5:
#15 36.68 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 36.68 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 36.68    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 36.68       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 36.68 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 36.68    23 |   struct chacha8_key {
#15 36.68       |          ^~~~~~~~~~~
#15 38.31 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 38.31                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 38.31                  from /src/zion-cryptonote/include/INode.h:15,
#15 38.31                  from /src/zion-cryptonote/src/InProcessNode/InProcessNode.h:7,
#15 38.31                  from /src/zion-cryptonote/src/InProcessNode/InProcessNode.cpp:5:
#15 38.31 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 38.31 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 38.31    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 38.31       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 38.31 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 38.31    23 |   struct chacha8_key {
#15 38.31       |          ^~~~~~~~~~~
#15 46.31 [ 29%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/BlockchainIndices.cpp.o
#15 46.64 [ 29%] Building CXX object src/CMakeFiles/InProcessNode.dir/InProcessNode/InProcessNodeErrors.cpp.o
#15 47.78 [ 30%] Linking CXX static library libInProcessNode.a
#15 47.87 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 47.87                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#15 47.87                  from /src/zion-cryptonote/src/CryptoNoteCore/BlockchainIndices.cpp:8:
#15 47.87 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 47.87 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 47.87    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 47.87       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 47.87 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 47.87    23 |   struct chacha8_key {
#15 47.87       |          ^~~~~~~~~~~
#15 48.10 [ 30%] Built target InProcessNode
#15 48.30 [ 30%] Building CXX object src/CMakeFiles/Logging.dir/Logging/CommonLogger.cpp.o
#15 49.35 [ 31%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/BlockchainMessages.cpp.o
#15 50.69 [ 31%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Checkpoints.cpp.o
#15 52.53 [ 32%] Building CXX object src/CMakeFiles/Logging.dir/Logging/ConsoleLogger.cpp.o
#15 53.60 [ 33%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Core.cpp.o
#15 55.07 [ 33%] Building CXX object src/CMakeFiles/Logging.dir/Logging/FileLogger.cpp.o
#15 56.45 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 56.45                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 56.45                  from /src/zion-cryptonote/src/CryptoNoteCore/Blockchain.h:21,
#15 56.45                  from /src/zion-cryptonote/src/CryptoNoteCore/Core.h:14,
#15 56.45                  from /src/zion-cryptonote/src/CryptoNoteCore/Core.cpp:5:
#15 56.45 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 56.45 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 56.45    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 56.45       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 56.45 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 56.45    23 |   struct chacha8_key {
#15 56.45       |          ^~~~~~~~~~~
#15 56.83 /src/zion-cryptonote/src/CryptoNoteCore/Core.cpp: In member function 'virtual std::unique_ptr<CryptoNote::IBlock> CryptoNote::core::getBlock(const Crypto::Hash&)':
#15 56.83 /src/zion-cryptonote/src/CryptoNoteCore/Core.cpp:981:19: warning: redundant move in return statement [-Wredundant-move]
#15 56.83   981 |   return std::move(blockPtr);
#15 56.83       |          ~~~~~~~~~^~~~~~~~~~
#15 56.83 /src/zion-cryptonote/src/CryptoNoteCore/Core.cpp:981:19: note: remove 'std::move' call
#15 58.05 [ 34%] Building CXX object src/CMakeFiles/Logging.dir/Logging/ILogger.cpp.o
#15 60.57 [ 34%] Building CXX object src/CMakeFiles/Logging.dir/Logging/LoggerGroup.cpp.o
#15 61.49 [ 34%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CoreConfig.cpp.o
#15 63.39 [ 35%] Building CXX object src/CMakeFiles/Logging.dir/Logging/LoggerManager.cpp.o
#15 64.14 [ 36%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteBasic.cpp.o
#15 65.50 [ 36%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteBasicImpl.cpp.o
#15 66.50 [ 37%] Building CXX object src/CMakeFiles/Logging.dir/Logging/LoggerMessage.cpp.o
#15 66.76 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 66.76                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 66.76                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteBasicImpl.cpp:6:
#15 66.76 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 66.76 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 66.76    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 66.76       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 66.76 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 66.76    23 |   struct chacha8_key {
#15 66.76       |          ^~~~~~~~~~~
#15 66.85 /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteBasicImpl.cpp: In function 'std::string CryptoNote::getAccountAddressAsStr(uint64_t, const CryptoNote::AccountPublicAddress&)':
#15 66.85 /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteBasicImpl.cpp:53:10: warning: unused variable 'r' [-Wunused-variable]
#15 66.85    53 |     bool r = toBinaryArray(adr, ba);
#15 66.85       |          ^
#15 67.68 [ 38%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteFormatUtils.cpp.o
#15 68.39 /src/zion-cryptonote/src/Logging/LoggerMessage.cpp: In constructor 'Logging::LoggerMessage::LoggerMessage(Logging::LoggerMessage&&)':
#15 68.39 /src/zion-cryptonote/src/Logging/LoggerMessage.cpp:65:11: warning: unused variable '_Pnext' [-Wunused-variable]
#15 68.39    65 |     char *_Pnext = pptr();
#15 68.39       |           ^~~~~~
#15 69.13 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 69.13                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 69.13                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.cpp:5:
#15 69.13 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 69.13 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 69.13    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 69.13       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 69.13 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 69.13    23 |   struct chacha8_key {
#15 69.13       |          ^~~~~~~~~~~
#15 69.51 [ 38%] Building CXX object src/CMakeFiles/Logging.dir/Logging/LoggerRef.cpp.o
#15 71.84 [ 39%] Building CXX object src/CMakeFiles/Logging.dir/Logging/StreamLogger.cpp.o
#15 72.10 [ 39%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteSerialization.cpp.o
#15 73.03 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 73.03                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.cpp:5:
#15 73.03 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 73.03 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 73.03    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 73.03       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 73.03 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 73.03    23 |   struct chacha8_key {
#15 73.03       |          ^~~~~~~~~~~
#15 74.25 [ 39%] Linking CXX static library libLogging.a
#15 74.76 [ 39%] Built target Logging
#15 74.97 [ 40%] Building CXX object src/CMakeFiles/NodeRpcProxy.dir/NodeRpcProxy/NodeErrors.cpp.o
#15 75.18 [ 41%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteTools.cpp.o
#15 75.95 [ 41%] Building CXX object src/CMakeFiles/NodeRpcProxy.dir/NodeRpcProxy/NodeRpcProxy.cpp.o
#15 76.34 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 76.34                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#15 76.34                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.cpp:5:
#15 76.34 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 76.34 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 76.34    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 76.34       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 76.34 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 76.34    23 |   struct chacha8_key {
#15 76.34       |          ^~~~~~~~~~~
#15 77.12 [ 41%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Currency.cpp.o
#15 77.14 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 77.14                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 77.14                  from /src/zion-cryptonote/include/INode.h:15,
#15 77.14                  from /src/zion-cryptonote/src/NodeRpcProxy/NodeRpcProxy.h:15,
#15 77.14                  from /src/zion-cryptonote/src/NodeRpcProxy/NodeRpcProxy.cpp:5:
#15 77.14 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 77.14 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 77.14    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 77.14       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 77.14 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 77.14    23 |   struct chacha8_key {
#15 77.14       |          ^~~~~~~~~~~
#15 79.16 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 79.16                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 79.16                  from /src/zion-cryptonote/src/CryptoNoteCore/Currency.cpp:15:
#15 79.16 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 79.16 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 79.16    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 79.16       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 79.16 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 79.16    23 |   struct chacha8_key {
#15 79.16       |          ^~~~~~~~~~~
#15 81.42 [ 42%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Difficulty.cpp.o
#15 81.94 [ 43%] Linking CXX static library libNodeRpcProxy.a
#15 82.27 [ 43%] Built target NodeRpcProxy
#15 82.29 [ 43%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/IBlock.cpp.o
#15 82.48 [ 44%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/HttpClient.cpp.o
#15 83.44 [ 45%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/ITimeProvider.cpp.o
#15 83.68 [ 45%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Miner.cpp.o
#15 83.78 [ 45%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/HttpServer.cpp.o
#15 86.26 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 86.26                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 86.26                  from /src/zion-cryptonote/src/CryptoNoteCore/Miner.cpp:24:
#15 86.26 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 86.26 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 86.26    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 86.26       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 86.26 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 86.26    23 |   struct chacha8_key {
#15 86.26       |          ^~~~~~~~~~~
#15 86.87 [ 46%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/JsonRpc.cpp.o
#15 88.04 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 88.04                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 88.04                  from /src/zion-cryptonote/src/Rpc/CoreRpcServerCommandsDefinitions.h:7,
#15 88.04                  from /src/zion-cryptonote/src/Rpc/JsonRpc.h:11,
#15 88.04                  from /src/zion-cryptonote/src/Rpc/JsonRpc.cpp:5:
#15 88.04 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 88.04 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 88.04    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 88.04       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 88.04 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 88.04    23 |   struct chacha8_key {
#15 88.04       |          ^~~~~~~~~~~
#15 89.11 [ 46%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/RpcServer.cpp.o
#15 89.36 [ 47%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/MinerConfig.cpp.o
#15 91.46 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 91.46                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 91.46                  from /src/zion-cryptonote/src/Rpc/CoreRpcServerCommandsDefinitions.h:7,
#15 91.46                  from /src/zion-cryptonote/src/Rpc/RpcServer.h:11,
#15 91.46                  from /src/zion-cryptonote/src/Rpc/RpcServer.cpp:5:
#15 91.46 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 91.46 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 91.46    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 91.46       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 91.46 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 91.46    23 |   struct chacha8_key {
#15 91.46       |          ^~~~~~~~~~~
#15 92.80 [ 47%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/SwappedMap.cpp.o
#15 94.03 /src/zion-cryptonote/src/CryptoNoteCore/SwappedMap.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#15 94.03     8 | char suppressMSVCWarningLNK4221;
#15 94.03       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#15 94.36 [ 48%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/SwappedVector.cpp.o
#15 95.35 /src/zion-cryptonote/src/CryptoNoteCore/SwappedVector.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#15 95.35     8 | char suppressMSVCWarningLNK4221;
#15 95.35       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#15 95.69 [ 48%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Transaction.cpp.o
#15 96.81 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 96.81                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 96.81                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionApiExtra.h:7,
#15 96.81                  from /src/zion-cryptonote/src/CryptoNoteCore/Transaction.cpp:6:
#15 96.81 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 96.81 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 96.81    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 96.81       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 96.81 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 96.81    23 |   struct chacha8_key {
#15 96.81       |          ^~~~~~~~~~~
#15 99.65 [ 49%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/RpcServerConfig.cpp.o
#15 99.73 [ 50%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/TransactionExtra.cpp.o
#15 100.9 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 100.9                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#15 100.9                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionExtra.cpp:10:
#15 100.9 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 100.9 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 100.9    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 100.9       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 100.9 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 100.9    23 |   struct chacha8_key {
#15 100.9       |          ^~~~~~~~~~~
#15 102.0 [ 51%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/TransactionPool.cpp.o
#15 103.0 [ 51%] Linking CXX static library libRpc.a
#15 103.3 [ 51%] Built target Rpc
#15 103.5 [ 51%] Building CXX object src/CMakeFiles/P2P.dir/CryptoNoteProtocol/CryptoNoteProtocolHandler.cpp.o
#15 105.0 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 105.0                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 105.0                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionPool.cpp:21:
#15 105.0 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 105.0 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 105.0    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 105.0       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 105.0 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 105.0    23 |   struct chacha8_key {
#15 105.0       |          ^~~~~~~~~~~
#15 105.6 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 105.6                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 105.6                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolHandler.h:13,
#15 105.6                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolHandler.cpp:5:
#15 105.6 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 105.6 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 105.6    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 105.6       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 105.6 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 105.6    23 |   struct chacha8_key {
#15 105.6       |          ^~~~~~~~~~~
#15 109.3 [ 51%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/TransactionPrefixImpl.cpp.o
#15 110.2 [ 52%] Building CXX object src/CMakeFiles/P2P.dir/P2p/IP2pNodeInternal.cpp.o
#15 110.4 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 110.4                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 110.4                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionApiExtra.h:7,
#15 110.4                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionPrefixImpl.cpp:12:
#15 110.4 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 110.4 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 110.4    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 110.4       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 110.4 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 110.4    23 |   struct chacha8_key {
#15 110.4       |          ^~~~~~~~~~~
#15 111.4 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 111.4                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#15 111.4                  from /src/zion-cryptonote/src/P2p/IP2pNodeInternal.h:8,
#15 111.4                  from /src/zion-cryptonote/src/P2p/IP2pNodeInternal.cpp:5:
#15 111.4 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 111.4 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 111.4    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 111.4       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 111.4 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 111.4    23 |   struct chacha8_key {
#15 111.4       |          ^~~~~~~~~~~
#15 111.8 [ 52%] Building CXX object src/CMakeFiles/P2P.dir/P2p/LevinProtocol.cpp.o
#15 112.2 [ 53%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/TransactionUtils.cpp.o
#15 113.2 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 113.2                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 113.2                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionUtils.cpp:11:
#15 113.2 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 113.2 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 113.2    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 113.2       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 113.2 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 113.2    23 |   struct chacha8_key {
#15 113.2       |          ^~~~~~~~~~~
#15 113.4 [ 54%] Building CXX object src/CMakeFiles/P2P.dir/P2p/NetNode.cpp.o
#15 114.2 [ 54%] Linking CXX static library libCryptoNoteCore.a
#15 114.5 [ 54%] Built target CryptoNoteCore
#15 114.7 [ 55%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/BinaryInputStreamSerializer.cpp.o
#15 115.5 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 115.5                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 115.5                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolHandler.h:13,
#15 115.5                  from /src/zion-cryptonote/src/P2p/NetNode.h:21,
#15 115.5                  from /src/zion-cryptonote/src/P2p/NetNode.cpp:5:
#15 115.5 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 115.5 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 115.5    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 115.5       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 115.5 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 115.5    23 |   struct chacha8_key {
#15 115.5       |          ^~~~~~~~~~~
#15 115.8 [ 55%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/BinaryOutputStreamSerializer.cpp.o
#15 116.8 [ 56%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/JsonInputStreamSerializer.cpp.o
#15 117.8 [ 57%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/JsonInputValueSerializer.cpp.o
#15 119.0 [ 57%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/JsonOutputStreamSerializer.cpp.o
#15 120.1 [ 58%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/KVBinaryInputStreamSerializer.cpp.o
#15 121.2 [ 58%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/KVBinaryOutputStreamSerializer.cpp.o
#15 121.3 [ 58%] Building CXX object src/CMakeFiles/P2P.dir/P2p/NetNodeConfig.cpp.o
#15 122.7 [ 59%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/MemoryStream.cpp.o
#15 123.2 [ 59%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/SerializationOverloads.cpp.o
#15 124.2 [ 60%] Linking CXX static library libSerialization.a
#15 124.5 [ 60%] Built target Serialization
#15 124.7 [ 61%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/Dispatcher.cpp.o
#15 125.2 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp: In constructor 'System::Dispatcher::Dispatcher()':
#15 125.2 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp:92:14: warning: unused variable 'result' [-Wunused-variable]
#15 125.2    92 |         auto result = close(remoteSpawnEvent);
#15 125.2       |              ^~~~~~
#15 125.2 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp:97:10: warning: unused variable 'result' [-Wunused-variable]
#15 125.2    97 |     auto result = close(epoll);
#15 125.2       |          ^~~~~~
#15 125.2 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp: In destructor 'System::Dispatcher::~Dispatcher()':
#15 125.2 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp:123:9: warning: unused variable 'result' [-Wunused-variable]
#15 125.2   123 |     int result = ::close(timers.top());
#15 125.2       |         ^~~~~~
#15 125.2 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp:128:8: warning: variable 'result' set but not used [-Wunused-but-set-variable]
#15 125.2   128 |   auto result = close(epoll);
#15 125.2       |        ^~~~~~
#15 125.4 [ 62%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pConnectionProxy.cpp.o
#15 126.1 [ 62%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/ErrorMessage.cpp.o
#15 127.0 [ 63%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/Ipv4Resolver.cpp.o
#15 127.2 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 127.2                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#15 127.2                  from /src/zion-cryptonote/src/P2p/IP2pNodeInternal.h:8,
#15 127.2                  from /src/zion-cryptonote/src/P2p/P2pConnectionProxy.h:9,
#15 127.2                  from /src/zion-cryptonote/src/P2p/P2pConnectionProxy.cpp:5:
#15 127.2 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 127.2 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 127.2    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 127.2       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 127.2 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 127.2    23 |   struct chacha8_key {
#15 127.2       |          ^~~~~~~~~~~
#15 128.3 [ 63%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/TcpConnection.cpp.o
#15 128.8 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp: In destructor 'System::TcpConnection::~TcpConnection()':
#15 128.8 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:37:9: warning: unused variable 'result' [-Wunused-variable]
#15 128.8    37 |     int result = close(connection);
#15 128.8       |         ^~~~~~
#15 128.8 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp: In member function 'size_t System::TcpConnection::read(uint8_t*, size_t)':
#15 128.8 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:73:26: warning: logical 'and' of equal expressions [-Wlogical-op]
#15 128.8    73 |     if (errno != EAGAIN  && errno != EWOULDBLOCK) {
#15 128.8       |                          ^
#15 128.8 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp: In member function 'std::size_t System::TcpConnection::write(const uint8_t*, size_t)':
#15 128.8 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:169:26: warning: logical 'and' of equal expressions [-Wlogical-op]
#15 128.8   169 |     if (errno != EAGAIN  && errno != EWOULDBLOCK) {
#15 128.8       |                          ^
#15 129.2 [ 63%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pContext.cpp.o
#15 129.5 [ 64%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/TcpConnector.cpp.o
#15 130.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnector.cpp: In member function 'System::TcpConnection System::TcpConnector::connect(const System::Ipv4Address&, uint16_t)':
#15 130.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnector.cpp:133:23: warning: unused variable 'result' [-Wunused-variable]
#15 130.0   133 |                   int result = close(connection);
#15 130.0       |                       ^~~~~~
#15 130.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnector.cpp:160:9: warning: unused variable 'result' [-Wunused-variable]
#15 130.0   160 |     int result = close(connection);
#15 130.0       |         ^~~~~~
#15 130.5 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 130.5                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#15 130.5                  from /src/zion-cryptonote/src/P2p/P2pContext.h:19,
#15 130.5                  from /src/zion-cryptonote/src/P2p/P2pContext.cpp:5:
#15 130.5 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 130.5 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 130.5    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 130.5       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 130.5 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 130.5    23 |   struct chacha8_key {
#15 130.5       |          ^~~~~~~~~~~
#15 130.6 [ 64%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/TcpListener.cpp.o
#15 131.1 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp: In constructor 'System::TcpListener::TcpListener(System::Dispatcher&, const System::Ipv4Address&, uint16_t)':
#15 131.1 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp:63:9: warning: unused variable 'result' [-Wunused-variable]
#15 131.1    63 |     int result = close(listener);
#15 131.1       |         ^~~~~~
#15 131.1 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp: In destructor 'System::TcpListener::~TcpListener()':
#15 131.1 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp:82:9: warning: unused variable 'result' [-Wunused-variable]
#15 131.1    82 |     int result = close(listener);
#15 131.1       |         ^~~~~~
#15 131.1 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp: In member function 'System::TcpConnection System::TcpListener::accept()':
#15 131.1 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp:176:11: warning: unused variable 'result' [-Wunused-variable]
#15 131.1   176 |       int result = close(connection);
#15 131.1       |           ^~~~~~
#15 131.2 [ 65%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pContextOwner.cpp.o
#15 131.7 [ 66%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/Timer.cpp.o
#15 132.2 /src/zion-cryptonote/src/Platform/Linux/System/Timer.cpp: In lambda function:
#15 132.2 /src/zion-cryptonote/src/Platform/Linux/System/Timer.cpp:92:32: warning: logical 'or' of equal expressions [-Wlogical-op]
#15 132.2    92 |             if(errno == EAGAIN || errno == EWOULDBLOCK) {
#15 132.2       |                                ^
#15 132.4 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 132.4                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#15 132.4                  from /src/zion-cryptonote/src/P2p/P2pContext.h:19,
#15 132.4                  from /src/zion-cryptonote/src/P2p/P2pContextOwner.cpp:7:
#15 132.4 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 132.4 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 132.4    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 132.4       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 132.4 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 132.4    23 |   struct chacha8_key {
#15 132.4       |          ^~~~~~~~~~~
#15 132.7 [ 66%] Building CXX object src/CMakeFiles/System.dir/System/ContextGroup.cpp.o
#15 132.9 [ 66%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pInterfaces.cpp.o
#15 133.4 [ 67%] Building CXX object src/CMakeFiles/System.dir/System/ContextGroupTimeout.cpp.o
#15 133.9 [ 68%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pNode.cpp.o
#15 134.2 [ 68%] Building CXX object src/CMakeFiles/System.dir/System/Event.cpp.o
#15 135.4 [ 69%] Building CXX object src/CMakeFiles/System.dir/System/EventLock.cpp.o
#15 135.9 [ 69%] Building CXX object src/CMakeFiles/System.dir/System/InterruptedException.cpp.o
#15 136.1 /src/zion-cryptonote/src/System/InterruptedException.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#15 136.1     8 | char suppressMSVCWarningLNK4221;
#15 136.1       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#15 136.2 [ 70%] Building CXX object src/CMakeFiles/System.dir/System/Ipv4Address.cpp.o
#15 136.5 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 136.5                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#15 136.5                  from /src/zion-cryptonote/src/P2p/IP2pNodeInternal.h:8,
#15 136.5                  from /src/zion-cryptonote/src/P2p/P2pNode.h:17,
#15 136.5                  from /src/zion-cryptonote/src/P2p/P2pNode.cpp:5:
#15 136.5 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 136.5 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 136.5    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 136.5       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 136.5 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 136.5    23 |   struct chacha8_key {
#15 136.5       |          ^~~~~~~~~~~
#15 136.6 /src/zion-cryptonote/src/System/Ipv4Address.cpp: In member function 'bool System::Ipv4Address::isPrivate() const':
#15 136.6 /src/zion-cryptonote/src/System/Ipv4Address.cpp:107:26: warning: comparison of integer expressions of different signedness: 'unsigned int' and 'int' [-Wsign-compare]
#15 136.6   107 |     (value & 0xfff00000) == ((172 << 24) | (16 << 16)) ||
#15 136.6       |     ~~~~~~~~~~~~~~~~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 136.6 /src/zion-cryptonote/src/System/Ipv4Address.cpp:109:26: warning: comparison of integer expressions of different signedness: 'unsigned int' and 'int' [-Wsign-compare]
#15 136.6   109 |     (value & 0xffff0000) == ((192 << 24) | (168 << 16));
#15 136.6       |     ~~~~~~~~~~~~~~~~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 137.2 [ 70%] Building CXX object src/CMakeFiles/System.dir/System/RemoteEventLock.cpp.o
#15 138.3 [ 71%] Building CXX object src/CMakeFiles/System.dir/System/TcpStream.cpp.o
#15 138.9 [ 71%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pNodeConfig.cpp.o
#15 139.2 [ 72%] Linking CXX static library libSystem.a
#15 139.5 [ 72%] Built target System
#15 139.7 [ 72%] Building CXX object src/CMakeFiles/Transfers.dir/Transfers/BlockchainSynchronizer.cpp.o
#15 140.8 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 140.8                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 140.8                  from /src/zion-cryptonote/include/INode.h:15,
#15 140.8                  from /src/zion-cryptonote/src/Transfers/BlockchainSynchronizer.h:7,
#15 140.8                  from /src/zion-cryptonote/src/Transfers/BlockchainSynchronizer.cpp:5:
#15 140.8 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 140.8 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 140.8    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 140.8       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 140.8 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 140.8    23 |   struct chacha8_key {
#15 140.8       |          ^~~~~~~~~~~
#15 141.1 [ 73%] Building CXX object src/CMakeFiles/P2P.dir/P2p/PeerListManager.cpp.o
#15 143.7 [ 74%] Linking CXX static library libP2P.a
#15 144.0 [ 74%] Built target P2P
#15 144.0 [ 75%] Building CXX object src/CMakeFiles/Transfers.dir/Transfers/SynchronizationState.cpp.o
#15 144.2 [ 76%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/LegacyKeysImporter.cpp.o
#15 145.1 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 145.1                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 145.1                  from /src/zion-cryptonote/include/INode.h:15,
#15 145.1                  from /src/zion-cryptonote/src/Transfers/CommonTypes.h:13,
#15 145.1                  from /src/zion-cryptonote/src/Transfers/SynchronizationState.h:7,
#15 145.1                  from /src/zion-cryptonote/src/Transfers/SynchronizationState.cpp:5:
#15 145.1 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 145.1 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 145.1    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 145.1       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 145.1 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 145.1    23 |   struct chacha8_key {
#15 145.1       |          ^~~~~~~~~~~
#15 145.3 /src/zion-cryptonote/src/Transfers/SynchronizationState.cpp: In member function 'void CryptoNote::SynchronizationState::addBlocks(const Crypto::Hash*, uint32_t, uint32_t)':
#15 145.3 /src/zion-cryptonote/src/Transfers/SynchronizationState.cpp:84:8: warning: unused variable 'size' [-Wunused-variable]
#15 145.3    84 |   auto size = m_blockchain.size();
#15 145.3       |        ^~~~
#15 146.1 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 146.1                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#15 146.1                  from /src/zion-cryptonote/src/Wallet/LegacyKeysImporter.cpp:14:
#15 146.1 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 146.1 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 146.1    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 146.1       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 146.1 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 146.1    23 |   struct chacha8_key {
#15 146.1       |          ^~~~~~~~~~~
#15 146.2 [ 76%] Building CXX object src/CMakeFiles/Transfers.dir/Transfers/TransfersConsumer.cpp.o
#15 147.4 [ 76%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/WalletAsyncContextCounter.cpp.o
#15 148.3 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 148.3                  from /src/zion-cryptonote/src/Transfers/TransfersContainer.h:19,
#15 148.3                  from /src/zion-cryptonote/src/Transfers/TransfersSubscription.h:8,
#15 148.3                  from /src/zion-cryptonote/src/Transfers/TransfersConsumer.h:9,
#15 148.3                  from /src/zion-cryptonote/src/Transfers/TransfersConsumer.cpp:5:
#15 148.3 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 148.3 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 148.3    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 148.3       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 148.3 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 148.3    23 |   struct chacha8_key {
#15 148.3       |          ^~~~~~~~~~~
#15 148.4 [ 77%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/WalletErrors.cpp.o
#15 149.2 [ 77%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/WalletGreen.cpp.o
#15 151.4 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 151.4                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 151.4                  from /src/zion-cryptonote/include/INode.h:15,
#15 151.4                  from /src/zion-cryptonote/src/Transfers/BlockchainSynchronizer.h:7,
#15 151.4                  from /src/zion-cryptonote/src/Wallet/WalletGreen.h:18,
#15 151.4                  from /src/zion-cryptonote/src/Wallet/WalletGreen.cpp:5:
#15 151.4 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 151.4 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 151.4    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 151.4       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 151.4 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 151.4    23 |   struct chacha8_key {
#15 151.4       |          ^~~~~~~~~~~
#15 152.1 [ 78%] Building CXX object src/CMakeFiles/Transfers.dir/Transfers/TransfersContainer.cpp.o
#15 152.4 /src/zion-cryptonote/src/Wallet/WalletGreen.cpp: In member function 'bool CryptoNote::WalletGreen::updateWalletTransactionInfo(size_t, const CryptoNote::TransactionInformation&, int64_t)':
#15 152.4 /src/zion-cryptonote/src/Wallet/WalletGreen.cpp:971:8: warning: unused variable 'r' [-Wunused-variable]
#15 152.4   971 |   bool r = txIdIndex.modify(it, [&info, totalAmount, &updated](WalletTransaction& transaction) {
#15 152.4       |        ^
#15 152.6 /src/zion-cryptonote/src/Wallet/WalletGreen.cpp: In member function 'virtual void CryptoNote::WalletGreen::onTransactionUpdated(const Crypto::PublicKey&, const Crypto::Hash&, const std::vector<CryptoNote::ITransfersContainer*>&)':
#15 152.6 /src/zion-cryptonote/src/Wallet/WalletGreen.cpp:1800:10: warning: unused variable 'found' [-Wunused-variable]
#15 152.6  1800 |     bool found = container->getTransactionInformation(transactionHash, info, &inputsAmount, &outputsAmount);
#15 152.6       |          ^~~~~
#15 152.7 /src/zion-cryptonote/src/Wallet/WalletGreen.cpp: In member function 'virtual size_t CryptoNote::WalletGreen::createFusionTransaction(uint64_t, uint64_t)':
#15 152.7 /src/zion-cryptonote/src/Wallet/WalletGreen.cpp:2092:12: warning: variable 'transactionAmount' set but not used [-Wunused-but-set-variable]
#15 152.7  2092 |   uint64_t transactionAmount;
#15 152.7       |            ^~~~~~~~~~~~~~~~~
#15 154.4 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 154.4                  from /src/zion-cryptonote/src/Transfers/TransfersContainer.h:19,
#15 154.4                  from /src/zion-cryptonote/src/Transfers/TransfersContainer.cpp:5:
#15 154.4 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 154.4 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 154.4    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 154.4       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 154.4 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 154.4    23 |   struct chacha8_key {
#15 154.4       |          ^~~~~~~~~~~
#15 159.4 [ 78%] Building CXX object src/CMakeFiles/Transfers.dir/Transfers/TransfersSubscription.cpp.o
#15 161.7 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 161.7                  from /src/zion-cryptonote/src/Transfers/TransfersContainer.h:19,
#15 161.7                  from /src/zion-cryptonote/src/Transfers/TransfersSubscription.h:8,
#15 161.7                  from /src/zion-cryptonote/src/Transfers/TransfersSubscription.cpp:5:
#15 161.7 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 161.7 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 161.7    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 161.7       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 161.7 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 161.7    23 |   struct chacha8_key {
#15 161.7       |          ^~~~~~~~~~~
#15 161.8 [ 79%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/WalletRpcServer.cpp.o
#15 163.5 [ 80%] Building CXX object src/CMakeFiles/Transfers.dir/Transfers/TransfersSynchronizer.cpp.o
#15 164.2 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 164.2                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 164.2                  from /src/zion-cryptonote/src/Wallet/WalletRpcServerCommandsDefinitions.h:6,
#15 164.2                  from /src/zion-cryptonote/src/Wallet/WalletRpcServer.h:10,
#15 164.2                  from /src/zion-cryptonote/src/Wallet/WalletRpcServer.cpp:5:
#15 164.2 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 164.2 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 164.2    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 164.2       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 164.2 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 164.2    23 |   struct chacha8_key {
#15 164.2       |          ^~~~~~~~~~~
#15 165.9 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 165.9                  from /src/zion-cryptonote/src/Transfers/TransfersContainer.h:19,
#15 165.9                  from /src/zion-cryptonote/src/Transfers/TransfersSubscription.h:8,
#15 165.9                  from /src/zion-cryptonote/src/Transfers/TransfersConsumer.h:9,
#15 165.9                  from /src/zion-cryptonote/src/Transfers/TransfersSynchronizer.cpp:6:
#15 165.9 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 165.9 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 165.9    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 165.9       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 165.9 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 165.9    23 |   struct chacha8_key {
#15 165.9       |          ^~~~~~~~~~~
#15 168.8 [ 80%] Linking CXX static library libTransfers.a
#15 169.1 [ 80%] Built target Transfers
#15 169.1 [ 80%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/WalletSerialization.cpp.o
#15 169.3 [ 80%] Building CXX object src/CMakeFiles/PaymentGate.dir/PaymentGate/NodeFactory.cpp.o
#15 170.5 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 170.5                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 170.5                  from /src/zion-cryptonote/include/INode.h:15,
#15 170.5                  from /src/zion-cryptonote/src/PaymentGate/NodeFactory.h:7,
#15 170.5                  from /src/zion-cryptonote/src/PaymentGate/NodeFactory.cpp:5:
#15 170.5 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 170.5 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 170.5    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 170.5       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 170.5 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 170.5    23 |   struct chacha8_key {
#15 170.5       |          ^~~~~~~~~~~
#15 170.9 In file included from /src/zion-cryptonote/src/Wallet/WalletSerialization.h:14,
#15 170.9                  from /src/zion-cryptonote/src/Wallet/WalletSerialization.cpp:5:
#15 170.9 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 170.9 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 170.9    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 170.9       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 170.9 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 170.9    23 |   struct chacha8_key {
#15 170.9       |          ^~~~~~~~~~~
#15 171.1 /src/zion-cryptonote/src/Wallet/WalletSerialization.cpp: In member function 'void CryptoNote::WalletSerializer::subscribeWallets()':
#15 171.1 /src/zion-cryptonote/src/Wallet/WalletSerialization.cpp:712:10: warning: unused variable 'r' [-Wunused-variable]
#15 171.1   712 |     bool r = index.modify(it, [&subscription] (WalletRecord& rec) { rec.container = &subscription.getContainer(); });
#15 171.1       |          ^
#15 171.1 /src/zion-cryptonote/src/Wallet/WalletSerialization.cpp: In member function 'void CryptoNote::WalletSerializer::loadUnlockTransactionsJobs(Common::IInputStream&, CryptoNote::CryptoContext&)':
#15 171.1 /src/zion-cryptonote/src/Wallet/WalletSerialization.cpp:753:18: warning: unused variable 'walletsSize' [-Wunused-variable]
#15 171.1   753 |   const uint64_t walletsSize = walletsIndex.size();
#15 171.1       |                  ^~~~~~~~~~~
#15 171.7 [ 81%] Building CXX object src/CMakeFiles/PaymentGate.dir/PaymentGate/PaymentServiceJsonRpcMessages.cpp.o
#15 173.5 [ 81%] Building CXX object src/CMakeFiles/PaymentGate.dir/PaymentGate/PaymentServiceJsonRpcServer.cpp.o
#15 173.5 /src/zion-cryptonote/src/Wallet/WalletSerialization.cpp: In member function 'void CryptoNote::WalletSerializer::loadWallets(Common::IInputStream&, CryptoNote::CryptoContext&)':
#15 173.5 /src/zion-cryptonote/src/Wallet/WalletSerialization.cpp:667:74: warning: 'isTrackingMode' may be used uninitialized in this function [-Wmaybe-uninitialized]
#15 173.5   667 |     } else if ((isTrackingMode && dto.spendSecretKey != NULL_SECRET_KEY) || (!isTrackingMode && dto.spendSecretKey == NULL_SECRET_KEY)) {
#15 173.5       |                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 174.1 [ 82%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/WalletUtils.cpp.o
#15 175.5 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 175.5                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 175.5                  from /src/zion-cryptonote/include/INode.h:15,
#15 175.5                  from /src/zion-cryptonote/src/PaymentGate/WalletService.h:11,
#15 175.5                  from /src/zion-cryptonote/src/PaymentGate/PaymentServiceJsonRpcServer.cpp:10:
#15 175.5 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 175.5 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 175.5    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 175.5       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 175.5 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 175.5    23 |   struct chacha8_key {
#15 175.5       |          ^~~~~~~~~~~
#15 176.6 [ 82%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/KeysStorage.cpp.o
#15 177.9 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 177.9                  from /src/zion-cryptonote/src/WalletLegacy/KeysStorage.cpp:10:
#15 177.9 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 177.9 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 177.9    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 177.9       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 177.9 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 177.9    23 |   struct chacha8_key {
#15 177.9       |          ^~~~~~~~~~~
#15 178.3 [ 83%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/WalletHelper.cpp.o
#15 179.2 [ 84%] Building CXX object src/CMakeFiles/PaymentGate.dir/PaymentGate/WalletFactory.cpp.o
#15 180.9 [ 84%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/WalletLegacy.cpp.o
#15 180.9 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 180.9                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 180.9                  from /src/zion-cryptonote/include/INode.h:15,
#15 180.9                  from /src/zion-cryptonote/src/PaymentGate/WalletFactory.h:8,
#15 180.9                  from /src/zion-cryptonote/src/PaymentGate/WalletFactory.cpp:5:
#15 180.9 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 180.9 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 180.9    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 180.9       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 180.9 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 180.9    23 |   struct chacha8_key {
#15 180.9       |          ^~~~~~~~~~~
#15 182.7 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 182.7                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 182.7                  from /src/zion-cryptonote/include/INode.h:15,
#15 182.7                  from /src/zion-cryptonote/src/WalletLegacy/WalletLegacy.h:14,
#15 182.7                  from /src/zion-cryptonote/src/WalletLegacy/WalletLegacy.cpp:5:
#15 182.7 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 182.7 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 182.7    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 182.7       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 182.7 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 182.7    23 |   struct chacha8_key {
#15 182.7       |          ^~~~~~~~~~~
#15 183.3 [ 84%] Building CXX object src/CMakeFiles/PaymentGate.dir/PaymentGate/WalletService.cpp.o
#15 185.0 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 185.0                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 185.0                  from /src/zion-cryptonote/include/INode.h:15,
#15 185.0                  from /src/zion-cryptonote/src/PaymentGate/WalletService.h:11,
#15 185.0                  from /src/zion-cryptonote/src/PaymentGate/WalletService.cpp:5:
#15 185.0 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 185.0 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 185.0    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 185.0       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 185.0 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 185.0    23 |   struct chacha8_key {
#15 185.0       |          ^~~~~~~~~~~
#15 185.9 /src/zion-cryptonote/src/PaymentGate/WalletService.cpp: In function 'Crypto::Hash PaymentService::{anonymous}::parsePaymentId(const string&)':
#15 185.9 /src/zion-cryptonote/src/PaymentGate/WalletService.cpp:68:8: warning: unused variable 'r' [-Wunused-variable]
#15 185.9    68 |   bool r = Common::podFromHex(paymentIdStr, paymentId);
#15 185.9       |        ^
#15 186.3 [ 85%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/WalletLegacySerialization.cpp.o
#15 187.7 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 187.7                  from /src/zion-cryptonote/src/WalletLegacy/WalletLegacySerialization.cpp:9:
#15 187.7 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 187.7 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 187.7    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 187.7       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 187.7 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 187.7    23 |   struct chacha8_key {
#15 187.7       |          ^~~~~~~~~~~
#15 188.5 [ 85%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/WalletLegacySerializer.cpp.o
#15 189.4 In file included from /src/zion-cryptonote/src/WalletLegacy/WalletLegacySerializer.h:12,
#15 189.4                  from /src/zion-cryptonote/src/WalletLegacy/WalletLegacySerializer.cpp:5:
#15 189.4 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 189.4 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 189.4    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 189.4       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 189.4 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 189.4    23 |   struct chacha8_key {
#15 189.4       |          ^~~~~~~~~~~
#15 189.7 [ 86%] Building CXX object src/CMakeFiles/PaymentGate.dir/PaymentGate/WalletServiceErrorCategory.cpp.o
#15 190.5 [ 86%] Linking CXX static library libPaymentGate.a
#15 190.5 [ 87%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/WalletTransactionSender.cpp.o
#15 190.8 [ 87%] Built target PaymentGate
#15 191.0 [ 87%] Building CXX object src/CMakeFiles/JsonRpcServer.dir/JsonRpcServer/JsonRpcServer.cpp.o
#15 191.9 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 191.9                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 191.9                  from /src/zion-cryptonote/src/WalletLegacy/WalletTransactionSender.cpp:7:
#15 191.9 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 191.9 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 191.9    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 191.9       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 191.9 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 191.9    23 |   struct chacha8_key {
#15 191.9       |          ^~~~~~~~~~~
#15 193.8 [ 88%] Linking CXX static library libJsonRpcServer.a
#15 194.1 [ 88%] Built target JsonRpcServer
#15 194.3 [ 88%] Building CXX object src/CMakeFiles/ConnectivityTool.dir/ConnectivityTool/ConnectivityTool.cpp.o
#15 195.8 [ 88%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/WalletUnconfirmedTransactions.cpp.o
#15 196.8 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 196.8                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#15 196.8                  from /src/zion-cryptonote/src/ConnectivityTool/ConnectivityTool.cpp:22:
#15 196.8 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 196.8 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 196.8    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 196.8       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 196.8 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 196.8    23 |   struct chacha8_key {
#15 196.8       |          ^~~~~~~~~~~
#15 196.8 /src/zion-cryptonote/src/ConnectivityTool/ConnectivityTool.cpp: At global scope:
#15 196.8 /src/zion-cryptonote/src/ConnectivityTool/ConnectivityTool.cpp:46:173: warning: narrowing conversion of '(const char*)""' from 'const char*' to 'bool' [-Wnarrowing]
#15 196.8    46 |   const command_line::arg_descriptor<bool>        arg_get_daemon_info    = {"rpc_get_daemon_info", "request daemon state info vie rpc (--rpc_port option should be set ).", "", true};
#15 196.8       |                                                                                                                                                                             ^~
#15 197.2 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 197.2                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#15 197.2                  from /src/zion-cryptonote/src/WalletLegacy/WalletUnconfirmedTransactions.cpp:8:
#15 197.2 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 197.2 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 197.2    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 197.2       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 197.2 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 197.2    23 |   struct chacha8_key {
#15 197.2       |          ^~~~~~~~~~~
#15 198.8 [ 89%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/WalletUserTransactionsCache.cpp.o
#15 200.3 [ 90%] Linking CXX executable zion_connectivity_tool
#15 200.7 [ 90%] Built target ConnectivityTool
#15 200.8 [ 91%] Building CXX object src/CMakeFiles/Daemon.dir/Daemon/Daemon.cpp.o
#15 201.4 [ 92%] Linking CXX static library libWallet.a
#15 201.7 [ 92%] Built target Wallet
#15 201.9 [ 93%] Building CXX object src/CMakeFiles/Miner.dir/Miner/BlockchainMonitor.cpp.o
#15 203.9 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 203.9                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 203.9                  from /src/zion-cryptonote/src/CryptoNoteCore/Blockchain.h:21,
#15 203.9                  from /src/zion-cryptonote/src/CryptoNoteCore/Core.h:14,
#15 203.9                  from /src/zion-cryptonote/src/Daemon/Daemon.cpp:15:
#15 203.9 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 203.9 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 203.9    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 203.9       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 203.9 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 203.9    23 |   struct chacha8_key {
#15 203.9       |          ^~~~~~~~~~~
#15 203.9 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 203.9                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 203.9                  from /src/zion-cryptonote/src/Rpc/CoreRpcServerCommandsDefinitions.h:7,
#15 203.9                  from /src/zion-cryptonote/src/Miner/BlockchainMonitor.cpp:13:
#15 203.9 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 203.9 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 203.9    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 203.9       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 203.9 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 203.9    23 |   struct chacha8_key {
#15 203.9       |          ^~~~~~~~~~~
#15 205.7 [ 93%] Building CXX object src/CMakeFiles/Miner.dir/Miner/Miner.cpp.o
#15 208.0 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 208.0                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#15 208.0                  from /src/zion-cryptonote/src/Miner/Miner.cpp:10:
#15 208.0 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 208.0 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 208.0    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 208.0       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 208.0 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 208.0    23 |   struct chacha8_key {
#15 208.0       |          ^~~~~~~~~~~
#15 208.2 [ 93%] Building CXX object src/CMakeFiles/Daemon.dir/Daemon/DaemonCommandsHandler.cpp.o
#15 210.4 [ 94%] Building CXX object src/CMakeFiles/Miner.dir/Miner/MinerManager.cpp.o
#15 210.7 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 210.7                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 210.7                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolHandler.h:13,
#15 210.7                  from /src/zion-cryptonote/src/P2p/NetNode.h:21,
#15 210.7                  from /src/zion-cryptonote/src/Daemon/DaemonCommandsHandler.cpp:7:
#15 210.7 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 210.7 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 210.7    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 210.7       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 210.7 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 210.7    23 |   struct chacha8_key {
#15 210.7       |          ^~~~~~~~~~~
#15 212.6 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 212.6                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#15 212.6                  from /src/zion-cryptonote/src/Miner/MinerManager.cpp:13:
#15 212.6 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 212.6 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 212.6    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 212.6       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 212.6 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 212.6    23 |   struct chacha8_key {
#15 212.6       |          ^~~~~~~~~~~
#15 214.8 [ 95%] Linking CXX executable ziond
#15 214.9 [ 95%] Building CXX object src/CMakeFiles/Miner.dir/Miner/MiningConfig.cpp.o
#15 215.5 [ 95%] Built target Daemon
#15 215.6 [ 96%] Building CXX object src/CMakeFiles/Miner.dir/Miner/main.cpp.o
#15 218.9 [ 96%] Building CXX object src/CMakeFiles/SimpleWallet.dir/SimpleWallet/PasswordContainer.cpp.o
#15 220.0 [ 97%] Building CXX object src/CMakeFiles/SimpleWallet.dir/SimpleWallet/SimpleWallet.cpp.o
#15 220.3 [ 97%] Linking CXX executable zion_miner
#15 220.7 [ 97%] Built target Miner
#15 220.9 [ 98%] Building CXX object src/CMakeFiles/PaymentGateService.dir/PaymentGateService/ConfigurationManager.cpp.o
#15 222.2 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 222.2                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 222.2                  from /src/zion-cryptonote/include/INode.h:15,
#15 222.2                  from /src/zion-cryptonote/src/NodeRpcProxy/NodeRpcProxy.h:15,
#15 222.2                  from /src/zion-cryptonote/src/SimpleWallet/SimpleWallet.h:20,
#15 222.2                  from /src/zion-cryptonote/src/SimpleWallet/SimpleWallet.cpp:5:
#15 222.2 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 222.2 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 222.2    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 222.2       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 222.2 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 222.2    23 |   struct chacha8_key {
#15 222.2       |          ^~~~~~~~~~~
#15 222.6 In file included from /usr/include/boost/smart_ptr/detail/sp_thread_sleep.hpp:22,
#15 222.6                  from /usr/include/boost/smart_ptr/detail/yield_k.hpp:23,
#15 222.6                  from /usr/include/boost/smart_ptr/detail/spinlock_gcc_atomic.hpp:14,
#15 222.6                  from /usr/include/boost/smart_ptr/detail/spinlock.hpp:42,
#15 222.6                  from /usr/include/boost/smart_ptr/detail/spinlock_pool.hpp:25,
#15 222.6                  from /usr/include/boost/smart_ptr/shared_ptr.hpp:29,
#15 222.6                  from /usr/include/boost/shared_ptr.hpp:17,
#15 222.6                  from /usr/include/boost/program_options/variables_map.hpp:13,
#15 222.6                  from /src/zion-cryptonote/src/SimpleWallet/SimpleWallet.h:12,
#15 222.6                  from /src/zion-cryptonote/src/SimpleWallet/SimpleWallet.cpp:5:
#15 222.6 /usr/include/boost/bind.hpp: At global scope:
#15 222.6 /usr/include/boost/bind.hpp:36:1: note: '#pragma message: The practice of declaring the Bind placeholders (_1, _2, ...) in the global namespace is deprecated. Please use <boost/bind/bind.hpp> + using namespace boost::placeholders, or define BOOST_BIND_GLOBAL_PLACEHOLDERS to retain the current behavior.'
#15 222.6    36 | BOOST_PRAGMA_MESSAGE(
#15 222.6       | ^~~~~~~~~~~~~~~~~~~~
#15 224.0 [ 98%] Building CXX object src/CMakeFiles/PaymentGateService.dir/PaymentGateService/PaymentGateService.cpp.o
#15 227.6 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 227.6                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 227.6                  from /src/zion-cryptonote/include/INode.h:15,
#15 227.6                  from /src/zion-cryptonote/src/PaymentGate/NodeFactory.h:7,
#15 227.6                  from /src/zion-cryptonote/src/PaymentGateService/PaymentGateService.h:14,
#15 227.6                  from /src/zion-cryptonote/src/PaymentGateService/PaymentGateService.cpp:5:
#15 227.6 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 227.6 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 227.6    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 227.6       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 227.6 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 227.6    23 |   struct chacha8_key {
#15 227.6       |          ^~~~~~~~~~~
#15 230.5 [ 98%] Linking CXX executable zion_wallet
#15 231.3 [ 98%] Built target SimpleWallet
#15 231.3 [ 99%] Building CXX object src/CMakeFiles/PaymentGateService.dir/PaymentGateService/PaymentServiceConfiguration.cpp.o
#15 233.6 [ 99%] Building CXX object src/CMakeFiles/PaymentGateService.dir/PaymentGateService/RpcNodeConfiguration.cpp.o
#15 235.6 [100%] Building CXX object src/CMakeFiles/PaymentGateService.dir/PaymentGateService/main.cpp.o
#15 238.0 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#15 238.0                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#15 238.0                  from /src/zion-cryptonote/include/INode.h:15,
#15 238.0                  from /src/zion-cryptonote/src/PaymentGate/NodeFactory.h:7,
#15 238.0                  from /src/zion-cryptonote/src/PaymentGateService/PaymentGateService.h:14,
#15 238.0                  from /src/zion-cryptonote/src/PaymentGateService/main.cpp:11:
#15 238.0 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#15 238.0 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#15 238.0    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#15 238.0       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#15 238.0 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#15 238.0    23 |   struct chacha8_key {
#15 238.0       |          ^~~~~~~~~~~
#15 239.6 [100%] Linking CXX executable zion_walletd
#15 240.2 [100%] Built target PaymentGateService
#15 DONE 240.4s

#16 [stage-1 3/4] COPY --from=build /src/zion-cryptonote/build/src/ziond /usr/local/bin/ziond
#16 DONE 0.5s

#17 [stage-1 4/4] COPY --from=build /src/zion-cryptonote/build/src/zion_wallet /usr/local/bin/zion_wallet
#17 DONE 0.0s

#18 exporting to image
#18 exporting layers
#18 exporting layers 21.6s done
#18 exporting manifest sha256:cf42be4acbafa554bc75b7d6cac638d7ce49d3bcada83ccc2476b2b6cbddb778 done
#18 exporting config sha256:f4fc09f439c2fc242909e7686e0d0e9676d2e8d115aaa17e33b9dc0ac5bda905 done
#18 exporting attestation manifest sha256:81b30df3195e42d7b3f983a7b9ea75704cfb4fc03da10bd8b565483f898d3a5d 0.0s done
#18 exporting manifest list sha256:4891288418286130ae105ebe6cf9392382b2ce5064f82cc1b5c3c8652d6e02df done
#18 naming to docker.io/library/zion:cryptonote done
#18 unpacking to docker.io/library/zion:cryptonote
#18 unpacking to docker.io/library/zion:cryptonote 4.6s done
#18 DONE 26.2s

 [33m2 warnings found (use docker --debug to expand):
[0m - FromPlatformFlagConstDisallowed: FROM --platform flag should not use constant value "linux/amd64" (line 3)
 - FromPlatformFlagConstDisallowed: FROM --platform flag should not use constant value "linux/amd64" (line 20)
\n### Rebuild to include walletd pá 19. září 2025 10:51:29 UTC
#0 building with "desktop-linux" instance using docker driver

#1 [internal] load build definition from Dockerfile.zion-cryptonote
#1 transferring dockerfile: 1.51kB done
#1 DONE 0.0s

#2 resolve image config for docker-image://docker.io/docker/dockerfile:1
#2 ...

#3 [auth] docker/dockerfile:pull token for registry-1.docker.io
#3 DONE 0.0s

#2 resolve image config for docker-image://docker.io/docker/dockerfile:1
#2 DONE 1.3s

#4 docker-image://docker.io/docker/dockerfile:1@sha256:dabfc0969b935b2080555ace70ee69a5261af8a8f1b4df97b9e7fbcf6722eddf
#4 resolve docker.io/docker/dockerfile:1@sha256:dabfc0969b935b2080555ace70ee69a5261af8a8f1b4df97b9e7fbcf6722eddf 0.0s done
#4 CACHED

#5 [auth] library/ubuntu:pull token for registry-1.docker.io
#5 DONE 0.0s

#6 [internal] load metadata for docker.io/library/ubuntu:22.04
#6 DONE 0.7s

#7 [internal] load .dockerignore
#7 transferring context: 333B 0.0s done
#7 DONE 0.0s

#8 [build 1/6] FROM docker.io/library/ubuntu:22.04@sha256:4e0171b9275e12d375863f2b3ae9ce00a4c53ddda176bd55868df97ac6f21a6e
#8 resolve docker.io/library/ubuntu:22.04@sha256:4e0171b9275e12d375863f2b3ae9ce00a4c53ddda176bd55868df97ac6f21a6e 0.0s done
#8 DONE 0.0s

#9 [internal] load build context
#9 transferring context: 71.72kB 0.1s done
#9 DONE 0.1s

#10 [build 2/6] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&         apt-get install -y --no-install-recommends             build-essential cmake git pkg-config             libboost-all-dev libssl-dev libpthread-stubs0-dev libc6-dev libminiupnpc-dev &&         rm -rf /var/lib/apt/lists/*
#10 CACHED

#11 [build 3/6] WORKDIR /src
#11 CACHED

#12 [build 4/6] COPY zion-cryptonote/ /src/zion-cryptonote/
#12 DONE 0.2s

#13 [build 5/6] WORKDIR /src/zion-cryptonote
#13 DONE 0.0s

#14 [build 6/6] RUN cmake -S . -B build -DCMAKE_BUILD_TYPE=Release     && cmake --build build -j 2
#14 0.813 -- The C compiler identification is GNU 11.4.0
#14 1.173 -- The CXX compiler identification is GNU 11.4.0
#14 1.207 -- Detecting C compiler ABI info
#14 1.777 -- Detecting C compiler ABI info - done
#14 1.793 -- Check for working C compiler: /usr/bin/cc - skipped
#14 1.794 -- Detecting C compile features
#14 1.795 -- Detecting C compile features - done
#14 1.798 -- Detecting CXX compiler ABI info
#14 2.328 -- Detecting CXX compiler ABI info - done
#14 2.343 -- Check for working CXX compiler: /usr/bin/c++ - skipped
#14 2.343 -- Detecting CXX compile features
#14 2.344 -- Detecting CXX compile features - done
#14 2.348 -- Looking for pthread.h
#14 2.932 -- Looking for pthread.h - found
#14 2.933 -- Performing Test CMAKE_HAVE_LIBC_PTHREAD
#14 3.461 -- Performing Test CMAKE_HAVE_LIBC_PTHREAD - Success
#14 3.464 -- Found Threads: TRUE  
#14 3.499 -- Found Boost: /usr/include (found suitable version "1.74.0", minimum required is "1.55") found components: system filesystem date_time chrono regex serialization program_options 
#14 3.531 -- Found Git: /usr/bin/git
#14 3.536 -- External dependencies: minimal setup
#14 3.550 -- Configuring done
#14 3.617 -- Generating done
#14 3.620 -- Build files have been written to: /src/zion-cryptonote/build
#14 4.061 [  0%] Building CXX object src/CMakeFiles/BlockchainExplorer.dir/BlockchainExplorer/BlockchainExplorer.cpp.o
#14 4.115 fatal: not a git repository (or any of the parent directories): .git
#14 4.120 CMake Warning at src/version.cmake:3 (message):
#14 4.120   Cannot determine current revision.  Make sure that you are building either
#14 4.120   from a Git working tree or from a source archive.
#14 4.120 
#14 4.120 
#14 4.208 [  0%] Built target version
#14 4.422 [  0%] Building CXX object src/CMakeFiles/Common.dir/Common/Base58.cpp.o
#14 5.138 /src/zion-cryptonote/src/Common/Base58.cpp: In function 'uint64_t Tools::Base58::{anonymous}::uint_8be_to_64(const uint8_t*, size_t)':
#14 5.138 /src/zion-cryptonote/src/Common/Base58.cpp:87:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#14 5.138    87 |         case 1:            res |= *data++;
#14 5.138       |                            ~~~~^~~~~~~~~~
#14 5.140 /src/zion-cryptonote/src/Common/Base58.cpp:88:9: note: here
#14 5.140    88 |         case 2: res <<= 8; res |= *data++;
#14 5.140       |         ^~~~
#14 5.140 /src/zion-cryptonote/src/Common/Base58.cpp:88:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#14 5.140    88 |         case 2: res <<= 8; res |= *data++;
#14 5.140       |                            ~~~~^~~~~~~~~~
#14 5.140 /src/zion-cryptonote/src/Common/Base58.cpp:89:9: note: here
#14 5.140    89 |         case 3: res <<= 8; res |= *data++;
#14 5.140       |         ^~~~
#14 5.140 /src/zion-cryptonote/src/Common/Base58.cpp:89:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#14 5.140    89 |         case 3: res <<= 8; res |= *data++;
#14 5.140       |                            ~~~~^~~~~~~~~~
#14 5.140 /src/zion-cryptonote/src/Common/Base58.cpp:90:9: note: here
#14 5.140    90 |         case 4: res <<= 8; res |= *data++;
#14 5.140       |         ^~~~
#14 5.140 /src/zion-cryptonote/src/Common/Base58.cpp:90:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#14 5.140    90 |         case 4: res <<= 8; res |= *data++;
#14 5.140       |                            ~~~~^~~~~~~~~~
#14 5.140 /src/zion-cryptonote/src/Common/Base58.cpp:91:9: note: here
#14 5.140    91 |         case 5: res <<= 8; res |= *data++;
#14 5.140       |         ^~~~
#14 5.140 /src/zion-cryptonote/src/Common/Base58.cpp:91:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#14 5.140    91 |         case 5: res <<= 8; res |= *data++;
#14 5.140       |                            ~~~~^~~~~~~~~~
#14 5.140 /src/zion-cryptonote/src/Common/Base58.cpp:92:9: note: here
#14 5.140    92 |         case 6: res <<= 8; res |= *data++;
#14 5.140       |         ^~~~
#14 5.140 /src/zion-cryptonote/src/Common/Base58.cpp:92:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#14 5.140    92 |         case 6: res <<= 8; res |= *data++;
#14 5.140       |                            ~~~~^~~~~~~~~~
#14 5.140 /src/zion-cryptonote/src/Common/Base58.cpp:93:9: note: here
#14 5.140    93 |         case 7: res <<= 8; res |= *data++;
#14 5.140       |         ^~~~
#14 5.140 /src/zion-cryptonote/src/Common/Base58.cpp:93:32: warning: this statement may fall through [-Wimplicit-fallthrough=]
#14 5.140    93 |         case 7: res <<= 8; res |= *data++;
#14 5.140       |                            ~~~~^~~~~~~~~~
#14 5.140 /src/zion-cryptonote/src/Common/Base58.cpp:94:9: note: here
#14 5.140    94 |         case 8: res <<= 8; res |= *data; break;
#14 5.140       |         ^~~~
#14 5.937 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 5.937                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#14 5.937                  from /src/zion-cryptonote/include/INode.h:15,
#14 5.937                  from /src/zion-cryptonote/src/BlockchainExplorer/BlockchainExplorer.h:12,
#14 5.937                  from /src/zion-cryptonote/src/BlockchainExplorer/BlockchainExplorer.cpp:5:
#14 5.937 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 5.937 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 5.937    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 5.937       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 5.937 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 5.937    23 |   struct chacha8_key {
#14 5.937       |          ^~~~~~~~~~~
#14 5.981 [  1%] Building CXX object src/CMakeFiles/Common.dir/Common/BlockingQueue.cpp.o
#14 6.695 /src/zion-cryptonote/src/Common/BlockingQueue.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#14 6.695     8 | char suppressMSVCWarningLNK4221;
#14 6.695       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#14 6.816 [  1%] Building CXX object src/CMakeFiles/Common.dir/Common/CommandLine.cpp.o
#14 9.092 [  2%] Building CXX object src/CMakeFiles/Common.dir/Common/ConsoleHandler.cpp.o
#14 10.52 [  3%] Building CXX object src/CMakeFiles/BlockchainExplorer.dir/BlockchainExplorer/BlockchainExplorerDataBuilder.cpp.o
#14 12.10 [  3%] Building CXX object src/CMakeFiles/Common.dir/Common/ConsoleTools.cpp.o
#14 12.13 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 12.13                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#14 12.13                  from /src/zion-cryptonote/src/BlockchainExplorer/BlockchainExplorerDataBuilder.cpp:11:
#14 12.13 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 12.13 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 12.13    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 12.13       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 12.13 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 12.13    23 |   struct chacha8_key {
#14 12.13       |          ^~~~~~~~~~~
#14 13.22 [  4%] Building CXX object src/CMakeFiles/Common.dir/Common/IInputStream.cpp.o
#14 13.45 [  4%] Building CXX object src/CMakeFiles/Common.dir/Common/IOutputStream.cpp.o
#14 13.68 [  5%] Building CXX object src/CMakeFiles/Common.dir/Common/JsonValue.cpp.o
#14 14.53 [  5%] Building CXX object src/CMakeFiles/BlockchainExplorer.dir/BlockchainExplorer/BlockchainExplorerErrors.cpp.o
#14 15.38 [  6%] Linking CXX static library libBlockchainExplorer.a
#14 15.65 [  6%] Built target BlockchainExplorer
#14 15.66 [  6%] Building CXX object src/CMakeFiles/Common.dir/Common/Math.cpp.o
#14 15.84 [  6%] Building C object src/CMakeFiles/Crypto.dir/crypto/blake256.c.o
#14 15.97 /src/zion-cryptonote/src/Common/Math.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#14 15.97     8 | char suppressMSVCWarningLNK4221;
#14 15.97       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#14 16.08 [  7%] Building CXX object src/CMakeFiles/Common.dir/Common/MemoryInputStream.cpp.o
#14 16.70 [  8%] Building C object src/CMakeFiles/Crypto.dir/crypto/chacha8.c.o
#14 16.81 [  8%] Building CXX object src/CMakeFiles/Common.dir/Common/PathTools.cpp.o
#14 17.36 [  8%] Building C object src/CMakeFiles/Crypto.dir/crypto/crypto-ops-data.c.o
#14 17.60 [  9%] Building C object src/CMakeFiles/Crypto.dir/crypto/crypto-ops.c.o
#14 17.78 [ 10%] Building CXX object src/CMakeFiles/Common.dir/Common/ScopeExit.cpp.o
#14 18.37 [ 10%] Building CXX object src/CMakeFiles/Common.dir/Common/SignalHandler.cpp.o
#14 18.89 [ 10%] Building CXX object src/CMakeFiles/Crypto.dir/crypto/crypto.cpp.o
#14 19.34 [ 11%] Building CXX object src/CMakeFiles/Common.dir/Common/StdInputStream.cpp.o
#14 20.11 [ 12%] Building C object src/CMakeFiles/Crypto.dir/crypto/groestl.c.o
#14 20.20 [ 12%] Building CXX object src/CMakeFiles/Common.dir/Common/StdOutputStream.cpp.o
#14 20.90 [ 12%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash-extra-blake.c.o
#14 21.01 [ 13%] Building CXX object src/CMakeFiles/Common.dir/Common/StreamTools.cpp.o
#14 21.36 [ 14%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash-extra-groestl.c.o
#14 21.71 [ 14%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash-extra-jh.c.o
#14 21.86 /src/zion-cryptonote/src/crypto/hash-extra-jh.c: In function 'hash_extra_jh':
#14 21.86 /src/zion-cryptonote/src/crypto/hash-extra-jh.c:14:7: warning: unused variable 'r' [-Wunused-variable]
#14 21.86    14 |   int r = jh_hash(HASH_SIZE * 8, data, 8 * length, (uint8_t*)hash);
#14 21.86       |       ^
#14 22.06 [ 14%] Building CXX object src/CMakeFiles/Common.dir/Common/StringInputStream.cpp.o
#14 22.12 [ 15%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash-extra-skein.c.o
#14 22.29 /src/zion-cryptonote/src/crypto/hash-extra-skein.c: In function 'hash_extra_skein':
#14 22.29 /src/zion-cryptonote/src/crypto/hash-extra-skein.c:12:7: warning: unused variable 'r' [-Wunused-variable]
#14 22.29    12 |   int r = skein_hash(8 * HASH_SIZE, data, 8 * length, (uint8_t*)hash);
#14 22.29       |       ^
#14 22.54 [ 15%] Building C object src/CMakeFiles/Crypto.dir/crypto/hash.c.o
#14 22.82 [ 16%] Building CXX object src/CMakeFiles/Common.dir/Common/StringOutputStream.cpp.o
#14 23.03 [ 17%] Building C object src/CMakeFiles/Crypto.dir/crypto/jh.c.o
#14 23.52 [ 17%] Building CXX object src/CMakeFiles/Common.dir/Common/StringTools.cpp.o
#14 23.76 [ 17%] Building C object src/CMakeFiles/Crypto.dir/crypto/keccak.c.o
#14 24.39 [ 18%] Building C object src/CMakeFiles/Crypto.dir/crypto/oaes_lib.c.o
#14 24.56 /src/zion-cryptonote/src/crypto/oaes_lib.c: In function 'oaes_get_seed':
#14 24.56 /src/zion-cryptonote/src/crypto/oaes_lib.c:490:9: warning: 'ftime' is deprecated: Use gettimeofday or clock_gettime instead [-Wdeprecated-declarations]
#14 24.56   490 |         ftime (&timer);
#14 24.56       |         ^~~~~
#14 24.56 In file included from /src/zion-cryptonote/src/crypto/oaes_lib.c:36:
#14 24.56 /usr/include/x86_64-linux-gnu/sys/timeb.h:29:12: note: declared here
#14 24.56    29 | extern int ftime (struct timeb *__timebuf)
#14 24.56       |            ^~~~~
#14 24.59 At top level:
#14 24.59 /src/zion-cryptonote/src/crypto/oaes_lib.c:30:19: warning: '_NR' defined but not used [-Wunused-const-variable=]
#14 24.59    30 | static const char _NR[] = {
#14 24.59       |                   ^~~
#14 24.81 [ 19%] Building CXX object src/CMakeFiles/Common.dir/Common/StringView.cpp.o
#14 25.21 [ 19%] Building C object src/CMakeFiles/Crypto.dir/crypto/random.c.o
#14 25.69 [ 20%] Building CXX object src/CMakeFiles/Common.dir/Common/Util.cpp.o
#14 25.76 [ 21%] Building C object src/CMakeFiles/Crypto.dir/crypto/skein.c.o
#14 26.76 [ 21%] Building C object src/CMakeFiles/Crypto.dir/crypto/slow-hash.c.o
#14 26.98 In file included from /src/zion-cryptonote/src/crypto/slow-hash.c:183:
#14 26.98 /src/zion-cryptonote/src/crypto/slow-hash.inl: In function 'cn_slow_hash_noaesni':
#14 26.98 /src/zion-cryptonote/src/crypto/slow-hash.inl:16:44: warning: unused variable 'b_x' [-Wunused-variable]
#14 26.98    16 |   __m128i *longoutput, *expkey, *xmminput, b_x;
#14 26.98       |                                            ^~~
#14 26.98 /src/zion-cryptonote/src/crypto/slow-hash.inl:16:12: warning: variable 'longoutput' set but not used [-Wunused-but-set-variable]
#14 26.98    16 |   __m128i *longoutput, *expkey, *xmminput, b_x;
#14 26.98       |            ^~~~~~~~~~
#14 27.41 [ 21%] Building CXX object src/CMakeFiles/Common.dir/Common/VectorOutputStream.cpp.o
#14 27.60 [ 22%] Building CXX object src/CMakeFiles/Crypto.dir/crypto/slow-hash.cpp.o
#14 27.92 /src/zion-cryptonote/src/crypto/slow-hash.cpp: In destructor 'Crypto::cn_context::~cn_context()':
#14 27.92 /src/zion-cryptonote/src/crypto/slow-hash.cpp:54:7: warning: 'throw' will always call 'terminate' [-Wterminate]
#14 27.92    54 |       throw bad_alloc();
#14 27.92       |       ^~~~~~~~~~~~~~~~~
#14 27.92 /src/zion-cryptonote/src/crypto/slow-hash.cpp:54:7: note: in C++11 destructors default to 'noexcept'
#14 28.21 [ 23%] Linking CXX static library libCommon.a
#14 28.27 [ 24%] Building C object src/CMakeFiles/Crypto.dir/crypto/tree-hash.c.o
#14 28.53 [ 24%] Built target Common
#14 28.72 [ 25%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Account.cpp.o
#14 28.90 [ 25%] Linking CXX static library libCrypto.a
#14 29.16 [ 25%] Built target Crypto
#14 29.35 [ 25%] Building CXX object src/CMakeFiles/Http.dir/HTTP/HttpParser.cpp.o
#14 29.53 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 29.53                  from /src/zion-cryptonote/src/CryptoNoteCore/Account.cpp:6:
#14 29.53 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 29.53 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 29.53    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 29.53       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 29.53 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 29.53    23 |   struct chacha8_key {
#14 29.53       |          ^~~~~~~~~~~
#14 29.92 [ 25%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/BlockIndex.cpp.o
#14 30.61 [ 26%] Building CXX object src/CMakeFiles/Http.dir/HTTP/HttpParserErrorCodes.cpp.o
#14 31.21 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 31.21                  from /src/zion-cryptonote/src/CryptoNoteCore/BlockIndex.cpp:9:
#14 31.21 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 31.21 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 31.21    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 31.21       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 31.21 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 31.21    23 |   struct chacha8_key {
#14 31.21       |          ^~~~~~~~~~~
#14 31.40 [ 26%] Building CXX object src/CMakeFiles/Http.dir/HTTP/HttpRequest.cpp.o
#14 31.91 /src/zion-cryptonote/src/CryptoNoteCore/BlockIndex.cpp: In member function 'std::vector<Crypto::Hash> CryptoNote::BlockIndex::buildSparseChain(const Crypto::Hash&) const':
#14 31.91 /src/zion-cryptonote/src/CryptoNoteCore/BlockIndex.cpp:51:66: warning: 'startBlockHeight' may be used uninitialized in this function [-Wmaybe-uninitialized]
#14 31.91    51 |     size_t sparseChainEnd = static_cast<size_t>(startBlockHeight + 1);
#14 31.91       |                                                 ~~~~~~~~~~~~~~~~~^~~
#14 32.04 [ 27%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Blockchain.cpp.o
#14 32.56 [ 28%] Building CXX object src/CMakeFiles/Http.dir/HTTP/HttpResponse.cpp.o
#14 33.80 [ 28%] Linking CXX static library libHttp.a
#14 34.05 [ 28%] Built target Http
#14 34.15 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 34.15                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#14 34.15                  from /src/zion-cryptonote/src/CryptoNoteCore/Blockchain.h:21,
#14 34.15                  from /src/zion-cryptonote/src/CryptoNoteCore/Blockchain.cpp:5:
#14 34.15 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 34.15 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 34.15    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 34.15       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 34.15 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 34.15    23 |   struct chacha8_key {
#14 34.15       |          ^~~~~~~~~~~
#14 34.25 [ 29%] Building CXX object src/CMakeFiles/InProcessNode.dir/InProcessNode/InProcessNode.cpp.o
#14 36.03 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 36.03                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#14 36.03                  from /src/zion-cryptonote/include/INode.h:15,
#14 36.03                  from /src/zion-cryptonote/src/InProcessNode/InProcessNode.h:7,
#14 36.03                  from /src/zion-cryptonote/src/InProcessNode/InProcessNode.cpp:5:
#14 36.03 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 36.03 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 36.03    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 36.03       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 36.03 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 36.03    23 |   struct chacha8_key {
#14 36.03       |          ^~~~~~~~~~~
#14 43.75 [ 29%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/BlockchainIndices.cpp.o
#14 44.77 [ 29%] Building CXX object src/CMakeFiles/InProcessNode.dir/InProcessNode/InProcessNodeErrors.cpp.o
#14 45.05 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 45.05                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#14 45.05                  from /src/zion-cryptonote/src/CryptoNoteCore/BlockchainIndices.cpp:8:
#14 45.05 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 45.05 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 45.05    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 45.05       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 45.05 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 45.05    23 |   struct chacha8_key {
#14 45.05       |          ^~~~~~~~~~~
#14 45.69 [ 30%] Linking CXX static library libInProcessNode.a
#14 45.97 [ 30%] Built target InProcessNode
#14 46.16 [ 30%] Building CXX object src/CMakeFiles/Logging.dir/Logging/CommonLogger.cpp.o
#14 46.45 [ 31%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/BlockchainMessages.cpp.o
#14 47.86 [ 31%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Checkpoints.cpp.o
#14 50.02 [ 32%] Building CXX object src/CMakeFiles/Logging.dir/Logging/ConsoleLogger.cpp.o
#14 50.41 [ 33%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Core.cpp.o
#14 52.58 [ 33%] Building CXX object src/CMakeFiles/Logging.dir/Logging/FileLogger.cpp.o
#14 53.23 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 53.23                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#14 53.23                  from /src/zion-cryptonote/src/CryptoNoteCore/Blockchain.h:21,
#14 53.23                  from /src/zion-cryptonote/src/CryptoNoteCore/Core.h:14,
#14 53.23                  from /src/zion-cryptonote/src/CryptoNoteCore/Core.cpp:5:
#14 53.23 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 53.23 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 53.23    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 53.23       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 53.23 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 53.23    23 |   struct chacha8_key {
#14 53.23       |          ^~~~~~~~~~~
#14 53.49 /src/zion-cryptonote/src/CryptoNoteCore/Core.cpp: In member function 'virtual std::unique_ptr<CryptoNote::IBlock> CryptoNote::core::getBlock(const Crypto::Hash&)':
#14 53.49 /src/zion-cryptonote/src/CryptoNoteCore/Core.cpp:981:19: warning: redundant move in return statement [-Wredundant-move]
#14 53.49   981 |   return std::move(blockPtr);
#14 53.49       |          ~~~~~~~~~^~~~~~~~~~
#14 53.49 /src/zion-cryptonote/src/CryptoNoteCore/Core.cpp:981:19: note: remove 'std::move' call
#14 55.06 [ 34%] Building CXX object src/CMakeFiles/Logging.dir/Logging/ILogger.cpp.o
#14 57.40 [ 34%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CoreConfig.cpp.o
#14 57.41 [ 34%] Building CXX object src/CMakeFiles/Logging.dir/Logging/LoggerGroup.cpp.o
#14 59.84 [ 35%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteBasic.cpp.o
#14 59.97 [ 36%] Building CXX object src/CMakeFiles/Logging.dir/Logging/LoggerManager.cpp.o
#14 61.09 [ 36%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteBasicImpl.cpp.o
#14 62.02 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 62.02                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#14 62.02                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteBasicImpl.cpp:6:
#14 62.02 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 62.02 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 62.02    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 62.02       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 62.02 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 62.02    23 |   struct chacha8_key {
#14 62.02       |          ^~~~~~~~~~~
#14 62.10 /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteBasicImpl.cpp: In function 'std::string CryptoNote::getAccountAddressAsStr(uint64_t, const CryptoNote::AccountPublicAddress&)':
#14 62.10 /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteBasicImpl.cpp:53:10: warning: unused variable 'r' [-Wunused-variable]
#14 62.10    53 |     bool r = toBinaryArray(adr, ba);
#14 62.10       |          ^
#14 62.57 [ 37%] Building CXX object src/CMakeFiles/Logging.dir/Logging/LoggerMessage.cpp.o
#14 62.75 [ 38%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteFormatUtils.cpp.o
#14 64.11 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 64.11                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#14 64.11                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.cpp:5:
#14 64.11 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 64.11 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 64.11    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 64.11       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 64.11 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 64.11    23 |   struct chacha8_key {
#14 64.11       |          ^~~~~~~~~~~
#14 64.17 /src/zion-cryptonote/src/Logging/LoggerMessage.cpp: In constructor 'Logging::LoggerMessage::LoggerMessage(Logging::LoggerMessage&&)':
#14 64.17 /src/zion-cryptonote/src/Logging/LoggerMessage.cpp:65:11: warning: unused variable '_Pnext' [-Wunused-variable]
#14 64.17    65 |     char *_Pnext = pptr();
#14 64.17       |           ^~~~~~
#14 65.20 [ 38%] Building CXX object src/CMakeFiles/Logging.dir/Logging/LoggerRef.cpp.o
#14 66.86 [ 38%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteSerialization.cpp.o
#14 67.38 [ 39%] Building CXX object src/CMakeFiles/Logging.dir/Logging/StreamLogger.cpp.o
#14 67.78 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 67.78                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.cpp:5:
#14 67.78 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 67.78 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 67.78    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 67.78       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 67.78 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 67.78    23 |   struct chacha8_key {
#14 67.78       |          ^~~~~~~~~~~
#14 69.42 [ 40%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/CryptoNoteTools.cpp.o
#14 69.51 [ 40%] Linking CXX static library libLogging.a
#14 69.79 [ 40%] Built target Logging
#14 69.99 [ 41%] Building CXX object src/CMakeFiles/NodeRpcProxy.dir/NodeRpcProxy/NodeErrors.cpp.o
#14 70.41 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 70.41                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#14 70.41                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.cpp:5:
#14 70.41 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 70.41 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 70.41    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 70.41       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 70.41 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 70.41    23 |   struct chacha8_key {
#14 70.41       |          ^~~~~~~~~~~
#14 70.79 [ 41%] Building CXX object src/CMakeFiles/NodeRpcProxy.dir/NodeRpcProxy/NodeRpcProxy.cpp.o
#14 71.11 [ 41%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Currency.cpp.o
#14 71.83 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 71.83                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#14 71.83                  from /src/zion-cryptonote/include/INode.h:15,
#14 71.83                  from /src/zion-cryptonote/src/NodeRpcProxy/NodeRpcProxy.h:15,
#14 71.83                  from /src/zion-cryptonote/src/NodeRpcProxy/NodeRpcProxy.cpp:5:
#14 71.83 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 71.83 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 71.83    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 71.83       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 71.83 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 71.83    23 |   struct chacha8_key {
#14 71.83       |          ^~~~~~~~~~~
#14 72.92 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 72.92                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#14 72.92                  from /src/zion-cryptonote/src/CryptoNoteCore/Currency.cpp:15:
#14 72.92 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 72.92 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 72.92    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 72.92       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 72.92 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 72.92    23 |   struct chacha8_key {
#14 72.92       |          ^~~~~~~~~~~
#14 75.10 [ 42%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Difficulty.cpp.o
#14 75.88 [ 42%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/IBlock.cpp.o
#14 76.26 [ 43%] Linking CXX static library libNodeRpcProxy.a
#14 76.53 [ 43%] Built target NodeRpcProxy
#14 76.72 [ 44%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/HttpClient.cpp.o
#14 77.01 [ 45%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/ITimeProvider.cpp.o
#14 77.25 [ 45%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Miner.cpp.o
#14 78.06 [ 45%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/HttpServer.cpp.o
#14 79.76 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 79.76                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#14 79.76                  from /src/zion-cryptonote/src/CryptoNoteCore/Miner.cpp:24:
#14 79.76 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 79.76 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 79.76    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 79.76       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 79.76 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 79.76    23 |   struct chacha8_key {
#14 79.76       |          ^~~~~~~~~~~
#14 81.00 [ 46%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/JsonRpc.cpp.o
#14 82.09 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 82.09                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#14 82.09                  from /src/zion-cryptonote/src/Rpc/CoreRpcServerCommandsDefinitions.h:7,
#14 82.09                  from /src/zion-cryptonote/src/Rpc/JsonRpc.h:11,
#14 82.09                  from /src/zion-cryptonote/src/Rpc/JsonRpc.cpp:5:
#14 82.09 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 82.09 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 82.09    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 82.09       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 82.09 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 82.09    23 |   struct chacha8_key {
#14 82.09       |          ^~~~~~~~~~~
#14 82.67 [ 47%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/MinerConfig.cpp.o
#14 83.20 [ 47%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/RpcServer.cpp.o
#14 85.43 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 85.43                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#14 85.43                  from /src/zion-cryptonote/src/Rpc/CoreRpcServerCommandsDefinitions.h:7,
#14 85.43                  from /src/zion-cryptonote/src/Rpc/RpcServer.h:11,
#14 85.43                  from /src/zion-cryptonote/src/Rpc/RpcServer.cpp:5:
#14 85.43 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 85.43 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 85.43    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 85.43       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 85.43 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 85.43    23 |   struct chacha8_key {
#14 85.43       |          ^~~~~~~~~~~
#14 85.79 [ 47%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/SwappedMap.cpp.o
#14 86.96 /src/zion-cryptonote/src/CryptoNoteCore/SwappedMap.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#14 86.96     8 | char suppressMSVCWarningLNK4221;
#14 86.96       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#14 87.26 [ 48%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/SwappedVector.cpp.o
#14 88.33 /src/zion-cryptonote/src/CryptoNoteCore/SwappedVector.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#14 88.33     8 | char suppressMSVCWarningLNK4221;
#14 88.33       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#14 88.64 [ 48%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/Transaction.cpp.o
#14 89.67 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 89.67                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#14 89.67                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionApiExtra.h:7,
#14 89.67                  from /src/zion-cryptonote/src/CryptoNoteCore/Transaction.cpp:6:
#14 89.67 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 89.67 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 89.67    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 89.67       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 89.67 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 89.67    23 |   struct chacha8_key {
#14 89.67       |          ^~~~~~~~~~~
#14 92.19 [ 49%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/TransactionExtra.cpp.o
#14 92.67 [ 50%] Building CXX object src/CMakeFiles/Rpc.dir/Rpc/RpcServerConfig.cpp.o
#14 93.54 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 93.54                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#14 93.54                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionExtra.cpp:10:
#14 93.54 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 93.54 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 93.54    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 93.54       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 93.54 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 93.54    23 |   struct chacha8_key {
#14 93.54       |          ^~~~~~~~~~~
#14 94.68 [ 51%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/TransactionPool.cpp.o
#14 96.10 [ 51%] Linking CXX static library libRpc.a
#14 96.42 [ 51%] Built target Rpc
#14 96.61 [ 51%] Building CXX object src/CMakeFiles/P2P.dir/CryptoNoteProtocol/CryptoNoteProtocolHandler.cpp.o
#14 97.09 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 97.09                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#14 97.09                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionPool.cpp:21:
#14 97.09 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 97.09 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 97.09    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 97.09       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 97.09 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 97.09    23 |   struct chacha8_key {
#14 97.09       |          ^~~~~~~~~~~
#14 98.41 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 98.41                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#14 98.41                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolHandler.h:13,
#14 98.41                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolHandler.cpp:5:
#14 98.41 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 98.41 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 98.41    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 98.41       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 98.41 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 98.41    23 |   struct chacha8_key {
#14 98.41       |          ^~~~~~~~~~~
#14 101.2 [ 51%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/TransactionPrefixImpl.cpp.o
#14 102.4 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 102.4                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#14 102.4                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionApiExtra.h:7,
#14 102.4                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionPrefixImpl.cpp:12:
#14 102.4 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 102.4 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 102.4    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 102.4       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 102.4 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 102.4    23 |   struct chacha8_key {
#14 102.4       |          ^~~~~~~~~~~
#14 102.8 [ 52%] Building CXX object src/CMakeFiles/P2P.dir/P2p/IP2pNodeInternal.cpp.o
#14 103.8 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 103.8                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#14 103.8                  from /src/zion-cryptonote/src/P2p/IP2pNodeInternal.h:8,
#14 103.8                  from /src/zion-cryptonote/src/P2p/IP2pNodeInternal.cpp:5:
#14 103.8 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 103.8 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 103.8    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 103.8       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 103.8 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 103.8    23 |   struct chacha8_key {
#14 103.8       |          ^~~~~~~~~~~
#14 103.9 [ 53%] Building CXX object src/CMakeFiles/CryptoNoteCore.dir/CryptoNoteCore/TransactionUtils.cpp.o
#14 104.1 [ 53%] Building CXX object src/CMakeFiles/P2P.dir/P2p/LevinProtocol.cpp.o
#14 104.8 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 104.8                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#14 104.8                  from /src/zion-cryptonote/src/CryptoNoteCore/TransactionUtils.cpp:11:
#14 104.8 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 104.8 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 104.8    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 104.8       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 104.8 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 104.8    23 |   struct chacha8_key {
#14 104.8       |          ^~~~~~~~~~~
#14 105.5 [ 54%] Building CXX object src/CMakeFiles/P2P.dir/P2p/NetNode.cpp.o
#14 105.7 [ 54%] Linking CXX static library libCryptoNoteCore.a
#14 106.0 [ 54%] Built target CryptoNoteCore
#14 106.2 [ 55%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/BinaryInputStreamSerializer.cpp.o
#14 107.2 [ 55%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/BinaryOutputStreamSerializer.cpp.o
#14 107.4 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 107.4                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#14 107.4                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolHandler.h:13,
#14 107.4                  from /src/zion-cryptonote/src/P2p/NetNode.h:21,
#14 107.4                  from /src/zion-cryptonote/src/P2p/NetNode.cpp:5:
#14 107.4 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 107.4 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 107.4    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 107.4       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 107.4 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 107.4    23 |   struct chacha8_key {
#14 107.4       |          ^~~~~~~~~~~
#14 108.4 [ 56%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/JsonInputStreamSerializer.cpp.o
#14 109.2 [ 57%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/JsonInputValueSerializer.cpp.o
#14 110.4 [ 57%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/JsonOutputStreamSerializer.cpp.o
#14 111.5 [ 58%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/KVBinaryInputStreamSerializer.cpp.o
#14 112.5 [ 58%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/KVBinaryOutputStreamSerializer.cpp.o
#14 113.2 [ 58%] Building CXX object src/CMakeFiles/P2P.dir/P2p/NetNodeConfig.cpp.o
#14 113.8 [ 59%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/MemoryStream.cpp.o
#14 114.3 [ 59%] Building CXX object src/CMakeFiles/Serialization.dir/Serialization/SerializationOverloads.cpp.o
#14 115.2 [ 60%] Linking CXX static library libSerialization.a
#14 115.4 [ 60%] Built target Serialization
#14 115.7 [ 61%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/Dispatcher.cpp.o
#14 116.1 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp: In constructor 'System::Dispatcher::Dispatcher()':
#14 116.1 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp:92:14: warning: unused variable 'result' [-Wunused-variable]
#14 116.1    92 |         auto result = close(remoteSpawnEvent);
#14 116.1       |              ^~~~~~
#14 116.1 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp:97:10: warning: unused variable 'result' [-Wunused-variable]
#14 116.1    97 |     auto result = close(epoll);
#14 116.1       |          ^~~~~~
#14 116.1 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp: In destructor 'System::Dispatcher::~Dispatcher()':
#14 116.1 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp:123:9: warning: unused variable 'result' [-Wunused-variable]
#14 116.1   123 |     int result = ::close(timers.top());
#14 116.1       |         ^~~~~~
#14 116.1 /src/zion-cryptonote/src/Platform/Linux/System/Dispatcher.cpp:128:8: warning: variable 'result' set but not used [-Wunused-but-set-variable]
#14 116.1   128 |   auto result = close(epoll);
#14 116.1       |        ^~~~~~
#14 116.9 [ 62%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pConnectionProxy.cpp.o
#14 117.0 [ 62%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/ErrorMessage.cpp.o
#14 118.0 [ 63%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/Ipv4Resolver.cpp.o
#14 118.8 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 118.8                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#14 118.8                  from /src/zion-cryptonote/src/P2p/IP2pNodeInternal.h:8,
#14 118.8                  from /src/zion-cryptonote/src/P2p/P2pConnectionProxy.h:9,
#14 118.8                  from /src/zion-cryptonote/src/P2p/P2pConnectionProxy.cpp:5:
#14 118.8 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 118.8 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 118.8    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 118.8       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 118.8 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 118.8    23 |   struct chacha8_key {
#14 118.8       |          ^~~~~~~~~~~
#14 119.3 [ 63%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/TcpConnection.cpp.o
#14 119.8 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp: In destructor 'System::TcpConnection::~TcpConnection()':
#14 119.8 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:37:9: warning: unused variable 'result' [-Wunused-variable]
#14 119.8    37 |     int result = close(connection);
#14 119.8       |         ^~~~~~
#14 119.8 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp: In member function 'size_t System::TcpConnection::read(uint8_t*, size_t)':
#14 119.8 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:73:26: warning: logical 'and' of equal expressions [-Wlogical-op]
#14 119.8    73 |     if (errno != EAGAIN  && errno != EWOULDBLOCK) {
#14 119.8       |                          ^
#14 119.8 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp: In member function 'std::size_t System::TcpConnection::write(const uint8_t*, size_t)':
#14 119.8 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnection.cpp:169:26: warning: logical 'and' of equal expressions [-Wlogical-op]
#14 119.8   169 |     if (errno != EAGAIN  && errno != EWOULDBLOCK) {
#14 119.8       |                          ^
#14 120.4 [ 64%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/TcpConnector.cpp.o
#14 120.7 [ 64%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pContext.cpp.o
#14 120.9 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnector.cpp: In member function 'System::TcpConnection System::TcpConnector::connect(const System::Ipv4Address&, uint16_t)':
#14 120.9 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnector.cpp:133:23: warning: unused variable 'result' [-Wunused-variable]
#14 120.9   133 |                   int result = close(connection);
#14 120.9       |                       ^~~~~~
#14 120.9 /src/zion-cryptonote/src/Platform/Linux/System/TcpConnector.cpp:160:9: warning: unused variable 'result' [-Wunused-variable]
#14 120.9   160 |     int result = close(connection);
#14 120.9       |         ^~~~~~
#14 121.5 [ 64%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/TcpListener.cpp.o
#14 121.9 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 121.9                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#14 121.9                  from /src/zion-cryptonote/src/P2p/P2pContext.h:19,
#14 121.9                  from /src/zion-cryptonote/src/P2p/P2pContext.cpp:5:
#14 121.9 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 121.9 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 121.9    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 121.9       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 121.9 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 121.9    23 |   struct chacha8_key {
#14 121.9       |          ^~~~~~~~~~~
#14 122.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp: In constructor 'System::TcpListener::TcpListener(System::Dispatcher&, const System::Ipv4Address&, uint16_t)':
#14 122.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp:63:9: warning: unused variable 'result' [-Wunused-variable]
#14 122.0    63 |     int result = close(listener);
#14 122.0       |         ^~~~~~
#14 122.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp: In destructor 'System::TcpListener::~TcpListener()':
#14 122.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp:82:9: warning: unused variable 'result' [-Wunused-variable]
#14 122.0    82 |     int result = close(listener);
#14 122.0       |         ^~~~~~
#14 122.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp: In member function 'System::TcpConnection System::TcpListener::accept()':
#14 122.0 /src/zion-cryptonote/src/Platform/Linux/System/TcpListener.cpp:176:11: warning: unused variable 'result' [-Wunused-variable]
#14 122.0   176 |       int result = close(connection);
#14 122.0       |           ^~~~~~
#14 122.6 [ 65%] Building CXX object src/CMakeFiles/System.dir/Platform/Linux/System/Timer.cpp.o
#14 122.7 [ 66%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pContextOwner.cpp.o
#14 123.1 /src/zion-cryptonote/src/Platform/Linux/System/Timer.cpp: In lambda function:
#14 123.1 /src/zion-cryptonote/src/Platform/Linux/System/Timer.cpp:92:32: warning: logical 'or' of equal expressions [-Wlogical-op]
#14 123.1    92 |             if(errno == EAGAIN || errno == EWOULDBLOCK) {
#14 123.1       |                                ^
#14 123.6 [ 66%] Building CXX object src/CMakeFiles/System.dir/System/ContextGroup.cpp.o
#14 123.9 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 123.9                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#14 123.9                  from /src/zion-cryptonote/src/P2p/P2pContext.h:19,
#14 123.9                  from /src/zion-cryptonote/src/P2p/P2pContextOwner.cpp:7:
#14 123.9 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 123.9 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 123.9    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 123.9       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 123.9 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 123.9    23 |   struct chacha8_key {
#14 123.9       |          ^~~~~~~~~~~
#14 124.4 [ 67%] Building CXX object src/CMakeFiles/System.dir/System/ContextGroupTimeout.cpp.o
#14 124.4 [ 67%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pInterfaces.cpp.o
#14 125.2 [ 67%] Building CXX object src/CMakeFiles/System.dir/System/Event.cpp.o
#14 125.5 [ 68%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pNode.cpp.o
#14 125.9 [ 69%] Building CXX object src/CMakeFiles/System.dir/System/EventLock.cpp.o
#14 126.3 [ 69%] Building CXX object src/CMakeFiles/System.dir/System/InterruptedException.cpp.o
#14 126.5 /src/zion-cryptonote/src/System/InterruptedException.cpp:8:6: warning: '{anonymous}::suppressMSVCWarningLNK4221' defined but not used [-Wunused-variable]
#14 126.5     8 | char suppressMSVCWarningLNK4221;
#14 126.5       |      ^~~~~~~~~~~~~~~~~~~~~~~~~~
#14 126.6 [ 70%] Building CXX object src/CMakeFiles/System.dir/System/Ipv4Address.cpp.o
#14 127.0 /src/zion-cryptonote/src/System/Ipv4Address.cpp: In member function 'bool System::Ipv4Address::isPrivate() const':
#14 127.0 /src/zion-cryptonote/src/System/Ipv4Address.cpp:107:26: warning: comparison of integer expressions of different signedness: 'unsigned int' and 'int' [-Wsign-compare]
#14 127.0   107 |     (value & 0xfff00000) == ((172 << 24) | (16 << 16)) ||
#14 127.0       |     ~~~~~~~~~~~~~~~~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 127.0 /src/zion-cryptonote/src/System/Ipv4Address.cpp:109:26: warning: comparison of integer expressions of different signedness: 'unsigned int' and 'int' [-Wsign-compare]
#14 127.0   109 |     (value & 0xffff0000) == ((192 << 24) | (168 << 16));
#14 127.0       |     ~~~~~~~~~~~~~~~~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 127.4 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 127.4                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#14 127.4                  from /src/zion-cryptonote/src/P2p/IP2pNodeInternal.h:8,
#14 127.4                  from /src/zion-cryptonote/src/P2p/P2pNode.h:17,
#14 127.4                  from /src/zion-cryptonote/src/P2p/P2pNode.cpp:5:
#14 127.4 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 127.4 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 127.4    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 127.4       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 127.4 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 127.4    23 |   struct chacha8_key {
#14 127.4       |          ^~~~~~~~~~~
#14 127.5 [ 70%] Building CXX object src/CMakeFiles/System.dir/System/RemoteEventLock.cpp.o
#14 128.6 [ 71%] Building CXX object src/CMakeFiles/System.dir/System/TcpStream.cpp.o
#14 129.5 [ 72%] Linking CXX static library libSystem.a
#14 129.7 [ 72%] Building CXX object src/CMakeFiles/P2P.dir/P2p/P2pNodeConfig.cpp.o
#14 129.8 [ 72%] Built target System
#14 130.0 [ 72%] Building CXX object src/CMakeFiles/Transfers.dir/Transfers/BlockchainSynchronizer.cpp.o
#14 131.2 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 131.2                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#14 131.2                  from /src/zion-cryptonote/include/INode.h:15,
#14 131.2                  from /src/zion-cryptonote/src/Transfers/BlockchainSynchronizer.h:7,
#14 131.2                  from /src/zion-cryptonote/src/Transfers/BlockchainSynchronizer.cpp:5:
#14 131.2 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 131.2 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 131.2    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 131.2       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 131.2 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 131.2    23 |   struct chacha8_key {
#14 131.2       |          ^~~~~~~~~~~
#14 132.0 [ 73%] Building CXX object src/CMakeFiles/P2P.dir/P2p/PeerListManager.cpp.o
#14 134.1 [ 74%] Building CXX object src/CMakeFiles/Transfers.dir/Transfers/SynchronizationState.cpp.o
#14 134.4 [ 75%] Linking CXX static library libP2P.a
#14 134.7 [ 75%] Built target P2P
#14 134.9 [ 76%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/LegacyKeysImporter.cpp.o
#14 135.2 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 135.2                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#14 135.2                  from /src/zion-cryptonote/include/INode.h:15,
#14 135.2                  from /src/zion-cryptonote/src/Transfers/CommonTypes.h:13,
#14 135.2                  from /src/zion-cryptonote/src/Transfers/SynchronizationState.h:7,
#14 135.2                  from /src/zion-cryptonote/src/Transfers/SynchronizationState.cpp:5:
#14 135.2 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 135.2 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 135.2    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 135.2       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 135.2 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 135.2    23 |   struct chacha8_key {
#14 135.2       |          ^~~~~~~~~~~
#14 135.4 /src/zion-cryptonote/src/Transfers/SynchronizationState.cpp: In member function 'void CryptoNote::SynchronizationState::addBlocks(const Crypto::Hash*, uint32_t, uint32_t)':
#14 135.4 /src/zion-cryptonote/src/Transfers/SynchronizationState.cpp:84:8: warning: unused variable 'size' [-Wunused-variable]
#14 135.4    84 |   auto size = m_blockchain.size();
#14 135.4       |        ^~~~
#14 136.2 [ 76%] Building CXX object src/CMakeFiles/Transfers.dir/Transfers/TransfersConsumer.cpp.o
#14 136.6 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 136.6                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#14 136.6                  from /src/zion-cryptonote/src/Wallet/LegacyKeysImporter.cpp:14:
#14 136.6 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 136.6 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 136.6    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 136.6       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 136.6 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 136.6    23 |   struct chacha8_key {
#14 136.6       |          ^~~~~~~~~~~
#14 137.8 [ 76%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/WalletAsyncContextCounter.cpp.o
#14 138.1 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 138.1                  from /src/zion-cryptonote/src/Transfers/TransfersContainer.h:19,
#14 138.1                  from /src/zion-cryptonote/src/Transfers/TransfersSubscription.h:8,
#14 138.1                  from /src/zion-cryptonote/src/Transfers/TransfersConsumer.h:9,
#14 138.1                  from /src/zion-cryptonote/src/Transfers/TransfersConsumer.cpp:5:
#14 138.1 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 138.1 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 138.1    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 138.1       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 138.1 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 138.1    23 |   struct chacha8_key {
#14 138.1       |          ^~~~~~~~~~~
#14 138.8 [ 77%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/WalletErrors.cpp.o
#14 139.6 [ 77%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/WalletGreen.cpp.o
#14 141.9 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 141.9                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#14 141.9                  from /src/zion-cryptonote/include/INode.h:15,
#14 141.9                  from /src/zion-cryptonote/src/Transfers/BlockchainSynchronizer.h:7,
#14 141.9                  from /src/zion-cryptonote/src/Wallet/WalletGreen.h:18,
#14 141.9                  from /src/zion-cryptonote/src/Wallet/WalletGreen.cpp:5:
#14 141.9 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 141.9 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 141.9    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 141.9       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 141.9 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 141.9    23 |   struct chacha8_key {
#14 141.9       |          ^~~~~~~~~~~
#14 141.9 [ 78%] Building CXX object src/CMakeFiles/Transfers.dir/Transfers/TransfersContainer.cpp.o
#14 142.8 /src/zion-cryptonote/src/Wallet/WalletGreen.cpp: In member function 'bool CryptoNote::WalletGreen::updateWalletTransactionInfo(size_t, const CryptoNote::TransactionInformation&, int64_t)':
#14 142.8 /src/zion-cryptonote/src/Wallet/WalletGreen.cpp:971:8: warning: unused variable 'r' [-Wunused-variable]
#14 142.8   971 |   bool r = txIdIndex.modify(it, [&info, totalAmount, &updated](WalletTransaction& transaction) {
#14 142.8       |        ^
#14 143.0 /src/zion-cryptonote/src/Wallet/WalletGreen.cpp: In member function 'virtual void CryptoNote::WalletGreen::onTransactionUpdated(const Crypto::PublicKey&, const Crypto::Hash&, const std::vector<CryptoNote::ITransfersContainer*>&)':
#14 143.0 /src/zion-cryptonote/src/Wallet/WalletGreen.cpp:1800:10: warning: unused variable 'found' [-Wunused-variable]
#14 143.0  1800 |     bool found = container->getTransactionInformation(transactionHash, info, &inputsAmount, &outputsAmount);
#14 143.0       |          ^~~~~
#14 143.1 /src/zion-cryptonote/src/Wallet/WalletGreen.cpp: In member function 'virtual size_t CryptoNote::WalletGreen::createFusionTransaction(uint64_t, uint64_t)':
#14 143.1 /src/zion-cryptonote/src/Wallet/WalletGreen.cpp:2092:12: warning: variable 'transactionAmount' set but not used [-Wunused-but-set-variable]
#14 143.1  2092 |   uint64_t transactionAmount;
#14 143.1       |            ^~~~~~~~~~~~~~~~~
#14 144.0 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 144.0                  from /src/zion-cryptonote/src/Transfers/TransfersContainer.h:19,
#14 144.0                  from /src/zion-cryptonote/src/Transfers/TransfersContainer.cpp:5:
#14 144.0 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 144.0 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 144.0    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 144.0       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 144.0 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 144.0    23 |   struct chacha8_key {
#14 144.0       |          ^~~~~~~~~~~
#14 149.0 [ 78%] Building CXX object src/CMakeFiles/Transfers.dir/Transfers/TransfersSubscription.cpp.o
#14 151.1 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 151.1                  from /src/zion-cryptonote/src/Transfers/TransfersContainer.h:19,
#14 151.1                  from /src/zion-cryptonote/src/Transfers/TransfersSubscription.h:8,
#14 151.1                  from /src/zion-cryptonote/src/Transfers/TransfersSubscription.cpp:5:
#14 151.1 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 151.1 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 151.1    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 151.1       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 151.1 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 151.1    23 |   struct chacha8_key {
#14 151.1       |          ^~~~~~~~~~~
#14 151.6 [ 79%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/WalletRpcServer.cpp.o
#14 152.8 [ 80%] Building CXX object src/CMakeFiles/Transfers.dir/Transfers/TransfersSynchronizer.cpp.o
#14 154.0 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 154.0                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#14 154.0                  from /src/zion-cryptonote/src/Wallet/WalletRpcServerCommandsDefinitions.h:6,
#14 154.0                  from /src/zion-cryptonote/src/Wallet/WalletRpcServer.h:10,
#14 154.0                  from /src/zion-cryptonote/src/Wallet/WalletRpcServer.cpp:5:
#14 154.0 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 154.0 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 154.0    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 154.0       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 154.0 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 154.0    23 |   struct chacha8_key {
#14 154.0       |          ^~~~~~~~~~~
#14 154.9 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 154.9                  from /src/zion-cryptonote/src/Transfers/TransfersContainer.h:19,
#14 154.9                  from /src/zion-cryptonote/src/Transfers/TransfersSubscription.h:8,
#14 154.9                  from /src/zion-cryptonote/src/Transfers/TransfersConsumer.h:9,
#14 154.9                  from /src/zion-cryptonote/src/Transfers/TransfersSynchronizer.cpp:6:
#14 154.9 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 154.9 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 154.9    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 154.9       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 154.9 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 154.9    23 |   struct chacha8_key {
#14 154.9       |          ^~~~~~~~~~~
#14 157.5 [ 80%] Linking CXX static library libTransfers.a
#14 157.8 [ 80%] Built target Transfers
#14 157.9 [ 80%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/WalletSerialization.cpp.o
#14 158.2 [ 81%] Building CXX object src/CMakeFiles/Wallet.dir/Wallet/WalletUtils.cpp.o
#14 159.6 In file included from /src/zion-cryptonote/src/Wallet/WalletSerialization.h:14,
#14 159.6                  from /src/zion-cryptonote/src/Wallet/WalletSerialization.cpp:5:
#14 159.6 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 159.6 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 159.6    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 159.6       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 159.6 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 159.6    23 |   struct chacha8_key {
#14 159.6       |          ^~~~~~~~~~~
#14 159.8 /src/zion-cryptonote/src/Wallet/WalletSerialization.cpp: In member function 'void CryptoNote::WalletSerializer::subscribeWallets()':
#14 159.8 /src/zion-cryptonote/src/Wallet/WalletSerialization.cpp:712:10: warning: unused variable 'r' [-Wunused-variable]
#14 159.8   712 |     bool r = index.modify(it, [&subscription] (WalletRecord& rec) { rec.container = &subscription.getContainer(); });
#14 159.8       |          ^
#14 159.8 /src/zion-cryptonote/src/Wallet/WalletSerialization.cpp: In member function 'void CryptoNote::WalletSerializer::loadUnlockTransactionsJobs(Common::IInputStream&, CryptoNote::CryptoContext&)':
#14 159.8 /src/zion-cryptonote/src/Wallet/WalletSerialization.cpp:753:18: warning: unused variable 'walletsSize' [-Wunused-variable]
#14 159.8   753 |   const uint64_t walletsSize = walletsIndex.size();
#14 159.8       |                  ^~~~~~~~~~~
#14 161.0 [ 81%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/KeysStorage.cpp.o
#14 162.2 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 162.2                  from /src/zion-cryptonote/src/WalletLegacy/KeysStorage.cpp:10:
#14 162.2 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 162.2 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 162.2    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 162.2       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 162.2 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 162.2    23 |   struct chacha8_key {
#14 162.2       |          ^~~~~~~~~~~
#14 162.6 [ 82%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/WalletHelper.cpp.o
#14 162.7 /src/zion-cryptonote/src/Wallet/WalletSerialization.cpp: In member function 'void CryptoNote::WalletSerializer::loadWallets(Common::IInputStream&, CryptoNote::CryptoContext&)':
#14 162.7 /src/zion-cryptonote/src/Wallet/WalletSerialization.cpp:667:74: warning: 'isTrackingMode' may be used uninitialized in this function [-Wmaybe-uninitialized]
#14 162.7   667 |     } else if ((isTrackingMode && dto.spendSecretKey != NULL_SECRET_KEY) || (!isTrackingMode && dto.spendSecretKey == NULL_SECRET_KEY)) {
#14 162.7       |                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 163.3 [ 82%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/WalletLegacy.cpp.o
#14 165.1 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 165.1                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#14 165.1                  from /src/zion-cryptonote/include/INode.h:15,
#14 165.1                  from /src/zion-cryptonote/src/WalletLegacy/WalletLegacy.h:14,
#14 165.1                  from /src/zion-cryptonote/src/WalletLegacy/WalletLegacy.cpp:5:
#14 165.1 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 165.1 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 165.1    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 165.1       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 165.1 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 165.1    23 |   struct chacha8_key {
#14 165.1       |          ^~~~~~~~~~~
#14 165.4 [ 83%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/WalletLegacySerialization.cpp.o
#14 166.7 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 166.7                  from /src/zion-cryptonote/src/WalletLegacy/WalletLegacySerialization.cpp:9:
#14 166.7 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 166.7 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 166.7    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 166.7       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 166.7 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 166.7    23 |   struct chacha8_key {
#14 166.7       |          ^~~~~~~~~~~
#14 167.2 [ 83%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/WalletLegacySerializer.cpp.o
#14 168.1 In file included from /src/zion-cryptonote/src/WalletLegacy/WalletLegacySerializer.h:12,
#14 168.1                  from /src/zion-cryptonote/src/WalletLegacy/WalletLegacySerializer.cpp:5:
#14 168.1 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 168.1 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 168.1    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 168.1       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 168.1 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 168.1    23 |   struct chacha8_key {
#14 168.1       |          ^~~~~~~~~~~
#14 168.2 [ 84%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/WalletTransactionSender.cpp.o
#14 169.2 [ 84%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/WalletUnconfirmedTransactions.cpp.o
#14 169.6 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 169.6                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#14 169.6                  from /src/zion-cryptonote/src/WalletLegacy/WalletTransactionSender.cpp:7:
#14 169.6 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 169.6 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 169.6    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 169.6       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 169.6 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 169.6    23 |   struct chacha8_key {
#14 169.6       |          ^~~~~~~~~~~
#14 170.4 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 170.4                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#14 170.4                  from /src/zion-cryptonote/src/WalletLegacy/WalletUnconfirmedTransactions.cpp:8:
#14 170.4 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 170.4 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 170.4    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 170.4       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 170.4 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 170.4    23 |   struct chacha8_key {
#14 170.4       |          ^~~~~~~~~~~
#14 171.9 [ 85%] Building CXX object src/CMakeFiles/Wallet.dir/WalletLegacy/WalletUserTransactionsCache.cpp.o
#14 173.1 [ 85%] Building CXX object src/CMakeFiles/PaymentGate.dir/PaymentGate/NodeFactory.cpp.o
#14 174.1 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 174.1                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#14 174.1                  from /src/zion-cryptonote/include/INode.h:15,
#14 174.1                  from /src/zion-cryptonote/src/PaymentGate/NodeFactory.h:7,
#14 174.1                  from /src/zion-cryptonote/src/PaymentGate/NodeFactory.cpp:5:
#14 174.1 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 174.1 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 174.1    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 174.1       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 174.1 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 174.1    23 |   struct chacha8_key {
#14 174.1       |          ^~~~~~~~~~~
#14 174.7 [ 86%] Linking CXX static library libWallet.a
#14 175.0 [ 86%] Built target Wallet
#14 175.2 [ 86%] Building CXX object src/CMakeFiles/JsonRpcServer.dir/JsonRpcServer/JsonRpcServer.cpp.o
#14 175.4 [ 87%] Building CXX object src/CMakeFiles/PaymentGate.dir/PaymentGate/PaymentServiceJsonRpcMessages.cpp.o
#14 177.0 [ 87%] Building CXX object src/CMakeFiles/PaymentGate.dir/PaymentGate/PaymentServiceJsonRpcServer.cpp.o
#14 177.9 [ 88%] Linking CXX static library libJsonRpcServer.a
#14 178.2 [ 88%] Built target JsonRpcServer
#14 178.4 [ 88%] Building CXX object src/CMakeFiles/ConnectivityTool.dir/ConnectivityTool/ConnectivityTool.cpp.o
#14 179.0 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 179.0                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#14 179.0                  from /src/zion-cryptonote/include/INode.h:15,
#14 179.0                  from /src/zion-cryptonote/src/PaymentGate/WalletService.h:11,
#14 179.0                  from /src/zion-cryptonote/src/PaymentGate/PaymentServiceJsonRpcServer.cpp:10:
#14 179.0 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 179.0 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 179.0    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 179.0       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 179.0 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 179.0    23 |   struct chacha8_key {
#14 179.0       |          ^~~~~~~~~~~
#14 180.5 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 180.5                  from /src/zion-cryptonote/src/P2p/P2pProtocolDefinitions.h:16,
#14 180.5                  from /src/zion-cryptonote/src/ConnectivityTool/ConnectivityTool.cpp:22:
#14 180.5 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 180.5 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 180.5    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 180.5       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 180.5 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 180.5    23 |   struct chacha8_key {
#14 180.5       |          ^~~~~~~~~~~
#14 180.6 /src/zion-cryptonote/src/ConnectivityTool/ConnectivityTool.cpp: At global scope:
#14 180.6 /src/zion-cryptonote/src/ConnectivityTool/ConnectivityTool.cpp:46:173: warning: narrowing conversion of '(const char*)""' from 'const char*' to 'bool' [-Wnarrowing]
#14 180.6    46 |   const command_line::arg_descriptor<bool>        arg_get_daemon_info    = {"rpc_get_daemon_info", "request daemon state info vie rpc (--rpc_port option should be set ).", "", true};
#14 180.6       |                                                                                                                                                                             ^~
#14 182.7 [ 89%] Building CXX object src/CMakeFiles/PaymentGate.dir/PaymentGate/WalletFactory.cpp.o
#14 184.0 [ 90%] Linking CXX executable zion_connectivity_tool
#14 184.4 [ 90%] Built target ConnectivityTool
#14 184.5 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 184.5                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#14 184.5                  from /src/zion-cryptonote/include/INode.h:15,
#14 184.5                  from /src/zion-cryptonote/src/PaymentGate/WalletFactory.h:8,
#14 184.5                  from /src/zion-cryptonote/src/PaymentGate/WalletFactory.cpp:5:
#14 184.5 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 184.5 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 184.5    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 184.5       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 184.5 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 184.5    23 |   struct chacha8_key {
#14 184.5       |          ^~~~~~~~~~~
#14 184.6 [ 91%] Building CXX object src/CMakeFiles/Daemon.dir/Daemon/Daemon.cpp.o
#14 186.4 [ 91%] Building CXX object src/CMakeFiles/PaymentGate.dir/PaymentGate/WalletService.cpp.o
#14 187.5 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 187.5                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#14 187.5                  from /src/zion-cryptonote/src/CryptoNoteCore/Blockchain.h:21,
#14 187.5                  from /src/zion-cryptonote/src/CryptoNoteCore/Core.h:14,
#14 187.5                  from /src/zion-cryptonote/src/Daemon/Daemon.cpp:15:
#14 187.5 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 187.5 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 187.5    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 187.5       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 187.5 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 187.5    23 |   struct chacha8_key {
#14 187.5       |          ^~~~~~~~~~~
#14 188.1 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 188.1                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#14 188.1                  from /src/zion-cryptonote/include/INode.h:15,
#14 188.1                  from /src/zion-cryptonote/src/PaymentGate/WalletService.h:11,
#14 188.1                  from /src/zion-cryptonote/src/PaymentGate/WalletService.cpp:5:
#14 188.1 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 188.1 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 188.1    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 188.1       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 188.1 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 188.1    23 |   struct chacha8_key {
#14 188.1       |          ^~~~~~~~~~~
#14 189.0 /src/zion-cryptonote/src/PaymentGate/WalletService.cpp: In function 'Crypto::Hash PaymentService::{anonymous}::parsePaymentId(const string&)':
#14 189.0 /src/zion-cryptonote/src/PaymentGate/WalletService.cpp:68:8: warning: unused variable 'r' [-Wunused-variable]
#14 189.0    68 |   bool r = Common::podFromHex(paymentIdStr, paymentId);
#14 189.0       |        ^
#14 191.7 [ 91%] Building CXX object src/CMakeFiles/Daemon.dir/Daemon/DaemonCommandsHandler.cpp.o
#14 192.8 [ 92%] Building CXX object src/CMakeFiles/PaymentGate.dir/PaymentGate/WalletServiceErrorCategory.cpp.o
#14 193.7 [ 92%] Linking CXX static library libPaymentGate.a
#14 194.0 [ 92%] Built target PaymentGate
#14 194.1 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 194.1                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#14 194.1                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolHandler.h:13,
#14 194.1                  from /src/zion-cryptonote/src/P2p/NetNode.h:21,
#14 194.1                  from /src/zion-cryptonote/src/Daemon/DaemonCommandsHandler.cpp:7:
#14 194.1 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 194.1 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 194.1    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 194.1       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 194.1 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 194.1    23 |   struct chacha8_key {
#14 194.1       |          ^~~~~~~~~~~
#14 194.2 [ 92%] Building CXX object src/CMakeFiles/SimpleWallet.dir/SimpleWallet/PasswordContainer.cpp.o
#14 195.2 [ 93%] Building CXX object src/CMakeFiles/SimpleWallet.dir/SimpleWallet/SimpleWallet.cpp.o
#14 197.5 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 197.5                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#14 197.5                  from /src/zion-cryptonote/include/INode.h:15,
#14 197.5                  from /src/zion-cryptonote/src/NodeRpcProxy/NodeRpcProxy.h:15,
#14 197.5                  from /src/zion-cryptonote/src/SimpleWallet/SimpleWallet.h:20,
#14 197.5                  from /src/zion-cryptonote/src/SimpleWallet/SimpleWallet.cpp:5:
#14 197.5 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 197.5 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 197.5    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 197.5       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 197.5 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 197.5    23 |   struct chacha8_key {
#14 197.5       |          ^~~~~~~~~~~
#14 197.6 [ 94%] Linking CXX executable ziond
#14 197.9 In file included from /usr/include/boost/smart_ptr/detail/sp_thread_sleep.hpp:22,
#14 197.9                  from /usr/include/boost/smart_ptr/detail/yield_k.hpp:23,
#14 197.9                  from /usr/include/boost/smart_ptr/detail/spinlock_gcc_atomic.hpp:14,
#14 197.9                  from /usr/include/boost/smart_ptr/detail/spinlock.hpp:42,
#14 197.9                  from /usr/include/boost/smart_ptr/detail/spinlock_pool.hpp:25,
#14 197.9                  from /usr/include/boost/smart_ptr/shared_ptr.hpp:29,
#14 197.9                  from /usr/include/boost/shared_ptr.hpp:17,
#14 197.9                  from /usr/include/boost/program_options/variables_map.hpp:13,
#14 197.9                  from /src/zion-cryptonote/src/SimpleWallet/SimpleWallet.h:12,
#14 197.9                  from /src/zion-cryptonote/src/SimpleWallet/SimpleWallet.cpp:5:
#14 197.9 /usr/include/boost/bind.hpp: At global scope:
#14 197.9 /usr/include/boost/bind.hpp:36:1: note: '#pragma message: The practice of declaring the Bind placeholders (_1, _2, ...) in the global namespace is deprecated. Please use <boost/bind/bind.hpp> + using namespace boost::placeholders, or define BOOST_BIND_GLOBAL_PLACEHOLDERS to retain the current behavior.'
#14 197.9    36 | BOOST_PRAGMA_MESSAGE(
#14 197.9       | ^~~~~~~~~~~~~~~~~~~~
#14 198.2 [ 94%] Built target Daemon
#14 198.4 [ 95%] Building CXX object src/CMakeFiles/PaymentGateService.dir/PaymentGateService/ConfigurationManager.cpp.o
#14 201.4 [ 95%] Building CXX object src/CMakeFiles/PaymentGateService.dir/PaymentGateService/PaymentGateService.cpp.o
#14 204.5 [ 95%] Linking CXX executable zion_wallet
#14 204.7 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 204.7                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#14 204.7                  from /src/zion-cryptonote/include/INode.h:15,
#14 204.7                  from /src/zion-cryptonote/src/PaymentGate/NodeFactory.h:7,
#14 204.7                  from /src/zion-cryptonote/src/PaymentGateService/PaymentGateService.h:14,
#14 204.7                  from /src/zion-cryptonote/src/PaymentGateService/PaymentGateService.cpp:5:
#14 204.7 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 204.7 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 204.7    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 204.7       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 204.7 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 204.7    23 |   struct chacha8_key {
#14 204.7       |          ^~~~~~~~~~~
#14 205.2 [ 95%] Built target SimpleWallet
#14 205.4 [ 96%] Building CXX object src/CMakeFiles/Miner.dir/Miner/BlockchainMonitor.cpp.o
#14 207.8 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 207.8                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#14 207.8                  from /src/zion-cryptonote/src/Rpc/CoreRpcServerCommandsDefinitions.h:7,
#14 207.8                  from /src/zion-cryptonote/src/Miner/BlockchainMonitor.cpp:13:
#14 207.8 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 207.8 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 207.8    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 207.8       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 207.8 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 207.8    23 |   struct chacha8_key {
#14 207.8       |          ^~~~~~~~~~~
#14 209.7 [ 96%] Building CXX object src/CMakeFiles/Miner.dir/Miner/Miner.cpp.o
#14 210.1 [ 97%] Building CXX object src/CMakeFiles/PaymentGateService.dir/PaymentGateService/PaymentServiceConfiguration.cpp.o
#14 211.8 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 211.8                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteFormatUtils.h:10,
#14 211.8                  from /src/zion-cryptonote/src/Miner/Miner.cpp:10:
#14 211.8 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 211.8 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 211.8    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 211.8       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 211.8 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 211.8    23 |   struct chacha8_key {
#14 211.8       |          ^~~~~~~~~~~
#14 214.0 [ 97%] Building CXX object src/CMakeFiles/PaymentGateService.dir/PaymentGateService/RpcNodeConfiguration.cpp.o
#14 214.0 [ 98%] Building CXX object src/CMakeFiles/Miner.dir/Miner/MinerManager.cpp.o
#14 216.4 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 216.4                  from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteTools.h:13,
#14 216.4                  from /src/zion-cryptonote/src/Miner/MinerManager.cpp:13:
#14 216.4 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 216.4 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 216.4    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 216.4       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 216.4 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 216.4    23 |   struct chacha8_key {
#14 216.4       |          ^~~~~~~~~~~
#14 217.2 [ 99%] Building CXX object src/CMakeFiles/PaymentGateService.dir/PaymentGateService/main.cpp.o
#14 218.4 [ 99%] Building CXX object src/CMakeFiles/Miner.dir/Miner/MiningConfig.cpp.o
#14 219.4 In file included from /src/zion-cryptonote/src/CryptoNoteCore/CryptoNoteSerialization.h:8,
#14 219.4                  from /src/zion-cryptonote/src/CryptoNoteProtocol/CryptoNoteProtocolDefinitions.h:13,
#14 219.4                  from /src/zion-cryptonote/include/INode.h:15,
#14 219.4                  from /src/zion-cryptonote/src/PaymentGate/NodeFactory.h:7,
#14 219.4                  from /src/zion-cryptonote/src/PaymentGateService/PaymentGateService.h:14,
#14 219.4                  from /src/zion-cryptonote/src/PaymentGateService/main.cpp:11:
#14 219.4 /src/zion-cryptonote/src/crypto/chacha8.h: In function 'void Crypto::generate_chacha8_key(Crypto::cn_context&, const string&, Crypto::chacha8_key&)':
#14 219.4 /src/zion-cryptonote/src/crypto/chacha8.h:48:11: warning: 'void* memcpy(void*, const void*, size_t)' writing to an object of non-trivially copyable type 'struct Crypto::chacha8_key'; use copy-assignment or copy-initialization instead [-Wclass-memaccess]
#14 219.4    48 |     memcpy(&key, &pwd_hash, sizeof(key));
#14 219.4       |     ~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#14 219.4 /src/zion-cryptonote/src/crypto/chacha8.h:23:10: note: 'struct Crypto::chacha8_key' declared here
#14 219.4    23 |   struct chacha8_key {
#14 219.4       |          ^~~~~~~~~~~
#14 221.6 [ 99%] Linking CXX executable zion_walletd
#14 222.7 [ 99%] Built target PaymentGateService
#14 222.8 [100%] Building CXX object src/CMakeFiles/Miner.dir/Miner/main.cpp.o
#14 225.4 [100%] Linking CXX executable zion_miner
#14 225.8 [100%] Built target Miner
#14 DONE 226.0s

#15 [stage-1 2/5] RUN echo 'Acquire::CompressionTypes::Order { "gz"; };' > /etc/apt/apt.conf.d/99use-gzip &&         (apt-get update || (sleep 3 && apt-get update)) &&             apt-get install -y --no-install-recommends                 libboost-all-dev libc6 procps miniupnpc &&         rm -rf /var/lib/apt/lists/*
#15 CACHED

#16 [stage-1 3/5] COPY --from=build /src/zion-cryptonote/build/src/ziond /usr/local/bin/ziond
#16 CACHED

#17 [stage-1 4/5] COPY --from=build /src/zion-cryptonote/build/src/zion_wallet /usr/local/bin/zion_wallet
#17 CACHED

#18 [stage-1 5/5] COPY --from=build /src/zion-cryptonote/build/src/zion_walletd /usr/local/bin/zion_walletd
#18 DONE 0.0s

#19 exporting to image
#19 exporting layers
#19 exporting layers 0.2s done
#19 exporting manifest sha256:edd8f1a873cf35b49f67961953c7b83eeb281be36785322d8da3fc3ecd53e7be done
#19 exporting config sha256:f6bec96d1fa1c37601c34e9ea7af5fc28ab9058af31add8b5854ec06ca994962 done
#19 exporting attestation manifest sha256:8afc61c4b9324cb36ce558ba1230fcb6b4ffed2247953f88be3c2a4a8ff75db5 done
#19 exporting manifest list sha256:ee735adcfbf815d25104e94a9b4b499eb3483e35c89a565c4a18ef10f760489a done
#19 naming to docker.io/library/zion:cryptonote done
#19 unpacking to docker.io/library/zion:cryptonote 0.0s done
#19 DONE 0.2s

 [33m2 warnings found (use docker --debug to expand):
[0m - FromPlatformFlagConstDisallowed: FROM --platform flag should not use constant value "linux/amd64" (line 3)
 - FromPlatformFlagConstDisallowed: FROM --platform flag should not use constant value "linux/amd64" (line 20)
\n### Smoke test walletd pá 19. září 2025 10:55:19 UTC
WARNING: The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8) and no specific platform was requested
Fatal error: unrecognised option '--version'
\n### walletd --help pá 19. září 2025 10:57:25 UTC
WARNING: The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8) and no specific platform was requested

Common Options:
  -c [ --config ] arg                configuration file
  -h [ --help ]                      produce this help message and exit
  --local                            start with local node (remote is default)
  --testnet                          testnet mode
  --data-dir arg (=/root/.zion)      Specify data directory
  --bind-address arg (=0.0.0.0)      payment service bind address
  --bind-port arg (=8070)            payment service bind port
  -w [ --container-file ] arg        container file
  -p [ --container-password ] arg    container password
  -g [ --generate-container ]        generate new container file with one 
                                     wallet and exit
  -d [ --daemon ]                    run as daemon in Unix or as service in 
                                     Windows
  -l [ --log-file ] arg              log file
  --server-root arg                  server root. The service will use it as 
                                     working directory. Don't set it if don't 
                                     want to change it
  --log-level arg                    log level
  --address                          print wallet addresses and exit

Remote Node Options:
  --daemon-address arg (=localhost)  daemon address
  --daemon-port arg (=8081)          daemon port

Local Node Options:
  --p2p-bind-ip arg (=0.0.0.0)       Interface for p2p network protocol
  --p2p-bind-port arg (=18080)       Port for p2p network protocol
  --p2p-external-port arg (=0)       External port for p2p network protocol (if
                                     port forwarding used with NAT)
  --allow-local-ip                   Allow local ip add to peer list, mostly in
                                     debug purposes
  --add-peer arg                     Manually add peer to local peerlist
  --add-priority-node arg            Specify list of peers to connect to and 
                                     attempt to keep the connection open
  --add-exclusive-node arg           Specify list of peers to connect to only. 
                                     If this option is given the options 
                                     add-priority-node and seed-node are 
                                     ignored
  --seed-node arg                    Connect to a node to retrieve peer 
                                     addresses, and disconnect
  --hide-my-port                     Do not announce yourself as peerlist 
                                     candidate

