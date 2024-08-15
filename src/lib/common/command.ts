export abstract class Command<DTO, ResultDTO> {
    abstract handle(dto: DTO): ResultDTO
}