import styled from "styled-components";

export const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const Wrapper = styled.section`
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  max-width: 500px;
  gap: 1em;
  border: 1px solid #d1d5db70;
  box-shadow: -2px 5px 8px -6px #d1d5db70;
  border-radius: 10px;
  background: #fff;

  @media (max-width: 480px) {
    padding: 24px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
`;

export const ErrorMessage = styled.div`
  color: #b91c1c;
  background: #fee2e2;
  border: 1px solid #fecaca;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.875rem;
`;

export const FieldError = styled.span`
  color: #b91c1c;
  font-size: 0.75rem;
  margin-top: 4px;
`;

export const FooterLink = styled.div`
  font-size: 0.875rem;
  a {
    color: #0d9488;
    text-decoration: none;
    font-weight: 500;
  }
  a:hover {
    text-decoration: underline;
  }
`;
