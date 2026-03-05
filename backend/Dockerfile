FROM mcr.microsoft.com/dotnet/sdk:8.0 AS builder
WORKDIR /app
COPY ClubHub.Api/ClubHub.Api.csproj ClubHub.Api/
COPY ClubHub.DataAccessLayer/ClubHub.DataAccessLayer.csproj ClubHub.DataAccessLayer/
COPY ClubHub.BusinessLayer/ClubHub.BusinessLayer.csproj ClubHub.BusinessLayer/
COPY ClubHub.Domain/ClubHub.Domain.csproj ClubHub.Domain/
RUN dotnet restore
COPY . .
RUN dotnet publish ClubHub.Api/ClubHub.Api.csproj -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=builder /app/out .
EXPOSE 8080
ENTRYPOINT ["dotnet", "ClubHub.Api.dll"]