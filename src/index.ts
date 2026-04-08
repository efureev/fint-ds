export { default } from './plugin'
export { FintDs } from './plugin'
export type { FintDsPluginOptions } from './plugin'

export { default as DsAlert } from './components/DsAlert.vue'
export { default as DsAvatar } from './components/DsAvatar.vue'
export { default as DsBadge } from './components/DsBadge.vue'
export { default as DsBadgeWrap } from './components/DsBadgeWrap.vue'
export { default as DsBottomNav } from './components/DsBottomNav.vue'
export { default as DsButton } from './components/DsButton.vue'
export { default as DsButtonGroup } from './components/DsButtonGroup.vue'
export { default as DsCard } from './components/DsCard.vue'
export { default as DsChartContainer } from './components/DsChartContainer.vue'
export { default as DsCheckbox } from './components/DsCheckbox.vue'
export { default as DsCollapse } from './components/DsCollapse.vue'
export { default as DsCollapseItem } from './components/DsCollapseItem.vue'
export { default as DsConfirmDialog } from './components/DsConfirmDialog.vue'
export { default as DsDataTable } from './components/DsDataTable.vue'
export { default as DsEmptyState } from './components/DsEmptyState.vue'
export { default as DsFileUpload } from './components/DsFileUpload.vue'
export { default as DsFormFile } from './components/DsFormFile.vue'
export { default as DsFormField } from './components/DsFormField.vue'
export { default as DsFormSection } from './components/DsFormSection.vue'
export { default as DsImageViewer } from './components/DsImageViewer.vue'
export { default as DsIcon } from './components/DsIcon.vue'
export { default as DsInput } from './components/DsInput.vue'
// DS naming.
export { default as DsNumberInput } from './components/DsNumberInput.vue'
export { default as DsInputTag } from './components/DsInputTag.vue'
// Aliases (non-DS naming) for convenience / migration.
export { default as InputTag } from './components/DsInputTag.vue'
export { default as BadgeInput } from './components/DsInputTag.vue'
export { default as DsLink } from './components/DsLink.vue'
export { default as DsList } from './components/DsList.vue'
export { default as DsListItem } from './components/DsListItem.vue'
export { default as DsLoading } from './components/DsLoading.vue'
export { default as DsDropdown } from './components/DsDropdown.vue'

export { default as DsTree } from './components/tree/DsTree.vue'

export { default as DsDropdownMenu } from './components/dropdown-menu/DsDropdownMenu.vue'
export { default as DsDropdownMenuList } from './components/dropdown-menu/DsDropdownMenuList.vue'
export { default as DsDropdownMenuGroup } from './components/dropdown-menu/DsDropdownMenuGroup.vue'
export { default as DsDropdownMenuHeader } from './components/dropdown-menu/DsDropdownMenuHeader.vue'
export { default as DsDropdownMenuItem } from './components/dropdown-menu/DsDropdownMenuItem.vue'
export { default as DsDropdownMenuDivider } from './components/dropdown-menu/DsDropdownMenuDivider.vue'
export { default as DsDropdownMenuColumns } from './components/dropdown-menu/DsDropdownMenuColumns.vue'
export { default as DsDropdownMenuColumn } from './components/dropdown-menu/DsDropdownMenuColumn.vue'
export { default as DsDrawer } from './components/DsDrawer.vue'
export { default as DsDialog } from './components/DsDialog.vue'
export { default as DsModal } from './components/DsModal.vue'
export { default as DsNavbar } from './components/DsNavbar.vue'
export { default as DsPagination } from './components/DsPagination.vue'
export { default as DsProgressBar } from './components/DsProgressBar.vue'
export { default as DsPromptDialog } from './components/DsPromptDialog.vue'
export { default as DsRadio } from './components/DsRadio.vue'
export { default as DsRadioGroup } from './components/DsRadioGroup.vue'
export { default as DsSelect } from './components/DsSelect.vue'
export { default as DsTreeSelect } from './components/DsTreeSelect.vue'
export { default as DsSidebar } from './components/DsSidebar.vue'
export { default as DsSkeleton } from './components/DsSkeleton.vue'
export { default as DsSwitch } from './components/DsSwitch.vue'
export { default as DsTable } from './components/DsTable.vue'
export { default as DsTabs } from './components/DsTabs.vue'
export { default as DsTextarea } from './components/DsTextarea.vue'
export { default as DsToaster } from './components/DsToaster.vue'
export { default as DsTooltip } from './components/DsTooltip.vue'
export { default as ThemeSwitcher } from './components/ThemeSwitcher.vue'

