# Changelog

All notable changes to this project will be documented in this file.

## [0.4.0](https://github.com/inference-gateway/registry/compare/v0.3.1...v0.4.0) (2026-07-28)

### ✨ Features

* **skills:** show language logo on skill cards from catalog ([#76](https://github.com/inference-gateway/registry/issues/76)) ([e565594](https://github.com/inference-gateway/registry/commit/e5655941890b836c07523702f9537ee2a8af5bfb))

### 🐛 Bug Fixes

* **ci:** update maintainer app ID to client ID in workflows and documentation ([48549b2](https://github.com/inference-gateway/registry/commit/48549b201767ca13d2364f5835a18c71d900022e))

### 👷 CI

* **claude:** centralize claude.yml via reusable workflow ([#71](https://github.com/inference-gateway/registry/issues/71)) ([316cc5c](https://github.com/inference-gateway/registry/commit/316cc5c9b4e8a47add48a79b0f64affa576a570e))
* **claude:** centralize claude.yml via reusable workflow ([#72](https://github.com/inference-gateway/registry/issues/72)) ([5802154](https://github.com/inference-gateway/registry/commit/580215443bb9978ba63bfb123db8fdedea1c33c5))
* **claude:** centralize claude.yml via reusable workflow ([#75](https://github.com/inference-gateway/registry/issues/75)) ([c7d4ae9](https://github.com/inference-gateway/registry/commit/c7d4ae908eb511b7afc350094b081a17ca74fbf1))
* **deps-dev:** bump postcss from 8.5.15 to 8.5.23 in /docs ([#73](https://github.com/inference-gateway/registry/issues/73)) ([f1f8b89](https://github.com/inference-gateway/registry/commit/f1f8b89f556c5819aad550c77d61a734da156081))
* **deps:** bump actions/checkout from 7.0.0 to 7.0.1 in the github-actions group ([#70](https://github.com/inference-gateway/registry/issues/70)) ([61ab128](https://github.com/inference-gateway/registry/commit/61ab1289a6e0ee1e9a98fed3765dbd417dcb9934))

### 🔧 Miscellaneous

* **deps:** bump infer CLI v0.147.1 -> v0.153.1 ([#74](https://github.com/inference-gateway/registry/issues/74)) ([ec7f82b](https://github.com/inference-gateway/registry/commit/ec7f82b2ff886b18896b956ce949e69868066bc2))

## [0.3.1](https://github.com/inference-gateway/registry/compare/v0.3.0...v0.3.1) (2026-07-19)

### 🐛 Bug Fixes

* **deps:** override vite to 6.4.3 to patch fs.deny bypass ([#69](https://github.com/inference-gateway/registry/issues/69)) ([47d7f3c](https://github.com/inference-gateway/registry/commit/47d7f3c1b30fa86f7ab0035ddefa9202cc985f2c))

## [0.3.0](https://github.com/inference-gateway/registry/compare/v0.2.4...v0.3.0) (2026-07-19)

### ✨ Features

* add and generate missing providers ([4d230ae](https://github.com/inference-gateway/registry/commit/4d230aeec3fa5e6158592e40ecbb3e3c290c64f2))
* **telemetry:** regenerate types from ADL schema ([329a994](https://github.com/inference-gateway/registry/commit/329a994072f4191a6fff3c6fe39ecad9220dc517))

### 🐛 Bug Fixes

* **ci:** only trigger infer when actually needed ([937954a](https://github.com/inference-gateway/registry/commit/937954a5dea0140b1ac691b734e0933fa85b35b5))
* regenerate adl types for cloudflare deployment ([#48](https://github.com/inference-gateway/registry/issues/48)) ([9dd2f66](https://github.com/inference-gateway/registry/commit/9dd2f660779fcb6cb67ff0c4daf09045fe4ddc77))

### 👷 CI

* centralize claude.yml via reusable workflow ([#21](https://github.com/inference-gateway/registry/issues/21)) ([54e6cff](https://github.com/inference-gateway/registry/commit/54e6cff5934ca6176116b3a3a2c3bae3f348dfb6))
* centralize claude.yml via reusable workflow ([#22](https://github.com/inference-gateway/registry/issues/22)) ([5721c04](https://github.com/inference-gateway/registry/commit/5721c04abeab7e859580da0218c21aadf24fd0e4))
* centralize claude.yml via reusable workflow ([#23](https://github.com/inference-gateway/registry/issues/23)) ([ad884e5](https://github.com/inference-gateway/registry/commit/ad884e586e9e261e453b9f3865f42281a04b5b72))
* centralize claude.yml via reusable workflow ([#40](https://github.com/inference-gateway/registry/issues/40)) ([8a43474](https://github.com/inference-gateway/registry/commit/8a43474f9756d9271ede680efd6e9c0d6610eaad))
* centralize infer.yml + bump infer CLI and sync .infer config ([#26](https://github.com/inference-gateway/registry/issues/26)) ([9341983](https://github.com/inference-gateway/registry/commit/93419835f5931af19b17e91361ee7672da086b90))
* centralize infer.yml + sync .infer config ([#25](https://github.com/inference-gateway/registry/issues/25)) ([826a40c](https://github.com/inference-gateway/registry/commit/826a40c60542801285448beb8d86ead49fa85c87))
* centralize infer.yml via reusable workflow ([#24](https://github.com/inference-gateway/registry/issues/24)) ([2e72da5](https://github.com/inference-gateway/registry/commit/2e72da54715df9abf6a73f8fb68114c887b5ef36))
* **claude:** centralize claude.yml via reusable workflow ([#64](https://github.com/inference-gateway/registry/issues/64)) ([d48e989](https://github.com/inference-gateway/registry/commit/d48e989423d62e363e64ad9d1539cfc8088ed4c9))
* **claude:** change effort to max ([eda5e3c](https://github.com/inference-gateway/registry/commit/eda5e3cf6b72b88dba9d1211122a167620f4958f))
* **claude:** download all maintainer skill assets ([db2fcc9](https://github.com/inference-gateway/registry/commit/db2fcc94376da8ace7a6fe680de4a75038f3cbc5))
* **claude:** remove system prompt - use default community maintained prompt ([0bc19eb](https://github.com/inference-gateway/registry/commit/0bc19ebb7a6f7d519016284cbac62757c49a2e4a))
* **claude:** standardize workflow + task-based branch prefix ([74e70f0](https://github.com/inference-gateway/registry/commit/74e70f00c84354120e33638489e66070955557b7))
* **deps-dev:** bump js-yaml from 4.1.1 to 4.2.0 in /docs ([#44](https://github.com/inference-gateway/registry/issues/44)) ([debbfcb](https://github.com/inference-gateway/registry/commit/debbfcb048dc9ab2acf71772ef4f0f6af7e7196d))
* **deps:** bump actions/setup-node from 6.4.0 to 7.0.0 in the github-actions group ([#66](https://github.com/inference-gateway/registry/issues/66)) ([cb6378f](https://github.com/inference-gateway/registry/commit/cb6378f59c5b54f54b69d4cb5ef63d360a24dd63))
* **deps:** bump inference-gateway/.github/.github/workflows/claude.yml ([#62](https://github.com/inference-gateway/registry/issues/62)) ([78afef8](https://github.com/inference-gateway/registry/commit/78afef8f22372c933130c910885e6563ac2d241b))
* **deps:** Bump inference-gateway/infer-action ([#20](https://github.com/inference-gateway/registry/issues/20)) ([40cbdd9](https://github.com/inference-gateway/registry/commit/40cbdd97f0ac4503f9cab50c67f61d2848e5d931))
* **deps:** Bump the github-actions group with 2 updates ([#31](https://github.com/inference-gateway/registry/issues/31)) ([98262d6](https://github.com/inference-gateway/registry/commit/98262d6d842812ace3565fdadfa33c6055515422))
* **deps:** bump the github-actions group with 2 updates ([#50](https://github.com/inference-gateway/registry/issues/50)) ([7e538b2](https://github.com/inference-gateway/registry/commit/7e538b27e7ab72ea8e66681d07143fd46728f33a))
* **deps:** bump the github-actions group with 2 updates ([#52](https://github.com/inference-gateway/registry/issues/52)) ([7be5db9](https://github.com/inference-gateway/registry/commit/7be5db901293c052af26fb5c52cb04f00ce06b6a))
* **deps:** upgrade actions/checkout from v6.0.3 to v7.0.0 across workflows ([99e5d74](https://github.com/inference-gateway/registry/commit/99e5d744f4ec68d7c0e578f5d8d344be71b4490f))
* **infer:** centralize infer.yml + bump infer CLI and sync .infer config ([#27](https://github.com/inference-gateway/registry/issues/27)) ([c293afd](https://github.com/inference-gateway/registry/commit/c293afdad1cdc27ab78d4754f5ba9469b2ad7735))
* **infer:** centralize infer.yml + sync .infer config ([#47](https://github.com/inference-gateway/registry/issues/47)) ([1ef3d07](https://github.com/inference-gateway/registry/commit/1ef3d074640fd8b4f8eb370c5d2d8a40fe20060e))
* **infer:** centralize infer.yml via reusable workflow ([#60](https://github.com/inference-gateway/registry/issues/60)) ([f1c74b9](https://github.com/inference-gateway/registry/commit/f1c74b9addf2868ab02bd302384649c08710be99))
* **infer:** centralize infer.yml via reusable workflow ([#61](https://github.com/inference-gateway/registry/issues/61)) ([1b6378f](https://github.com/inference-gateway/registry/commit/1b6378f1c5dd4d512c085ba710422593d7dbedcc))
* **release:** update Git author and committer names to use app slug ([e6124e8](https://github.com/inference-gateway/registry/commit/e6124e8eb1d65429438bb496be114ea92806fa5a))
* **release:** update semantic release and plugins to latest versions with local installation ([208d71e](https://github.com/inference-gateway/registry/commit/208d71eacc97d338f741f82ff0260174a4a0e071))

### 🔧 Miscellaneous

* add infer.yml to prettier ignore list ([182d230](https://github.com/inference-gateway/registry/commit/182d23031aec23c9cecda675e9d45194673c79b6))
* **codegen:** regenerate ADL types from upstream schema ([8d7ab5b](https://github.com/inference-gateway/registry/commit/8d7ab5b1b0dd67ce68aff988d9196ddae39ec6d9))
* **deps:** bump claude-code 2.1.148 -> 2.1.158 ([#29](https://github.com/inference-gateway/registry/issues/29)) ([1619087](https://github.com/inference-gateway/registry/commit/1619087f9256968ea14651280ae18635a688680e))
* **deps:** bump claude-code 2.1.158 -> 2.1.161, claude-code-action v1.0.133 -> v1.0.135 ([#37](https://github.com/inference-gateway/registry/issues/37)) ([5fcaa80](https://github.com/inference-gateway/registry/commit/5fcaa80af99ce3b01dfb395aedc074cc0302f015))
* **deps:** bump claude-code 2.1.161 -> 2.1.170, claude-code-action v1.0.135 -> v1.0.142 ([#41](https://github.com/inference-gateway/registry/issues/41)) ([6a5ec94](https://github.com/inference-gateway/registry/commit/6a5ec94ee8ac95721585fa7fbe4a19247aeceaec))
* **deps:** bump claude-code 2.1.170 -> 2.1.177, claude-code-action v1.0.142 -> v1.0.150 ([#43](https://github.com/inference-gateway/registry/issues/43)) ([214fb5e](https://github.com/inference-gateway/registry/commit/214fb5e567979ee331945bd817727e4a849f23bf))
* **deps:** bump claude-code 2.1.177 -> 2.1.197, claude-code-action v1.0.161 -> v1.0.165 ([#54](https://github.com/inference-gateway/registry/issues/54)) ([18c4ea5](https://github.com/inference-gateway/registry/commit/18c4ea596142e467506244d78066936babd4931b))
* **deps:** bump claude-code 2.1.197 -> 2.1.201 ([#55](https://github.com/inference-gateway/registry/issues/55)) ([e94865a](https://github.com/inference-gateway/registry/commit/e94865a610292962a3ef1c64b0f82c9412ade2b6))
* **deps:** bump claude-code-action v1.0.150 -> v1.0.152 ([#46](https://github.com/inference-gateway/registry/issues/46)) ([c982738](https://github.com/inference-gateway/registry/commit/c9827386801d3985248c01d75439c8c149790a66))
* **deps:** bump claude-code-action v1.0.168 -> v1.0.169 ([#63](https://github.com/inference-gateway/registry/issues/63)) ([970ff38](https://github.com/inference-gateway/registry/commit/970ff3886454867838ff3c2972967495b52cc9a2))
* **deps:** bump codex 0.133.0 -> 0.135.0 ([#33](https://github.com/inference-gateway/registry/issues/33)) ([936bfdf](https://github.com/inference-gateway/registry/commit/936bfdfcc2e3ee8b8722890464d4fdde775c5c37))
* **deps:** bump infer CLI v0.117.0 -> v0.117.1, infer-action v0.9.1 -> v0.11.1 ([#28](https://github.com/inference-gateway/registry/issues/28)) ([bac4cf3](https://github.com/inference-gateway/registry/commit/bac4cf3b41f1afc2e415737fe7e4ddfee90d735a))
* **deps:** bump infer CLI v0.117.1 -> v0.119.0, infer-action v0.11.2 -> v0.11.4 ([#34](https://github.com/inference-gateway/registry/issues/34)) ([2a055db](https://github.com/inference-gateway/registry/commit/2a055dbaf5866f8d4ef082cb4c429a2c62ad4426))
* **deps:** bump infer CLI v0.119.0 -> v0.120.0, infer-action v0.11.4 -> v0.11.6 ([#35](https://github.com/inference-gateway/registry/issues/35)) ([6de9c21](https://github.com/inference-gateway/registry/commit/6de9c21659fe39d60543ac5722d548dd704f5435))
* **deps:** bump infer CLI v0.120.0 -> v0.120.1, infer-action v0.11.6 -> v0.11.7 ([#36](https://github.com/inference-gateway/registry/issues/36)) ([6ce6214](https://github.com/inference-gateway/registry/commit/6ce621461c58c4b138b1ef0087317746abc527a3))
* **deps:** bump infer CLI v0.120.1 -> v0.121.0 ([#38](https://github.com/inference-gateway/registry/issues/38)) ([e677938](https://github.com/inference-gateway/registry/commit/e67793892243907110c32088020fd039e100569d))
* **deps:** bump infer CLI v0.121.0 -> v0.121.1, infer-action v0.12.1 -> v0.13.1 ([#42](https://github.com/inference-gateway/registry/issues/42)) ([cd59bef](https://github.com/inference-gateway/registry/commit/cd59bef6bb22dc0ba8a3e1b23129d8da53111271))
* **deps:** bump infer CLI v0.121.1 -> v0.122.2, infer-action v0.15.1 -> v0.15.4 ([#49](https://github.com/inference-gateway/registry/issues/49)) ([9844481](https://github.com/inference-gateway/registry/commit/9844481febbbf00f8488fb13754a115a4724d0cd))
* **deps:** bump infer CLI v0.122.2 -> v0.125.0, infer-action v0.17.2 -> v0.19.1 ([#51](https://github.com/inference-gateway/registry/issues/51)) ([00e54e5](https://github.com/inference-gateway/registry/commit/00e54e57bdffe3c2636d0072ec88cd7bc6329a5f))
* **deps:** bump infer CLI v0.125.0 -> v0.130.1, infer-action v0.19.1 -> v0.23.1 ([#53](https://github.com/inference-gateway/registry/issues/53)) ([aa6c9b4](https://github.com/inference-gateway/registry/commit/aa6c9b477f31179d9f9345d958a14dc54cc40dfb))
* **deps:** bump infer CLI v0.130.1 -> v0.133.0, infer-action v0.23.1 -> v0.26.0 ([#56](https://github.com/inference-gateway/registry/issues/56)) ([0933a99](https://github.com/inference-gateway/registry/commit/0933a9975d7bf27dc718ad84f6dc9a9f8833e23c))
* **deps:** bump infer CLI v0.133.0 -> v0.133.1, infer-action v0.26.0 -> v0.27.1 ([#57](https://github.com/inference-gateway/registry/issues/57)) ([69c31d6](https://github.com/inference-gateway/registry/commit/69c31d6770ab0e5ebc9100eb262ddb8769c11d29))
* **deps:** bump infer CLI v0.133.1 -> v0.137.0, infer-action v0.27.1 -> v0.29.0 ([#58](https://github.com/inference-gateway/registry/issues/58)) ([44bcba4](https://github.com/inference-gateway/registry/commit/44bcba4731776dcd6e3a3dadcbf7679ed014ad5d))
* **deps:** bump infer CLI v0.137.0 -> v0.138.0, infer-action v0.29.0 -> v0.30.1 ([#59](https://github.com/inference-gateway/registry/issues/59)) ([2f3c404](https://github.com/inference-gateway/registry/commit/2f3c40440de74b8f010485649606d539eb998dc8))
* **deps:** bump infer CLI v0.138.0 -> v0.141.0 ([#65](https://github.com/inference-gateway/registry/issues/65)) ([68c3e23](https://github.com/inference-gateway/registry/commit/68c3e23e4411f28c1b881ddd15a827b4f9705a00))
* **deps:** bump infer CLI v0.141.0 -> v0.147.1 ([#67](https://github.com/inference-gateway/registry/issues/67)) ([d3685f9](https://github.com/inference-gateway/registry/commit/d3685f9fb984a61ae5ee81097babcf3dd77bb2e1))
* **deps:** bump infer-action v0.11.1 -> v0.11.2 ([#32](https://github.com/inference-gateway/registry/issues/32)) ([2161d94](https://github.com/inference-gateway/registry/commit/2161d94eb6b272a704909e296c3b6a100f612c4d))
* **deps:** bump infer-action v0.11.7 -> v0.12.1 ([#39](https://github.com/inference-gateway/registry/issues/39)) ([f42aad4](https://github.com/inference-gateway/registry/commit/f42aad40c97fe424376c58821c9eac8aecb1191b))
* **deps:** bump infer-action v0.13.1 -> v0.15.1 ([#45](https://github.com/inference-gateway/registry/issues/45)) ([0d2b635](https://github.com/inference-gateway/registry/commit/0d2b635e2ccd151b5021263e0d05fee0d5ef68cc))
* **deps:** update schema version to 1.13.0 and bump codex version to ^0.139.0 in manifest files ([f462dd9](https://github.com/inference-gateway/registry/commit/f462dd9407f9566c70951ca68e6b874a796a8565))
* **flox:** add missing manifest.lock file ([5a2af51](https://github.com/inference-gateway/registry/commit/5a2af51bbe391046b5b22ab7fb5d81af84fca780))
* **infer:** remove default configs ([2e411a0](https://github.com/inference-gateway/registry/commit/2e411a02a95a0a2f6beaacddf7d323abea6ecf0e))
* **release:** update GitHub App credentials to use RELEASER_APP_ID and RELEASER_APP_PRIVATE_KEY ([432ec42](https://github.com/inference-gateway/registry/commit/432ec425ddbd546472e301ddef163b0172e09cff))
* update .prettierignore ([d6b7ecd](https://github.com/inference-gateway/registry/commit/d6b7ecd6b54d744de7da015e090eebf07ee6b553))
* update claude.yml ([fda23d7](https://github.com/inference-gateway/registry/commit/fda23d7e4860c38973cdb0f581a87ef6a5e53ee1))

## [0.2.4](https://github.com/inference-gateway/registry/compare/v0.2.3...v0.2.4) (2026-05-26)

### 🎨 Miscellaneous

* Highlight code syntax ([108faf0](https://github.com/inference-gateway/registry/commit/108faf001751df0fee08da548180482e0244f862))

## [0.2.3](https://github.com/inference-gateway/registry/compare/v0.2.2...v0.2.3) (2026-05-26)

### 📚 Documentation

* **skills:** Rewrite list-a-skill how-to for skills.yaml indexer ([#18](https://github.com/inference-gateway/registry/issues/18)) ([abf17fc](https://github.com/inference-gateway/registry/commit/abf17fcc30853722139a46826580237adf181d27)), closes [inference-gateway/skills#4](https://github.com/inference-gateway/skills/issues/4)

## [0.2.2](https://github.com/inference-gateway/registry/compare/v0.2.1...v0.2.2) (2026-05-26)

### 🐛 Bug Fixes

* **catalog:** Respect spec.acronyms in deriveDisplayName ([#17](https://github.com/inference-gateway/registry/issues/17)) ([152cb38](https://github.com/inference-gateway/registry/commit/152cb38493efd14d13a99767799c3acc20a78574))
* **docs:** Provide correct guide how to install infer CLI ([95b8059](https://github.com/inference-gateway/registry/commit/95b805931568ce2bd4bf891bb242326ed36778e0))

## [0.2.1](https://github.com/inference-gateway/registry/compare/v0.2.0...v0.2.1) (2026-05-25)

### 📚 Documentation

* **how-to:** Update the how to guide ([d938257](https://github.com/inference-gateway/registry/commit/d93825730207dfe17e2a18d6bf2fd3667d7536db))

## [0.2.0](https://github.com/inference-gateway/registry/compare/v0.1.2...v0.2.0) (2026-05-25)

### ✨ Features

* Add a button for quick adding of agents to the catalog ([a810a2b](https://github.com/inference-gateway/registry/commit/a810a2bfd80c4f55124bd7acd1acd2a763a6cb10))

### 👷 CI

* Add lint check and fix linting issues ([fc5ded1](https://github.com/inference-gateway/registry/commit/fc5ded12bf061628f8f920cdb59ce9d54b8576bd))

### 🔧 Miscellaneous

* Fix formatting ([3a4e93f](https://github.com/inference-gateway/registry/commit/3a4e93fe20dbda7bfcd509447fd5a68be51e9058))
* Fix formatting ([5255399](https://github.com/inference-gateway/registry/commit/525539909415212e0855a14417d6a711cd012542))

### 🎨 Miscellaneous

* Add highlight to links so they are visible ([71480c3](https://github.com/inference-gateway/registry/commit/71480c3923654455431f73b759cc8ca4d4d69df2))
* Add language specific icons ([3aa6c89](https://github.com/inference-gateway/registry/commit/3aa6c896637149d92af3d41f04fb97f4971af4e3))
* Add visual effect when copy to clipboard was clicked ([fdea623](https://github.com/inference-gateway/registry/commit/fdea623056e368e4f30a1ad23995c23bf654957f))

## [0.1.2](https://github.com/inference-gateway/registry/compare/v0.1.1...v0.1.2) (2026-05-25)

### ♻️ Improvements

* Make agent cards responsive on mobile ([4ecabc1](https://github.com/inference-gateway/registry/commit/4ecabc14e39694ce2b413af6f54ee54e6cdea9cd))

## [0.1.1](https://github.com/inference-gateway/registry/compare/v0.1.0...v0.1.1) (2026-05-25)

### 🐛 Bug Fixes

* **release:** Dispatch Pages deploy from main, not from release tag ([20c6cc3](https://github.com/inference-gateway/registry/commit/20c6cc30a63ae37803cea0a29c2d7793b04334ae))
