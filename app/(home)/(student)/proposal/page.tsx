"use client"

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Proposal = () => {
  const [professors, setProfessors] = useState([]);

  useEffect(() => {
    fetch("/api/professor/search")
      .then((response) => response.json())
      .then((data) => setProfessors(data))
      .catch((error) => console.error("Error fetching professors:", error));
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-3xl font-bold">Proposal</h1>
      <form className="mt-4">
        <label className="block text-lg font-medium mb-2" htmlFor="professor">
          Choose Professor:
        </label>
        <select id="professor" className="block w-full p-2 border rounded mb-4">
          {professors.map((professor) => (
            <option key={professor.id} value={professor.id}>
              {professor.name}
            </option>
          ))}
        </select>
        <label className="block text-lg font-medium mb-2" htmlFor="proposal">
          Proposal:
        </label>
        <textarea
          id="proposal"
          className="block w-full p-2 border rounded mb-4"
          rows={4}
        ></textarea>
        <Button type="submit" className="">
          Send Proposal
        </Button>
      </form>
    </div>
  );
};

export default Proposal;
