import styled from "styled-components";

export const Page = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const Card = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  padding: 48px 32px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  max-width: 460px;
  width: 100%;
  box-shadow: -2px 5px 8px -6px #d1d5db70;
`;

export const Code = styled.span`
  font-size: 4rem;
  font-weight: 700;
  color: #0d9488;
  line-height: 1;
  letter-spacing: -2px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
`;

export const Description = styled.p`
  margin: 0;
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.5;
`;

export const HomeLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  padding: 10px 20px;
  background: #0d9488;
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.95rem;
  transition: background 0.15s;

  &:hover {
    background: #0f766e;
  }
`;
