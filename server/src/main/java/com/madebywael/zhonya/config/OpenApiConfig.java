package com.madebywael.zhonya.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
    info = @Info(
        contact = @Contact(
            name = "Wael Abidi",
            email = "abidiw293@gmail.com"
        ),
        description = "Documentation for rest api's in the Zhonya project",
        title = "Zhonya API specification - madebywael",
        version = "1.0.0"
    ),
    servers = {
        @Server(
            description = "Local Envirement",
            url = "http://localhost:8080/api/v1"
        ),
        @Server(
            description = "Prod Envirement",
            url = "https://zhonya-server-latest.onrender.com/api/v1"
        )
    },
    security = {
        @SecurityRequirement(
            name = "bearerAuth"
        )
    }
)
@SecurityScheme(
    name = "bearerAuth",
    description = "use JWT",
    scheme = "bearer",
    type = SecuritySchemeType.HTTP,
    bearerFormat = "JWT",
    in = SecuritySchemeIn.HEADER
)
public class OpenApiConfig {
}
