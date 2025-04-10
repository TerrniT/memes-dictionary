/*
  # Create memes table and security policies

  1. New Tables
    - `memes`
      - `id` (uuid, primary key)
      - `content` (text, required)
      - `add_date` (timestamptz, auto-generated)
      - `group` (char(1), auto-generated from content)

  2. Security
    - Enable RLS on `memes` table
    - Add policies for:
      - Anyone can read memes
      - Only authenticated users can create memes
*/

CREATE TABLE IF NOT EXISTS memes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  add_date timestamptz DEFAULT now(),
  "group" char(1) NOT NULL
);

ALTER TABLE memes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read memes
CREATE POLICY "Anyone can read memes"
  ON memes
  FOR SELECT
  TO public
  USING (true);

-- Only authenticated users can create memes
CREATE POLICY "Authenticated users can create memes"
  ON memes
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create index for group to improve sorting performance
CREATE INDEX memes_group_idx ON memes ("group");