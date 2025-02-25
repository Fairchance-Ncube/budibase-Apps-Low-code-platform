<script>
  import { createEventDispatcher } from "svelte"
  import Picker from "./Picker.svelte"

  export let value = null
  export let id = null
  export let placeholder = "Choose an option"
  export let disabled = false
  export let options = []
  export let getOptionLabel = option => option
  export let getOptionValue = option => option
  export let getOptionIcon = () => null
  export let getOptionColour = () => null
  export let getOptionSubtitle = () => null
  export let compare = null
  export let useOptionIconImage = false
  export let isOptionEnabled
  export let readonly = false
  export let quiet = false
  export let autoWidth = false
  export let autocomplete = false
  export let sort = false
  export let align
  export let footer = null
  export let open = false
  export let tag = null
  export let searchTerm = null
  export let loading
  export let onOptionMouseenter = () => {}
  export let onOptionMouseleave = () => {}

  const dispatch = createEventDispatcher()

  $: fieldText = getFieldText(value, options, placeholder)
  $: fieldIcon = getFieldAttribute(getOptionIcon, value, options)
  $: fieldColour = getFieldAttribute(getOptionColour, value, options)

  function compareOptionAndValue(option, value) {
    return typeof compare === "function"
      ? compare(option, value)
      : option === value
  }

  const getFieldAttribute = (getAttribute, value, options) => {
    // Wait for options to load if there is a value but no options
    if (!options?.length) {
      return ""
    }
    const index = options.findIndex((option, idx) =>
      compareOptionAndValue(getOptionValue(option, idx), value)
    )
    return index !== -1 ? getAttribute(options[index], index) : null
  }

  const getFieldText = (value, options, placeholder) => {
    if (value == null || value === "") {
      // Explicit false means use no placeholder and allow an empty fields
      if (placeholder === false) {
        return ""
      }
      // Otherwise we use the placeholder if possible
      return placeholder || "Choose an option"
    }

    return (
      getFieldAttribute(getOptionLabel, value, options) || "Choose an option"
    )
  }

  const selectOption = value => {
    dispatch("change", value)
    open = false
  }
</script>

<Picker
  on:click
  bind:open
  bind:searchTerm
  on:loadMore
  {quiet}
  {id}
  {disabled}
  {readonly}
  {fieldText}
  {fieldIcon}
  {fieldColour}
  {options}
  {autoWidth}
  {align}
  {footer}
  {getOptionLabel}
  {getOptionValue}
  {getOptionIcon}
  {getOptionColour}
  {getOptionSubtitle}
  {useOptionIconImage}
  {isOptionEnabled}
  {autocomplete}
  {sort}
  {tag}
  {onOptionMouseenter}
  {onOptionMouseleave}
  isPlaceholder={value == null || value === ""}
  placeholderOption={placeholder === false ? null : placeholder}
  isOptionSelected={option => compareOptionAndValue(option, value)}
  onSelectOption={selectOption}
  {loading}
/>
