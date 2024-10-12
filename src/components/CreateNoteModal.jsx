import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAddNote } from '../integrations/supabase';

const tagColorMap = {
  'Videos': 'purple',
  'Wishlist': 'amber',
  'Assignment': 'blue',
  'Projects': 'teal',
  'Work': 'pink',
  'Study': 'amber',
};

const CreateNoteModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('');
  const [tag, setTag] = useState('');

  const addNote = useAddNote();

  useEffect(() => {
    if (tag) {
      setColor(tagColorMap[tag]);
    }
  }, [tag]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote.mutate({ title, content, color, tag }, {
      onSuccess: () => {
        onClose();
        setTitle('');
        setContent('');
        setColor('');
        setTag('');
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white bg-opacity-50">
        <DialogHeader>
          <DialogTitle>Create New Note</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <Select value={tag} onValueChange={setTag}>
            <SelectTrigger>
              <SelectValue placeholder="Select tag" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(tagColorMap).map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Color"
            value={color}
            readOnly
            className={`bg-${color}-500 text-white`}
          />
          <DialogFooter>
            <Button type="submit">Create Note</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNoteModal;