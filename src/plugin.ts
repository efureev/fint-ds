import type { App, Plugin } from 'vue'

import { FINT_DS_I18N_KEY, type FintDsI18nAdapter } from '@/i18n'

import { vAutofocus } from '@/directives/autofocus'
import { vAutosize } from '@/directives/autosize'
import { vClickOutside } from '@/directives/clickOutside'
import { vDropzone } from '@/directives/dropzone'
import { vHotkey } from '@/directives/hotkey'
import { vLoading } from '@/directives/loading'

import DsAlert from '@/components/DsAlert.vue'
import DsAvatar from '@/components/DsAvatar.vue'
import DsBadge from '@/components/DsBadge.vue'
import DsBadgeWrap from '@/components/DsBadgeWrap.vue'
import DsBottomNav from '@/components/DsBottomNav.vue'
import DsButton from '@/components/DsButton.vue'
import DsButtonGroup from '@/components/DsButtonGroup.vue'
import DsCard from '@/components/DsCard.vue'
import DsChartContainer from '@/components/DsChartContainer.vue'
import DsCheckbox from '@/components/DsCheckbox.vue'
import DsCollapse from '@/components/DsCollapse.vue'
import DsCollapseItem from '@/components/DsCollapseItem.vue'
import DsConfirmDialog from '@/components/DsConfirmDialog.vue'
import DsDataTable from '@/components/DsDataTable.vue'
import DsEmptyState from '@/components/DsEmptyState.vue'
import DsFileUpload from '@/components/DsFileUpload.vue'
import DsFormFile from '@/components/DsFormFile.vue'
import DsFormField from '@/components/DsFormField.vue'
import DsFormSection from '@/components/DsFormSection.vue'
import DsImageViewer from '@/components/DsImageViewer.vue'
import DsIcon from '@/components/DsIcon.vue'
import DsInput from '@/components/DsInput.vue'
import DsNumberInput from '@/components/DsNumberInput.vue'
import DsInputTag from '@/components/DsInputTag.vue'
import DsLink from '@/components/DsLink.vue'
import DsList from '@/components/DsList.vue'
import DsListItem from '@/components/DsListItem.vue'
import DsLoading from '@/components/DsLoading.vue'
import DsDropdown from '@/components/DsDropdown.vue'

import DsTree from '@/components/tree/DsTree.vue'

import DsDropdownMenu from '@/components/dropdown-menu/DsDropdownMenu.vue'
import DsDropdownMenuList from '@/components/dropdown-menu/DsDropdownMenuList.vue'
import DsDropdownMenuGroup from '@/components/dropdown-menu/DsDropdownMenuGroup.vue'
import DsDropdownMenuHeader from '@/components/dropdown-menu/DsDropdownMenuHeader.vue'
import DsDropdownMenuItem from '@/components/dropdown-menu/DsDropdownMenuItem.vue'
import DsDropdownMenuDivider from '@/components/dropdown-menu/DsDropdownMenuDivider.vue'
import DsDropdownMenuColumns from '@/components/dropdown-menu/DsDropdownMenuColumns.vue'
import DsDropdownMenuColumn from '@/components/dropdown-menu/DsDropdownMenuColumn.vue'
import DsDialog from '@/components/DsDialog.vue'
import DsDrawer from '@/components/DsDrawer.vue'
import DsModal from '@/components/DsModal.vue'
import DsNavbar from '@/components/DsNavbar.vue'
import DsPagination from '@/components/DsPagination.vue'
import DsProgressBar from '@/components/DsProgressBar.vue'
import DsPromptDialog from '@/components/DsPromptDialog.vue'
import DsRadio from '@/components/DsRadio.vue'
import DsRadioGroup from '@/components/DsRadioGroup.vue'
import DsSelect from '@/components/DsSelect.vue'
import DsTreeSelect from '@/components/DsTreeSelect.vue'
import DsSidebar from '@/components/DsSidebar.vue'
import DsSkeleton from '@/components/DsSkeleton.vue'
import DsSwitch from '@/components/DsSwitch.vue'
import DsTable from '@/components/DsTable.vue'
import DsTabs from '@/components/DsTabs.vue'
import DsTextarea from '@/components/DsTextarea.vue'
import DsToaster from '@/components/DsToaster.vue'
import DsTooltip from '@/components/DsTooltip.vue'
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'

const components = {
  DsAlert,
  DsAvatar,
  DsBadge,
  DsBadgeWrap,
  DsBottomNav,
  DsButton,
  DsButtonGroup,
  DsCard,
  DsChartContainer,
  DsCheckbox,
  DsCollapse,
  DsCollapseItem,
  DsConfirmDialog,
  DsDataTable,
  DsEmptyState,
  DsFileUpload,
  DsFormFile,
  DsFormField,
  DsFormSection,
  DsImageViewer,
  DsIcon,
  DsInput,
  DsNumberInput,
  DsInputTag,
  DsLink,
  DsList,
  DsListItem,
  DsLoading,
  DsDropdown,
  DsTree,
  DsDropdownMenu,
  DsDropdownMenuList,
  DsDropdownMenuGroup,
  DsDropdownMenuHeader,
  DsDropdownMenuItem,
  DsDropdownMenuDivider,
  DsDropdownMenuColumns,
  DsDropdownMenuColumn,
  DsDialog,
  DsDrawer,
  DsModal,
  DsNavbar,
  DsPagination,
  DsProgressBar,
  DsPromptDialog,
  DsRadio,
  DsRadioGroup,
  DsSelect,
  DsTreeSelect,
  DsSidebar,
  DsSkeleton,
  DsSwitch,
  DsTable,
  DsTabs,
  DsTextarea,
  DsToaster,
  DsTooltip,
  ThemeSwitcher,
} satisfies Record<string, any>

export type FintDsPluginOptions = {
  i18n?: FintDsI18nAdapter | null
}

export const FintDs: Plugin = {
  install(app: App, options?: FintDsPluginOptions) {
    if (options?.i18n) {
      app.provide(FINT_DS_I18N_KEY, options.i18n)
    }

    app.directive('autofocus', vAutofocus)
    app.directive('autosize', vAutosize)
    app.directive('click-outside', vClickOutside)
    app.directive('dropzone', vDropzone)
    app.directive('hotkey', vHotkey)
    app.directive('loading', vLoading)

    for (const [name, component] of Object.entries(components)) {
      app.component(name, component)
    }
  },
}

export default FintDs
