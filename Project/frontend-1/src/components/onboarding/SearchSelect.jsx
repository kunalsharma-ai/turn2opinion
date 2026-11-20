// Searchable single-choice list for long option sets (states, cities, departments, job titles).
// Keyboard: type to filter, arrows to move, Enter to pick, Escape to close. With allowFree, what the
// member types can be kept as the answer when the list doesn't have it (city / job title fallback).
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import Icon from '../Icon.jsx';
import Floating from '../Floating.jsx';

export default function SearchSelect({ id, value, options, onChange, placeholder = 'Search or choose', invalid, allowFree = false, freeLabel = 'Use', disabled, loading, describedBy }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [hi, setHi] = useState(0);
  const root = useRef(null);
  const pop = useRef(null);
  const listId = useId();
  const sel = options.find((o) => o[1] === value);
  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    const list = s ? options.filter((o) => o[0].toLowerCase().includes(s)).sort((a, b) => a[0].toLowerCase().indexOf(s) - b[0].toLowerCase().indexOf(s)) : options;
    return list.slice(0, 200);
  }, [q, options]);
  useEffect(() => {
    if (!open) return;
    const off = (e) => root.current && !root.current.contains(e.target) && !(pop.current && pop.current.contains(e.target)) && setOpen(false);
    document.addEventListener('pointerdown', off);
    return () => document.removeEventListener('pointerdown', off);
  }, [open]);
  useEffect(() => setHi(0), [q]);
  const pick = (v) => {
    onChange(v);
    setOpen(false);
    setQ('');
  };
  const free = allowFree && q.trim().length > 1 && !options.some((o) => o[0].toLowerCase() === q.trim().toLowerCase());
  const onKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setHi((h) => Math.min(h + 1, shown.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHi((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      if (!open) return;
      e.preventDefault();
      if (shown[hi]) pick(shown[hi][1]);
      else if (free) pick(q.trim());
    } else if (e.key === 'Escape') setOpen(false);
  };
  const label = sel ? sel[0] : value || '';
  return (
    <div className={`ssel ${open ? 'is-open' : ''} ${invalid ? 'is-invalid' : ''}`} ref={root}>
      <div className="ssel-box">
        <Icon name="search" size={16} />
        <input
          id={id}
          className="input ssel-input"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          disabled={disabled}
          value={open ? q : label}
          placeholder={loading ? 'Loading…' : label || placeholder}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onKeyDown={onKey}
          autoComplete="off"
        />
        {value && !disabled && (
          <button type="button" className="ssel-clear" aria-label="Clear" onClick={() => onChange('')}>
            <Icon name="x" size={14} />
          </button>
        )}
      </div>
      {open && !disabled && (
        <Floating as="ul" anchor={root} popRef={pop} width="anchor" className="ssel-list" id={listId} role="listbox">
          {shown.map((o, i) => (
            <li
              key={o[1]}
              role="option"
              aria-selected={o[1] === value}
              className={`${i === hi ? 'is-hi' : ''} ${o[1] === value ? 'is-sel' : ''}`}
              onPointerDown={(e) => {
                e.preventDefault();
                pick(o[1]);
              }}
              onMouseEnter={() => setHi(i)}
            >
              {o[0]}
              {o[1] === value && <Icon name="check" size={14} strokeWidth={3} />}
            </li>
          ))}
          {free && (
            <li
              role="option"
              aria-selected="false"
              className="ssel-free"
              onPointerDown={(e) => {
                e.preventDefault();
                pick(q.trim());
              }}
            >
              <Icon name="plus" size={14} /> {freeLabel} “{q.trim()}”
            </li>
          )}
          {!shown.length && !free && <li className="ssel-empty">No match. Try another spelling.</li>}
        </Floating>
      )}
    </div>
  );
}
