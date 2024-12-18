import styled from "styled-components";

export const Container = styled.main`
  max-width: 720px;
  margin: 0 auto;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 480px) {
    padding: 16px 12px;
    gap: 16px;
  }
`;

export const HeaderBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
`;

export const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

export const HeaderUser = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
  margin-right: auto;
  margin-left: 12px;
`;

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #f3f4f6;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Item = styled.li<{ $completed: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;

  ${({ $completed }) =>
    $completed &&
    `
      opacity: 0.6;
      text-decoration: line-through;
  `}
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

export const ItemName = styled.span`
  flex: 1;
  font-size: 0.95rem;
  color: #111827;
  word-break: break-word;
  cursor: text;
`;

export const EditInput = styled.input`
  flex: 1;
  font-size: 0.95rem;
  padding: 6px 8px;
  border: 1px solid #14b8a6;
  border-radius: 6px;
  outline: none;
  box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.15);

  &:disabled {
    background: #f9fafb;
    cursor: not-allowed;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
  padding: 32px 16px;
`;

export const AddForm = styled.form`
  display: flex;
  align-items: stretch;
  gap: 8px;
`;

export const AddInput = styled.input`
  flex: 1;
  padding: 10px 12px;
  font-size: 0.95rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:focus {
    border-color: #14b8a6;
    box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.15);
  }

  &:disabled {
    background: #f9fafb;
    cursor: not-allowed;
  }
`;

export const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  background: #0d9488;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;

  &:hover:not(:disabled) {
    background: #0f766e;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const FiltersBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const FilterGroup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

export const FilterLabel = styled.label`
  font-size: 0.8rem;
  color: #6b7280;
`;

export const Select = styled.select`
  padding: 6px 10px;
  font-size: 0.875rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #14b8a6;
  }
`;

export const Counter = styled.span`
  margin-left: auto;
  font-size: 0.8rem;
  color: #6b7280;
`;

export const ErrorBox = styled.div`
  color: #b91c1c;
  background: #fee2e2;
  border: 1px solid #fecaca;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.875rem;
`;
