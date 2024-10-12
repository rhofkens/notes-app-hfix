import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAddNote } from '../integrations/supabase';
import { toast } from 'sonner';

const tagColorMap = {
  'Videos': 'purple',
  'Wishlist': 'yellow',
  'Assignment': 'blue',
  'Projects': 'teal',
  'Work': 'pink',
  'Study': 'amber',
};

const CreateNoteModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');
  const [color, setColor] = useState('');

  const addNote = useAddNote();

  useEffect(() => {
    if (tag) {
      setColor(tagColorMap[tag]);
    }
  }, [tag]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content || !tag) {
      toast.error('Please fill in all fields');
      return;
    }
    addNote.mutate({ title, content, color, tag }, {
      onSuccess: () => {
        toast.success('Note added successfully');
        onClose();
        resetForm();
      },
      onError: (error) => {
        toast.error(`Error adding note: ${error.message}`);
      }
    });
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setTag('');
    setColor('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle>Create New Note</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="bg-gray-800 text-white border-gray-700"
          />
          <Textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="bg-gray-800 text-white border-gray-700"
          />
          <Select value={tag} onValueChange={setTag} required>
            <SelectTrigger className="bg-gray-800 text-white border-gray-700">
              <SelectValue placeholder="Select tag" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-white">
              {Object.keys(tagColorMap).map((t) => (
                <SelectItem key={t} value={t} className="text-white hover:bg-gray-700">
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-2">
            <span>Selected Color:</span>
            <div
              className={`w-6 h-6 rounded-full ${color ? `bg-${color}-500` : 'bg-gray-500'}`}
              style={{ backgroundColor: color ? `var(--${color}-500)` : 'gray' }}
            ></div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
              Create Note
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNoteModal;