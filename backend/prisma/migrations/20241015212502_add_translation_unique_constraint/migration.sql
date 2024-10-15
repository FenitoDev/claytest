/*
  Warnings:

  - A unique constraint covering the columns `[language,key]` on the table `Translation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Translation_language_key_key" ON "Translation"("language", "key");