// Re-export component-level types that are used by consumer apps / docs.
export type { DsLinkSize, DsLinkUnderline, DsLinkVariant } from './components/DsLink.vue'
export type { DsDataColumn } from './components/DsDataTable.vue'

export type { DsBadgeRadius, DsBadgeSize, DsBadgeVariant } from './components/DsBadge.vue'
export type { DsIconSize } from './components/DsIcon.vue'
export type { DsInputTagSize, DsInputTagState } from './components/DsInputTag.vue'
export type {
  DsSelectOption,
  DsSelectOptionsView,
  DsSelectSize,
  DsSelectUnderline,
  DsSelectVariant,
  DsSelectView,
} from './components/DsSelect.vue'

export type { DsDropdownMenuAlign, DsDropdownMenuWidth } from './components/dropdown-menu/DsDropdownMenu.vue'
export type { DsDropdownMenuHeaderAlign } from './components/dropdown-menu/DsDropdownMenuHeader.vue'
export type { DsDropdownMenuItemAlign, DsDropdownMenuItemVariant } from './components/dropdown-menu/DsDropdownMenuItem.vue'
export type { DsDialogSectionConfig, DsDialogSize } from './components/dialog/dialogShared'

export type {
  DsTreeInstance,
  DsTreeKey,
  DsTreeNode,
  DsTreeNodeDropType,
} from './components/tree/dsTreeTypes'
export type {
  DsTreeBranchLineColor,
  DsTreeFilterNodeMethod,
  DsTreePropsMap,
} from './components/tree/dsTreeProps'
export type { DsTreeAllowDropType } from './components/tree/dsTreeTypes'

export type { DsTreeSelectModelValue, DsTreeSelectValueDisplay } from './components/dsTreeSelectTypes'

export type * from './components/dsButtonStyles'
export * from './components/dsButtonStyles'
export type * from './components/dsRadioGroupContext'
export * from './components/dsRadioGroupContext'
export type * from './components/dsCollapseContext'
export * from './components/dsCollapseContext'

export { initThemeEarly, useTheme } from './composables/useTheme'
export type { ThemeName, UseThemeOptions } from './composables/useTheme'

export { useToast } from './composables/useToast'
export type { Toast, ToastInput, ToastVariant } from './composables/useToast'

export { vAutofocus } from './directives/autofocus'
export type { AutofocusBindingValue } from './directives/autofocus'

export { vAutosize } from './directives/autosize'
export type { AutosizeBindingValue } from './directives/autosize'

export { vClickOutside } from './directives/clickOutside'
export type { ClickOutsideBindingValue, ClickOutsideExclude, ClickOutsideHandler } from './directives/clickOutside'

export { vDropzone } from './directives/dropzone'
export type { DropzoneBindingValue, DropzoneOnFiles } from './directives/dropzone'

export { vHotkey } from './directives/hotkey'
export type { HotkeyBindingValue, HotkeyEntry, HotkeyHandler, HotkeyMap } from './directives/hotkey'

export { createLoading, vLoading } from './directives/loading'
export type { LoadingBindingValue, LoadingController, LoadingOptions, LoadingTarget } from './directives/loading'

// File validation (validators + runner)
export type {
  FileValidationIssue,
  FileValidationIssueCode,
  FileValidator,
  FileValidatorContext,
  FileValidatorInput,
  FileValidatorSource,
} from './utils/fileValidators/types'
export { FileValidationError } from './utils/fileValidators/FileValidationError'
export { normalizeFiles, runFileValidators } from './utils/fileValidators/runFileValidators'
export { matchAccept } from './utils/fileValidators/matchAccept'

export { acceptValidator } from './utils/fileValidators/acceptValidator'
export { allowedExtensionsValidator } from './utils/fileValidators/allowedExtensionsValidator'
export { allowedMimeTypesValidator } from './utils/fileValidators/allowedMimeTypesValidator'
export type { AllowedMimeTypesValidatorOptions } from './utils/fileValidators/allowedMimeTypesValidator'
export { maxFileSizeBytesValidator } from './utils/fileValidators/maxFileSizeBytesValidator'
export { maxSizeMbValidator } from './utils/fileValidators/maxSizeMbValidator'
export { maxTotalSizeBytesValidator } from './utils/fileValidators/maxTotalSizeBytesValidator'

export * from './i18n'
