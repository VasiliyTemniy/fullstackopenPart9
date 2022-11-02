import axios from "axios";
import React, { SetStateAction } from "react";
import { apiBaseUrl } from "../constants";
import { Entry, EntryWithoutId } from "../types/entry";

const sendNewEntry = async (
  newEntryClient: EntryWithoutId,
  setError: React.Dispatch<SetStateAction<string | undefined>>,
  closeAddEntryModal: () => void,
  patientId: string
) => {
  try {
    console.log("ENTRY HERE ", newEntryClient.diagnosisCodes);
    const { data: newEntry } = await axios.post<Entry>(
      `${apiBaseUrl}/patients/${patientId}/entries`,
      newEntryClient
    );
    closeAddEntryModal();
    return newEntry;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      console.error(e?.response?.data || "Unrecognized axios error");
      setError(String(e?.response?.data?.error) || "Unrecognized axios error");
    } else {
      console.error("Unknown error", e);
      setError("Unknown error");
    }
  }
};

export default { sendNewEntry };