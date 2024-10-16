import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TranslationsTable } from "../components/TranslationsTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationProvider } from "../components/NotificationContext";
import { Create } from "../components/Actions/Create";

const queryClient = new QueryClient();

const mockFetch = (global.fetch = jest.fn());

describe("TranslationsTable", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("should render translations", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: "1", language: "en", key: "hello", text: "Hello" },
      ],
    });
    render(
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <TranslationsTable selectedLanguage="en" />
        </NotificationProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Hello")).toBeInTheDocument();
    });
  });

  it("should handle adding a new translation", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 201,
      json: async () => [
        {
          id: "2",
          language: "en",
          key: "welcome",
          text: "Welcome",
        },
      ],
    });
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 201,
      json: async () => [
        {
          id: "2",
          language: "en",
          key: "welcome",
          text: "Welcome",
        },
      ],
    });

    render(
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <Create />
          <TranslationsTable selectedLanguage="en" />
        </NotificationProvider>
      </QueryClientProvider>
    );
    fireEvent.click(screen.getByText("Create new translation"));

    await waitFor(() => {
      expect(screen.getByText("Create Translation")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText("Key"), {
      target: { value: "welcome" },
    });
    fireEvent.change(screen.getByLabelText("Translation"), {
      target: { value: "Welcome" },
    });
    fireEvent.click(screen.getByText("Create"));

    await waitFor(() => {
      expect(screen.getByText("Welcome")).toBeInTheDocument();
    });
  });
});
