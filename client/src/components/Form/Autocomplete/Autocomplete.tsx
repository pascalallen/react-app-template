import _ from 'lodash';
import React, { ReactNode, useState } from 'react';
import Autosuggest from 'react-autosuggest';
import classnames from 'classnames';
import { AnyObject } from '@/types/common';

type Props = {
  formName: string;
  name: string;
  value: string;
  displayValue: string;
  selected: boolean;
  displaySuggestionProp: string;
  onSuggestionsFetchRequested: (value: string) => Promise<AnyObject[]>;
  onSuggestionSelected: (suggestion: AnyObject) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, { newValue }: { newValue: string }) => void;
  isValid?: boolean;
  label?: string;
  minSearchLength?: number;
  fetchDelay?: number;
  placeholder?: string;
  required?: boolean;
  tabIndex?: number;
  error?: string;
  tip?: string;
  theme?: {
    label?: string;
    input?: string;
    error?: string;
    tipContainer?: string;
    tip?: string;
  };
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const initialState: { suggestions: AnyObject[] } = { suggestions: [] };

let timeout: NodeJS.Timeout;

const Autocomplete = (props: Props) => {
  const {
    formName,
    name,
    value,
    displayValue,
    selected,
    displaySuggestionProp,
    onSuggestionsFetchRequested,
    onSuggestionSelected,
    onChange,
    // optional props
    isValid = true,
    label = '',
    minSearchLength = 0,
    fetchDelay = 0,
    placeholder = '',
    required = false,
    tabIndex = 0,
    error = '',
    tip = '',
    theme = {
      label: '',
      input: '',
      error: '',
      tipContainer: '',
      tip: ''
    },
    onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      event.preventDefault();
    }
  } = props;

  const id = `${formName}-${name.replace('_', '-')}`;

  const [suggestions, setSuggestions] = useState(initialState.suggestions);

  const handleSuggestionsFetchRequested = async ({ value }: AnyObject) => {
    clearTimeout(timeout);

    if (_.isEmpty(value)) {
      setSuggestions([]);
      return;
    }

    timeout = setTimeout(async () => {
      const suggestions = await onSuggestionsFetchRequested(value);
      setSuggestions(suggestions);
    }, fetchDelay);
  };

  const handleSuggestionSelected = (
    event: React.FormEvent,
    { suggestion, method }: { suggestion: AnyObject; method: string }
  ): void => {
    if (method === 'enter') {
      event.preventDefault();
    }

    onSuggestionSelected(suggestion);
  };

  const handleSuggestionsClearRequested = (): void => {
    setSuggestions(initialState.suggestions);
  };

  const shouldRenderSuggestions = (value: string): boolean => {
    if (!minSearchLength) {
      return true;
    }
    return _.size(_.trim(value)) >= minSearchLength;
  };

  const getSuggestionValue = (suggestion: AnyObject) => suggestion[displaySuggestionProp];

  const renderSuggestion = (suggestion: AnyObject): ReactNode => <span>{getSuggestionValue(suggestion)}</span>;

  const inputProps = {
    id: id,
    className: classnames(
      isValid ? 'form-control' : 'form-control is-invalid',
      selected ? 'autocomplete-selected' : '',
      `${id}-input`,
      theme?.input
    ),
    name: name,
    value: displayValue,
    placeholder: placeholder,
    tabIndex: tabIndex,
    autoComplete: 'off',
    onChange,
    onBlur
  };

  const autosuggestTheme = {
    container: 'autocomplete-container',
    containerOpen: 'autocomplete-container-open',
    input: 'autocomplete-input',
    inputOpen: 'autocomplete-input-open',
    inputFocused: 'autocomplete-input-focused',
    suggestionsContainer: 'autocomplete-suggestions-container',
    suggestionsContainerOpen: 'autocomplete-suggestions-container-open position-absolute',
    suggestionsList: 'autocomplete-suggestions-list list-group',
    suggestion: 'autocomplete-suggestion list-group-item',
    suggestionFirst: 'autocomplete-suggestion-first',
    suggestionHighlighted: 'autocomplete-suggestion-highlighted active',
    sectionContainer: 'autocomplete-section-container',
    sectionContainerFirst: 'autocomplete-section-container-first',
    sectionTitle: 'autocomplete-section-title'
  };

  return (
    <div className="form-group">
      {/* this input is what actually holds the value of the component */}
      <input type="hidden" name={`${name}_value`} value={value} />
      {label && (
        <label htmlFor={id} className={classnames('form-label', `${id}-label`, theme?.label)}>
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
      )}
      <Autosuggest
        inputProps={inputProps}
        theme={autosuggestTheme}
        suggestions={suggestions}
        onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={handleSuggestionsClearRequested}
        onSuggestionSelected={handleSuggestionSelected}
        shouldRenderSuggestions={shouldRenderSuggestions}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
      />
      {error ? (
        <div id={`${id}-error`} className={classnames('invalid-feedback', `${id}-error`, theme?.error)}>
          {error}
        </div>
      ) : null}
      {!error && tip ? (
        <div
          id={`${id}-tip-container`}
          className={classnames('form-tip-container', `${id}-tip-container`, theme?.tipContainer)}>
          <span className={classnames('form-tip-text', `${id}-tip-text`, theme?.tip)}>{tip}</span>
        </div>
      ) : null}
    </div>
  );
};

export default Autocomplete;
