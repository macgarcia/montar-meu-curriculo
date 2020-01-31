package com.macgarcia.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PrincipalController {
	
	@GetMapping(value = "/")
	public String iniciar() {
		return "index";
	}

}
