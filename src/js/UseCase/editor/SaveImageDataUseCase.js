// LICENSE : MIT
"use strict";
import UseCase from "../../framework/UseCase";
import editorRepository, {EditorRepository} from "../../infra/EditorRepository";
import AddQuoteTextUseCase from "./AddQuoteTextUseCase";
export default class SaveImageDataUseCase extends UseCase {
    static create() {
        return new this({editorRepository});
    }

    /**
     * @param {EditorRepository} editorRepository
     */
    constructor({editorRepository}) {
        super();
        this.editorRepository = editorRepository;
    }

    /**
     * @param fileName
     * @param currentTime
     * @param dataURL
     * @param transcript
     */
    execute({
        fileName,
        currentTime,
        dataURL,
        transcript
    }) {
        const editor = this.editorRepository.lastUsed();
        return editor.saveImageAsFile({fileName, dataURL}).then((imageFilePath) => {
            const quoteText = editor.createQuoteText({
                imageFilePath,
                currentTime,
                transcript
            });
            const addQuoteUseCase = new AddQuoteTextUseCase();
            return this.context.useCase(addQuoteUseCase).execute(quoteText).then(() => {
                this.editorRepository.save(editor);
            });
        });
    }

}