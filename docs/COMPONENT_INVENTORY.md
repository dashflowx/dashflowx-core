# Core component inventory (C02)

Source: `dashflowx-core/src/components` vs `docs/ECOSYSTEM_PLAN.md`. Machine copy: `docs/projects/core-inventory.json`.

Every component folder appears once. `planMatch=unknown` is tagged, not ignored. Pro names from the plan: Command, Menubar, Carousel, DatePicker, InputOTP, ContextMenu, NavigationMenu, Calendar, Resizable, HoverCard, Collapsible.

| id | folder | tier | editor | planMatch | note |
| --- | --- | --- | --- | --- | --- |
| `core.accordion` | Accordion | free | true | free |  |
| `core.alert` | Alert | free | true | free |  |
| `core.alert-dialog` | AlertDialog | free | true | unknown | Not named in ECOSYSTEM_PLAN; treated as Dialog family until C04 |
| `core.aspect-ratio` | AspectRatio | free | true | unknown |  |
| `core.avatar` | Avatar | free | true | free |  |
| `core.badge` | Badge | free | true | free |  |
| `core.box` | Box | free | true | free |  |
| `core.breadcrumb` | Breadcrumb | free | true | unknown | Plan lists Breadcrumb under Dashflow-ui free; lives in core today |
| `core.button` | Button | free | true | free |  |
| `core.calendar` | Calendar | pro | true | pro |  |
| `core.card` | Card | free | true | free |  |
| `core.carousel` | Carousel | pro | true | pro |  |
| `core.checkbox` | Checkbox | free | true | free |  |
| `core.code` | Code | free | true | free |  |
| `core.collapsible` | Collapsible | pro | true | pro | Plan: collapsible advanced variants |
| `core.command` | Command | pro | true | pro |  |
| `core.component-card` | ComponentCard | free | false | unknown | Docs/Storybook helper, not a product primitive |
| `core.context-menu` | ContextMenu | pro | true | pro |  |
| `core.copy-button` | CopyButton | free | false | unknown |  |
| `core.date-picker` | DatePicker | pro | true | pro |  |
| `core.dialog` | Dialog | free | true | free |  |
| `core.drawer` | Drawer | free | true | free |  |
| `core.dropdown-menu` | DropDownMenu | pro | true | unknown | Not named in plan; same family as ContextMenu/Menubar — tagged pro |
| `core.form` | Form | free | false | unknown | Extract to @dashflow/forms (M01). Stays free tarball until extract. |
| `core.grid` | Grid | free | true | free |  |
| `core.h1` | H1 | free | true | free |  |
| `core.h2` | H2 | free | true | free |  |
| `core.h3` | H3 | free | true | free |  |
| `core.h4` | H4 | free | true | free |  |
| `core.h5` | H5 | free | true | free |  |
| `core.h6` | H6 | free | true | free |  |
| `core.hover-card` | HoverCard | pro | true | pro |  |
| `core.hr` | Hr | free | true | free |  |
| `core.img` | Img | free | true | unknown |  |
| `core.input` | Input | free | true | free |  |
| `core.input-otp` | InputOTP | pro | true | pro |  |
| `core.label` | Label | free | true | free |  |
| `core.li` | Li | free | true | free |  |
| `core.list` | List | free | true | free | Ul/Ol helpers |
| `core.menubar` | Menubar | pro | true | pro |  |
| `core.menu-list` | MenuList | pro | true | unknown | Nav-like; tagged pro with NavigationMenu |
| `core.navigation-menu` | NavigationMenu | pro | true | pro |  |
| `core.ol` | Ol | free | true | free |  |
| `core.p` | P | free | true | free |  |
| `core.pagination` | Pagination | free | true | free |  |
| `core.popover` | Popover | free | true | unknown |  |
| `core.pre` | Pre | free | true | free |  |
| `core.progress` | Progress | free | true | free |  |
| `core.radio-group` | RadioGroup | free | true | free |  |
| `core.resizable` | Resizable | pro | true | pro |  |
| `core.scroll-area` | ScrollArea | free | true | unknown |  |
| `core.select` | Select | free | true | free |  |
| `core.separator` | Separator | free | true | free |  |
| `core.sheet` | Sheet | free | true | free |  |
| `core.skeleton` | Skeleton | free | true | free |  |
| `core.slider` | Slider | free | true | unknown |  |
| `core.sonner` | Sonner | free | true | free | Toast family |
| `core.switch` | Switch | free | true | free |  |
| `core.table` | Table | free | false | unknown | Extract to @dashflow/datagrid (G02). Stays free tarball until extract. |
| `core.tabs` | Tabs | free | true | free |  |
| `core.td` | Td | free | false | unknown | Table cell; extract with datagrid |
| `core.textarea` | TextArea | free | true | free |  |
| `core.th` | Th | free | false | unknown | Table cell; extract with datagrid |
| `core.toast` | Toast | free | true | free |  |
| `core.toaster` | Toaster | free | true | free |  |
| `core.toggle` | Toggle | free | true | unknown |  |
| `core.toggle-group` | ToggleGroup | free | true | unknown |  |
| `core.tooltip` | Tooltip | free | true | free |  |
| `core.tr` | Tr | free | false | unknown | Table row; extract with datagrid |
| `core.typography` | Typography | free | true | free |  |
| `core.ul` | Ul | free | true | free |  |
| `core.a` | a | free | true | free |  |

## Named in the plan, missing from source

- **Theme tokens builder** (`core.theme-tokens-builder`) — Named in ECOSYSTEM_PLAN Pro; no folder in dashflowx-core. Tracked as GAP-THEME-TOKENS / N06.

Folder count: 72. Unknown planMatch: 18. Pro: 13.

