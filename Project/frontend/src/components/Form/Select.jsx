"use client";
import React from "react";
import { Controller } from "react-hook-form";
import { InputTextField, RequiredLabel } from "@/components/forms";
import {
  Box,
  IconButton,
  Tooltip,
  Popper,
  Paper,
  ClickAwayListener,
  Autocomplete,
  Chip,
} from "@mui/material";
import Zoom from "@mui/material/Zoom";
import {
  InfoOutlined as InfoOutlinedIcon,
  Cancel as CancelIcon,
  Add as PlusIcon,
} from "@mui/icons-material";
import { Page, getOptions } from "@/util";

export default function Select({
  name,
  errors,
  control,
  options,
  api,
  parent,
  label,
  labelText,
  required = false,
  watch,
  validations,
  multiple,
  noOptions: noOptionsMessage,
  pValue: parentDefault,
  populate,
  onChange,
  isDisabled = false,
  onKeyUp,
  sx,
  showSelect = false,
  showLabel = true,
  showSelectAllBtn = true,
  addOptions,
  hasOthers = false,
  hasSkip = false,
  hasNone = false,
  ...attr
}) {
  const [newOption, setNewOption] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [isPopperOpen, setIsPopperOpen] = React.useState(false);
  const [hide, setHide] = React.useState(false);
  const [optionList, setOptionList] = React.useState(options);
  const [noOptions, setNoOptions] = React.useState(noOptionsMessage);
  const [validate, setValidate] = React.useState(validations);
  const hasError = !!errors;
  const errorMessage = errors?.message;
  const autocompleteRef = React.useRef(null);
  let pValue = parentDefault ?? "";
  const isOthersOption = React.useCallback((option) => {
    if (!option) return false;
    // console.log(option);
    const value = String(option.value ?? "")
      .trim()
      .toLowerCase();
    const label = String(option.label ?? "")
      .trim()
      .toLowerCase();
    return value === "others" || label === "others";
  }, []);
  const isSkipOption = React.useCallback((option) => {
    // console.log(option)
    if (!option) return false;
    const value = String(option.value ?? "")
      .trim()
      .toLowerCase();
    const label = String(option.label ?? "")
      .trim()
      .toLowerCase();
    return value === "prefer_not_to_say" || label === "prefer not to say";
  }, []);
  const isNoneOption = React.useCallback((option) => {
    if (!option) return false;
    const value = String(option.value ?? "")
      .trim()
      .toLowerCase();
    const label = String(option.label ?? "")
      .trim()
      .toLowerCase();
    return value === "none_of_the_above" || label === "none of the above";
  }, []);

  if (api) {
    if (parent instanceof Array) {
      let parentVal = [];
      for (let index = 0; index < parent.length; index++) {
        parentVal[index] = watch(parent[index]);
      }
      pValue = parentVal.reduce((a, c) => {
        if (!c) return a;
        if (a === "") return c;
        return `${a.toLowerCase()}-${c}`;
      }, "");
    } else if (parent) {
      pValue = watch(parent);
    }
    React.useEffect(() => {
      if (pValue && pValue != "") setNoOptions("Please wait...");
      getOptions(api, pValue, populate)
        .then((opts) => {
          if (!opts || opts.length === 0) return setHide(true);
          setOptionList(opts);
          setHide(false);
        })
        .catch((e) => {
          setNoOptions(undefined);
        })
        .finally(() => {
          if (pValue && pValue != "")
            setNoOptions(addOptions ? `Add ${label}` : `No ${label} available`);
        });
    }, [pValue]);
  }

  React.useEffect(() => {
    if (api && api !== "") return;
    if (options) {
      setOptionList(options);
    }
  }, [options]);

  const formattedOptions = React.useMemo(() => {
    const list = (optionList || []).map((opt) => ({
      ...opt,
    }));
    if (hasOthers && !list.some((opt) => isOthersOption(opt))) {
      list.push({ value: "others", label: "Others" });
    }
    if (hasSkip && !list.some((opt) => isSkipOption(opt))) {
      list.push({ value: "prefer_not_to_say", label: "Prefer not to say" });
    }
    if (hasNone && !list.some((opt) => isNoneOption(opt))) {
      list.push({ value: "none_of_the_above", label: "None of the above" });
    }
    return list;
  }, [
    optionList,
    hasOthers,
    hasSkip,
    hasNone,
    isOthersOption,
    isSkipOption,
    isNoneOption,
  ]);
  // console.log({optionList})
  if (hide && !showSelect) return <></>;
  return (
    <>
      {formattedOptions &&
        formattedOptions instanceof Array &&
        formattedOptions.length > 0 && (
          <Controller
            name={name}
            control={control}
            rules={validate}
            render={({ field }) => {
              const othersSelected =
                // multiple &&
                hasOthers &&
                Array.isArray(field.value) &&
                field.value.some((val) =>
                  isOthersOption({ value: val, label: val }),
                );
              const skipSelected =
                multiple &&
                hasSkip &&
                Array.isArray(field.value) &&
                field.value.some((val) =>
                  isSkipOption({ value: val, label: val }),
                );
              const noneSelected =
                multiple &&
                hasNone &&
                Array.isArray(field.value) &&
                field.value.some((val) =>
                  isNoneOption({ value: val, label: val }),
                );
              return (
                <>
                  {labelText && (
                    <Page.Text sx={{ fontWeight: 500, color: "#555" }}>
                      {labelText}{" "}
                      {required && (
                        <span style={{ color: "red", fontWeight: 600 }}>*</span>
                      )}
                    </Page.Text>
                  )}
                  <Page.Box position="relative">
                    <Page.Box display="flex" justifyContent="flex-end">
                      {isOpen &&
                        formattedOptions.length > 1 &&
                        multiple &&
                        showSelectAllBtn && (
                          <Page.MuiButton
                            variant="contained"
                            color="secondary"
                            onMouseDown={(event) => {
                              event.preventDefault();
                              field.onChange(
                                formattedOptions
                                  .filter(
                                    (val) =>
                                      !isOthersOption(val) &&
                                      !isSkipOption(val) &&
                                      !isNoneOption(val),
                                  )
                                  .map((val) => val.value),
                              );
                            }}
                            sx={{
                              position: "absolute",
                              fontSize: "13px",
                              px: 1,
                              py: 0,
                              top: "-27px",
                              zIndex: 99999,
                              textTransform: "none",
                            }}
                          >
                            Select All
                          </Page.MuiButton>
                        )}
                      {isOpen && addOptions && (
                        <IconButton
                          onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsPopperOpen(true);
                            setIsOpen(false);
                          }}
                          sx={{
                            position: "absolute",
                            top: "-27px",
                            zIndex: 99999,
                          }}
                        >
                          <PlusIcon />
                        </IconButton>
                      )}
                    </Page.Box>
                    <Autocomplete
                      fullWidth
                      disabled={isDisabled || hide}
                      size="small"
                      ref={autocompleteRef}
                      slotProps={{
                        popper: {
                          modifiers: [
                            {
                              name: "zIndex",
                              enabled: true,
                              phase: "write",
                              fn: ({ state }) => {
                                state.styles.popper.zIndex = 15000;
                              },
                            },
                          ],
                        },
                        paper: {
                          sx: {
                            maxHeight: "unset",
                            overflow: "unset",
                            backgroundColor: "#fafafa",
                            border: "1px solid #cfd8dc",
                            boxShadow: "0px 12px 28px rgba(0,0,0,0.25)",
                            "& .MuiAutocomplete-listbox": {
                              maxHeight: "300px",
                              overflowY: "auto",
                            },
                            "& .MuiAutocomplete-option": {
                              '&[aria-selected="true"]': {
                                backgroundColor: "#c1e3ff !important",
                              },
                            },
                          },
                        },
                      }}
                      multiple={
                        !formattedOptions || formattedOptions.length === 0
                          ? undefined
                          : !!multiple
                      }
                      disableCloseOnSelect={!!multiple}
                      // disableClearable={ !multiple || hasError }
                      options={formattedOptions ?? []}
                      getOptionDisabled={(option) => {
                        let exclusiveOption = formattedOptions
                          .filter((option) => {
                            return field.value?.includes(option.value);
                          })
                          .find((v) => v.isExclusive);
                        if (exclusiveOption) return true;
                        return !!(
                          (multiple &&
                            hasOthers &&
                            othersSelected &&
                            !isOthersOption(option)) ||
                          (multiple &&
                            hasSkip &&
                            skipSelected &&
                            !isSkipOption(option)) ||
                          (multiple &&
                            hasNone &&
                            noneSelected &&
                            !isNoneOption(option))
                        );
                      }}
                      open={showSelectAllBtn || addOptions ? isOpen : undefined}
                      getOptionLabel={(option) => option.label || ""}
                      value={
                        multiple
                          ? Array.isArray(field.value)
                            ? field.value
                                .map((val) =>
                                  formattedOptions.find(
                                    (opt) => opt.value === val,
                                  ),
                                )
                                .filter(Boolean)
                            : []
                          : !Array.isArray(field.value)
                            ? formattedOptions?.find(
                                (opt) => opt.value === field.value,
                              ) || null
                            : null
                      }
                      noOptionsText={!noOptions ? "Not Applicable" : noOptions}
                      onChange={(event, newValue) => {
                        if (onChange) {
                          onChange(event, newValue);
                        }
                        if (multiple) {
                          if (
                            hasNone &&
                            newValue.some((val) => isNoneOption(val))
                          ) {
                            const noneOption = formattedOptions.find((opt) =>
                              isNoneOption(opt),
                            );
                            field.onChange(
                              noneOption
                                ? [noneOption.value]
                                : ["none_of_the_above"],
                            );
                            return;
                          }
                          if (
                            hasSkip &&
                            newValue.some((val) => isSkipOption(val))
                          ) {
                            const skipOption = formattedOptions.find((opt) =>
                              isSkipOption(opt),
                            );
                            field.onChange(
                              skipOption
                                ? [skipOption.value]
                                : ["prefer_not_to_say"],
                            );
                            return;
                          }
                          if (
                            hasOthers &&
                            newValue.some((val) => isOthersOption(val))
                          ) {
                            const othersOption = formattedOptions.find((opt) =>
                              isOthersOption(opt),
                            );
                            field.onChange(
                              othersOption ? [othersOption.value] : ["others"],
                            );
                            return;
                          }
                          let exclusiveOption = newValue.find(
                            (val) => val.isExclusive,
                          );
                          if (!exclusiveOption)
                            return field.onChange(
                              newValue.map((val) => val.value),
                            );
                          field.onChange([exclusiveOption.value]);
                          return;
                        }
                        field.onChange(newValue === null ? "" : newValue.value);
                        setIsOpen(false);
                      }}
                      filterOptions={(options, { inputValue: searchTerm }) => {
                        let val = options.find(
                          (opt) =>
                            opt.value.toLowerCase() ===
                            searchTerm.toLowerCase(),
                        );
                        if (val) {
                          return [val];
                        }
                        return options.filter((opt) =>
                          opt.label
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()),
                        );
                      }}
                      onOpen={() => {
                        setIsOpen(true);
                      }}
                      onClose={(e, reason) => {
                        if (
                          !["selectOption", "removeOption"].includes(reason)
                        ) {
                          setIsOpen(false);
                        }
                      }}
                      renderTags={(selected, getTagProps) => {
                        const threshold = 3;
                        if (selected.length > threshold) {
                          return [
                            <Chip
                              size="small"
                              key="summary"
                              label={`${selected.length} items selected`}
                              sx={{ fontWeight: "bold" }}
                            />,
                          ];
                        } else {
                          return selected.map((option, index) => {
                            const { key, ...tagProps } = getTagProps({ index });
                            return (
                              <Chip
                                key={key}
                                size="small"
                                avatar={
                                  option.img ? (
                                    <img
                                      src={option.img}
                                      alt={option.label}
                                      style={{
                                        width: 20,
                                        height: 13,
                                        objectFit: "contain",
                                        filter:
                                          "drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5))",
                                      }}
                                    />
                                  ) : undefined
                                }
                                label={showLabel ? option.label : option.value}
                                deleteIcon={
                                  <IconButton size="small">
                                    <CancelIcon
                                      sx={{
                                        fontSize: "18px",
                                        "&:hover": {
                                          color: "#f24f4f !important",
                                        },
                                      }}
                                    />
                                  </IconButton>
                                }
                                sx={{
                                  fontWeight: "bold",
                                  "& .MuiChip-deleteIcon": {
                                    marginRight: "5px",
                                    padding: 0,
                                  },
                                }}
                                {...tagProps}
                              />
                            );
                          });
                        }
                      }}
                      renderOption={(props, option) => (
                        <li {...props} key={option.value}>
                          {option.img ? (
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <img
                                src={option.img}
                                alt={option.label}
                                style={{
                                  width: 25,
                                  height: 18,
                                  marginRight: 10,
                                  filter:
                                    "drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5))",
                                }}
                              />
                              <span>{option.label}</span>
                            </div>
                          ) : (
                            option.label
                          )}
                        </li>
                      )}
                      renderInput={(params) => {
                        return (
                          <InputTextField
                            {...params}
                            label={
                              isDisabled ? (
                                label
                              ) : validate?.required ? (
                                <RequiredLabel label={label} />
                              ) : (
                                label
                              )
                            }
                            fullWidth
                            error={hasError}
                            helperText={null}
                            name={name}
                            sx={sx}
                            InputProps={{
                              ...params.InputProps,
                              sx: {
                                pr: "32px !important",
                                ...(params.InputProps?.sx || {}),
                              },
                              endAdornment: (
                                <>
                                  {hasError && errorMessage ? (
                                    <Tooltip
                                      title={errorMessage}
                                      arrow
                                      placement="top-end"
                                      slots={{
                                        transition: Zoom,
                                      }}
                                      slotProps={{
                                        transition: { timeout: 200 },
                                      }}
                                      PopperProps={{
                                        disablePortal: true,
                                        sx: { zIndex: 7500 },
                                      }}
                                      componentsProps={{
                                        tooltip: {
                                          sx: {
                                            zIndex: 7600,
                                            bgcolor: "#fff8f8",
                                            color: "#d32f2f",
                                            border: "1.5px solid #d32f2f",
                                            fontSize: "12px",
                                            px: 1,
                                            py: 0.75,
                                            borderRadius: 1,
                                            boxShadow: 2,
                                          },
                                        },
                                        arrow: {
                                          sx: {
                                            color: "#fff8f8",
                                            filter:
                                              "drop-shadow(0 0 1.5px #d32f2f)",
                                          },
                                        },
                                      }}
                                    >
                                      <IconButton
                                        size="small"
                                        aria-label="error info"
                                        sx={{ p: 0 }}
                                      >
                                        <InfoOutlinedIcon
                                          color="error"
                                          fontSize="inherit"
                                        />
                                      </IconButton>
                                    </Tooltip>
                                  ) : null}
                                  {isOpen &&
                                    addOptions &&
                                    (!parent || pValue !== "") && (
                                      <Page.Box
                                        mr={
                                          isOpen &&
                                          multiple &&
                                          Array.isArray(field.value) &&
                                          field.value.length > 0
                                            ? 3
                                            : 0
                                        }
                                      >
                                        <Tooltip title="Add Option">
                                          <IconButton
                                            size="small"
                                            onMouseDown={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              setIsPopperOpen(true);
                                              setIsOpen(false);
                                            }}
                                            sx={{ p: 0.5 }}
                                          >
                                            <PlusIcon color="secondary" />
                                          </IconButton>
                                        </Tooltip>
                                      </Page.Box>
                                    )}

                                  {params.InputProps.endAdornment}
                                </>
                              ),
                              onKeyUp,
                            }}
                          />
                        );
                      }}
                    />
                  </Page.Box>
                </>
              );
            }}
          />
        )}
      {isPopperOpen && (
        <Page.Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            bgcolor: "rgba(244, 244, 244, 0.1)",
            backdropFilter: "blur(1px)",
            WebkitBackdropFilter: "blur(1px)",
            zIndex: 1400,
          }}
          onMouseDown={() => setIsPopperOpen(false)}
        />
      )}

      <Popper
        open={isPopperOpen}
        anchorEl={autocompleteRef.current}
        style={{ zIndex: 9999 }}
        placement="bottom"
      >
        <Paper
          sx={{
            p: 2,
            minWidth: 280,
            borderRadius: 2,
            boxShadow: 24,
            bgcolor: "#ffffff90",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
        >
          <Page.Text sx={{ fontWeight: "bold" }}>Add {label}</Page.Text>
          <Page.Divider sx={{ my: 1 }} />

          <Page.InputTextField
            onChange={(e) => {
              setNewOption(e.target.value);
            }}
            label="option"
            sx={{ width: "100%", my: 3 }}
          />
          <Page.Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 1,
            }}
          >
            <Page.MuiButton
              variant="contained"
              sx={{
                borderRadius: 2,
                height: "30px",
                background: "linear-gradient(to top right, #ff512f, #dd2476)",
              }}
              onClick={() => setIsPopperOpen(false)}
            >
              Cancel
            </Page.MuiButton>
            <Page.MuiButton
              sx={{
                borderRadius: 2,
                height: "30px",
                background:
                  "linear-gradient(to top right,rgba(0, 162, 199),rgb(0, 78, 187));",
                "&:disabled": {
                  background: "linear-gradient(to left,#b0d4f0,#d3e9f9)",
                  color: "whitesmoke",
                },
              }}
              onClick={async (e) => {
                await addOptions(newOption);
                if (parent && pValue)
                  setOptionList(await getOptions(api, pValue, populate));
                else setOptionList(await getOptions(api, "", populate));
                setIsPopperOpen(false);
                setIsOpen(true);
              }}
              variant="contained"
            >
              Add
            </Page.MuiButton>
          </Page.Box>
        </Paper>
      </Popper>
    </>
  );
}
