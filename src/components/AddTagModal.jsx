import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const colorOptions = [
  { name: 'Purple', value: 'bg-purple-500' },
  { name: 'Yellow', value: 'bg-yellow-500' },
  { name: 'Blue', value: 'bg-blue-600' },
  { name: 'Teal', value: 'bg-teal-500' },
  { name: 'Pink', value: 'bg-pink-500' },
  { name: 'Orange', value: 'bg-orange-500' },
  // New colors
  { name: 'Red', value: 'bg-red-500' },
  { name: 'Green', value: 'bg-green-500' },
  { name: 'Indigo', value: 'bg-indigo-500' },
  { name: 'Cyan', value: 'bg-cyan-500' },
  { name: 'Lime', value: 'bg-lime-500' },
  { name: 'Fuchsia', value: 'bg-fuchsia-500' },
];

const AddTagModal = ({ isOpen, onClose, onAddTag }) => {
  const [tagName, setTagName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tagName && selectedColor) {
      onAddTag({ name: tagName, color: selectedColor });
      setTagName('');
      setSelectedColor('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle>Add New Tag</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Tag Name"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            className="bg-gray-800 text-white border-gray-700"
          />
          <div className="grid grid-cols-4 gap-2">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                type="button"
                className={`w-full h-8 rounded-md ${color.value} ${
                  selectedColor === color.value ? 'ring-2 ring-white' : ''
                }`}
                onClick={() => setSelectedColor(color.value)}
              />
            ))}
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
              Add Tag
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTagModal;