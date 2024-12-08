import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Textarea } from "../components/ui/textarea";

export default function AddQuestion() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!url || !status) {
      alert('Please fill in all required fields');
      return;
    }

    // Create question object
    const question = {
      id: Date.now(), // Use timestamp as unique ID
      url,
      status,
      notes,
      dateAdded: new Date().toISOString(),
    };

    // Get existing questions from localStorage or initialize empty array
    const existingQuestions = JSON.parse(localStorage.getItem('questions') || '[]');
    
    // Add new question
    existingQuestions.push(question);
    
    // Save back to localStorage
    localStorage.setItem('questions', JSON.stringify(existingQuestions));

    // Reset form
    setUrl('');
    setStatus('');
    setNotes('');

    alert('Question added successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Add New Question</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="leetcode-url">LeetCode URL</Label>
          <Input
            id="leetcode-url"
            placeholder="Paste LeetCode question link here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="bg-[#1E1E1E] border-gray-700 text-white"
          />
        </div>
        <div>
          <Label>Attempt Status</Label>
          <RadioGroup
            value={status}
            onValueChange={setStatus}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="solved" id="solved" />
              <label htmlFor="solved" className="text-sm">
                Solved Independently
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hints" id="hints" />
              <label htmlFor="hints" className="text-sm">
                Used Hints
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="tutorial" id="tutorial" />
              <label htmlFor="tutorial" className="text-sm">
                Watched Tutorial
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="gaveup" id="gaveup" />
              <label htmlFor="gaveup" className="text-sm">
                Gave Up
              </label>
            </div>
          </RadioGroup>
        </div>
        <div>
          <Label htmlFor="notes">Add Notes (Optional)</Label>
          <Textarea
            id="notes"
            placeholder="Any comments or notes about your attempt..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="bg-[#1E1E1E] border-gray-700 text-white"
          />
        </div>
        <div className="flex space-x-4">
          <Button
            type="submit"
            className="bg-[#FFA500] hover:bg-[#FF8C00] text-black font-bold"
          >
            Add Question
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border-gray-700 text-gray-300"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
