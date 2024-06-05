'use client';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import FileIcons from './ui/Icons/FileIcons';
import Image from 'next/image';
import Button from './ui/button';

export default function Upload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const [hashtags, setHashtags] = useState<string[]>([]);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDragging(false);
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    if (e.type === 'dragenter') {
      setDragging(true);
    } else if (e.type === 'dragleave') {
      setDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (!res.ok) {
        setError(`${res.status} ${res.statusText}`);
        return;
      }
      const data = await res.json();
      console.log('Response Data:', data);
      if (data.hashtags) {
        setHashtags(data.hashtags);
      } else {
        setError('No hashtags returned');
      }
      router.push('/');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full flex flex-col items-center mt-7">
      {loading && (
        <div>
          <p>Now Loading...</p>
        </div>
      )}
      {error && (
        <p>{error}</p>
      )}
      <form className="w-1/3 flex flex-col mt-3 gap-3" onSubmit={handleSubmit}>
        <input
          type="file"
          className="hidden"
          name="input"
          id="input-upload"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          htmlFor="input-upload"
          className={`flex flex-col items-center justify-center gap-4 ${!file && 'border-2 border-purple-500 border-dashed'} w-full h-60 sm:h-80`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && <div className="absolute inset-0 bg-neutral-900/20 pointer-events-none" />}
          {!file && (
            <div className="flex flex-col items-center justify-center">
              <FileIcons />
              <p className="mt-3">Upload Your Image</p>
            </div>
          )}
          {file && (
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                className="object-cover max-h-full"
                src={URL.createObjectURL(file)}
                alt='local file'
                fill
                sizes='650px'
              />
            </div>
          )}
        </label>
        <Button text="Upload Your Photo" onClick={()=>{}} />
      </form>
      {hashtags.length > 0 && (
        <div className="mt-5">
          <h3>Generated Hashtags:</h3>
          <p>{hashtags.join(' ')}</p>
        </div>
      )}
    </section>
  );
}
